const { async } = require('mixinable');
const { Mixin } = require('hops-mixin');
const { internal: bootstrap } = require('hops-bootstrap');
const { createDoctor } = require('.');

const { parallel } = async;
const { validate, invariant } = bootstrap;

const getMode = (argv) => {
  const { _: cmd = [], production } = argv;
  const command = cmd.join(' ');

  switch (true) {
    case command === 'start' && production === true:
      return 'build-serve';
    case command === 'start' && production === false:
      return 'develop';
    case command === 'develop':
    case command === 'serve':
    case command === 'build':
      return command;
    default:
      return 'indeterminate';
  }
};

class DoctorMixin extends Mixin {
  constructor(...args) {
    super(...args);

    this.doctor = createDoctor(this.config, (...args) =>
      this.handleError(...args)
    );
  }

  diagnose({ validateConfig, detectDuplicatePackages }) {
    validateConfig();
    detectDuplicatePackages('hops-*');
  }

  bootstrap() {
    const { doctor } = this;

    return Promise.resolve().then(() => {
      doctor.getMode().then((mode) =>
        this.diagnose(doctor, mode).then((results) => {
          doctor.collectResults(
            ...[].concat(...results.filter((result) => result !== undefined))
          );
          doctor.logResults(this.getLogger());
        })
      );
    });
  }

  handleArguments(argv) {
    this.doctor.setMode(getMode(argv));
  }
}

DoctorMixin.strategies = {
  diagnose: validate(parallel, ([doctor, mode]) => {
    invariant(
      [
        'validateConfig',
        'detectDuplicatePackages',
        'collectResults',
        'logResults',
        'pushError',
        'pushWarning',
      ].every((fn) => typeof doctor[fn] === 'function'),
      'diagnose(): Received invalid doctor argument'
    );
    invariant(
      typeof mode === 'string',
      'diagnose(): Received invalid mode argument'
    );
  }),
};

module.exports = DoctorMixin;
