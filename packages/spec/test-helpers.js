const { spawn } = require('child_process');

const startServer = ({ cwd, command }) =>
  new Promise((resolve, reject) => {
    let onKill;
    const killPromise = new Promise(resolve => (onKill = resolve));

    const started = spawn('node_modules/.bin/hops', [command], { cwd });
    const kill = () => {
      started.kill();
      return killPromise;
    };

    started.stdout.on('data', data => {
      const line = data.toString('utf-8');
      const match = line.match(/server listening at (.*)/);
      if (match) {
        const url = match[1];
        resolve({ url, kill });
      }
    });

    let stderr = '';
    started.stderr.on('data', data => {
      stderr += data.toString('utf-8');
    });

    started.on('close', code => {
      onKill();
      if (code) {
        reject({ code, stderr });
      }
    });

    started.on('error', error => reject(error));
  });

module.exports.startServer = startServer;
