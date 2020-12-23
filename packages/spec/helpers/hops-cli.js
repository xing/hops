/**
 * @typedef {import('events').EventEmitter} EventEmitter
 * @typedef {import('child_process').ChildProcess} ChildProcess
 * @typedef {'build' | 'start'} Cmd
 */

/**
 * @typedef {Object} CommandOptions
 * @property {string} cwd
 * @property {NodeJS.ProcessEnv} env
 */

const EventEmitter = require('events');
const { exec, spawn } = require('child_process');
const resolveFrom = require('resolve-from');
const debug = require('debug')('hops-spec:cli');

const debugBuild = debug.extend('build');
const debugBuildError = debugBuild.extend('error');
const debugBuildStdout = debugBuild.extend('stdout');
const debugBuildStderr = debugBuild.extend('stderr');
const debugStart = debug.extend('start');
const debugStartError = debugStart.extend('error');
const debugStartStdout = debugStart.extend('stdout');
const debugStartStderr = debugStart.extend('stderr');

/**
 * @extends {EventEmitter}
 */
class HopsCLI extends EventEmitter {
  /**
   * Create a new instance for a given Hops-command.
   *
   * @throws {Error} When given command is invalid
   * @param {Cmd} cmd
   * @returns {HopsCLI}
   */
  static cmd(cmd) {
    if (!['build', 'start'].includes(cmd)) {
      throw new Error(`Invalid command "${cmd}" given.`);
    }
    debug('Instantiating HopsCLI in "%s"-mode', cmd);
    return new HopsCLI(cmd);
  }

  /**
   * @constructor
   * @param {Cmd} cmd
   * @returns {HopsCLI}
   */
  constructor(cmd) {
    super();

    if (typeof global.cwd !== 'string') {
      throw new Error('Please make that global variable env is defined.');
    }

    /**
     * @private
     */
    this._cmd = cmd;
    /**
     * @private
     * @type {string | null}
     */
    this._cwd = global.cwd;
    /**
     * @private
     * @type {NodeJS.ProcessEnv}
     */
    this._env = {};
    /**
     * @private
     * @type {string[]}
     */
    this._args = [];
    /**
     * @private
     * @type {boolean}
     */
    this._running = false;
    /**
     * @private
     * @type {ChildProcess | null}
     */
    this._process = null;
    /**
     * URL of the Hops dev-server, when running in "start"-mode
     *
     * @private
     * @type {string | null}
     */
    this._url = null;
  }

  /**
   * @private
   * @param {string} command
   * @param {CommandOptions} options
   * @returns {undefined}
   */
  _build(command, options) {
    this._running = true;
    const output = { stdout: '', stderr: '' };

    try {
      this._process = exec(command, options, (err, stdout, stderr) => {
        if (typeof stdout === 'string') {
          debugBuildStdout(stdout);
          output.stdout = stdout;
        }
        if (typeof stderr === 'string') {
          debugBuildStderr(stderr);
          output.stderr = stderr;
        }
        if (err) {
          debugBuildError(err);
          this.emit('error', err);
        }

        this.emit('end', output);
      });
    } catch (err) {
      debugBuildError(err);
      this.emit('error', err);
    } finally {
      this._process = null;
      this._running = false;
    }
  }

  /**
   * @private
   * @param {string} command
   * @param {string[]} args
   * @param {CommandOptions} options
   * @returns {undefined}
   */
  _start(command, args, options) {
    const output = { stdout: '', stderr: '' };
    this._process = spawn(command, args, options);

    this._process.stdout.on('data', (data) => {
      const line = data.toString('utf-8');
      debugStartStdout(line);
      const match = line.match(/listening at (.*)/i);
      if (match) {
        debugStart('found match:', match[1]);
        this._running = true;
        const url = match[1];
        this._url = url;
        this.emit('running', { url });
      }
      output.stdout += line;
    });

    this._process.stderr.on('data', (data) => {
      const line = data.toString('utf-8');
      debugStartStderr(line);
      output.stderr += line;
    });

    this._process.on('error', (err) => {
      debugStartError(err);
      this.emit('error', err);
      this._process = null;
      this._url = null;
    });

    this._process.on('close', (signal) => {
      debugStart('Ended with signal %d', signal);
      this.emit('close', { signal });
      this.emit('end', output);
      this._process = null;
      this._url = null;
    });
  }

  /**
   * Set an environment variable.
   *
   * @param {string} name
   * @param {string} value
   * @returns {HopsCLI}
   */
  addEnvVar(name, value) {
    debug('Adding env var %s: %s', name, value);
    this._env[name] = String(value);
    return this;
  }

  /**
   * Add a command-line argument for the respective
   * Hops-command.
   *
   * @param {string} arg
   * @returns {HopsCLI}
   */
  addArg(arg) {
    debug('Adding CLI arg %s', arg);
    this._args.push(String(arg));
    return this;
  }

  /**
   * Invokes the given command on the Hops CLI.
   *
   * @throws {Error} When the instance is already running a process
   * @throws {Error} When the current working directory has not been defined
   * @returns {HopsCLI}
   */
  run() {
    if (this._process) {
      throw new Error(
        `Already running a "${this._cmd}"-task (PID: ${this._process.pid}).`
      );
    }

    const { _cwd: cwd, _cmd: cmd, _args: userArgs } = this;

    const hopsBin = resolveFrom(cwd, 'hops/bin');
    const args = [hopsBin, cmd, ...userArgs.filter(Boolean)];
    const options = {
      env: this._env,
      cwd,
    };

    if (cmd === 'build') {
      debugBuild('Invoking "hops build"...');
      const command = [process.argv[0], ...args].join(' ');
      process.nextTick(() => this._build(command, options));
    }
    if (cmd === 'start') {
      debugStart('Invoking "hops start"...');
      process.nextTick(() => this._start(process.argv[0], args, options));
    }

    return this;
  }

  /**
   * Retrieve the URL of the Hops dev-server
   * Only available, when running HopsCLI in "start"-mode.
   *
   * @throws {Error} When not running HopsCLI in "start"-mode
   * @throws {Error} When HopsCLI has not be invoked yet
   * @returns {Promise<string>}
   */
  async getUrl() {
    if (this._url) {
      return this._url;
    }

    if (this._cmd !== 'start') {
      throw new Error('No URL available when running in "build"-mode.');
    }

    return new Promise((resolve) =>
      process.nextTick(() => {
        if (!this._process) {
          throw new Error('Please call .run() first.');
        }

        this.once('running', ({ url }) => resolve(url));
      })
    );
  }

  /**
   * Stops a the Hops CLI when it's in "start"-mode.
   *
   * @throws {Error} When called on a HopsCLI-instance in "build"-mode
   * @returns {boolean} Could successfully end the process
   */
  stop() {
    if (this._cmd !== 'start') {
      console.warn('Cannot stop HopsCLI in "build"-mode.');
      return;
    }

    if (!this._running || !this._process) {
      throw new Error('Please call .run() first.');
    }

    const result = this._process.kill();
    this.emit('end');
    this._process = null;

    return result;
  }
}

module.exports = { HopsCLI };
