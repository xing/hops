'use strict';

const { readFileSync: readFile } = require('fs');
const { join } = require('path');
const { format } = require('url');

const { createServer: createHTTPServer } = require('http');
const { createServer: createHTTPSServer } = require('https');

const portfinder = require('portfinder');

const defaultKeyFile = join(__dirname, 'ssl', 'localhost.key');
const defaultCertFile = join(__dirname, 'ssl', 'localhost.cert');

const localHosts = ['127.0.0.1', '0.0.0.0', '::1', '::', ''];

const createServer = (app, https) => {
  if (https) {
    const { keyFile, certFile } = https;
    const key = readFile(keyFile || defaultKeyFile);
    const cert = readFile(certFile || defaultCertFile);
    return createHTTPSServer({ key, cert }, app);
  }
  return createHTTPServer(app);
};

const shutdownServer = (server, { locals }, { gracePeriod }) => {
  const timeoutPromise = new Promise((resolve, reject) =>
    setTimeout(
      () => reject(new Error('Failed to gracefully shut down server')),
      gracePeriod
    )
  );
  if (!locals.shuttingDown) {
    locals.shuttingDown = true;
    server.emit('shutdown');
    return Promise.race([
      timeoutPromise,
      new Promise((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve()))
      ),
    ]);
  }
  return timeoutPromise;
};

const getPort = (port) => {
  portfinder.basePort = 8080;
  return port ? Promise.resolve(port) : portfinder.getPortPromise();
};

const formatUrl = (https, host, port) => {
  const protocol = https ? 'https' : 'http';
  const hostname = localHosts.includes(host) ? 'localhost' : host;
  return format({ protocol, hostname, port });
};

module.exports = (app, { config, handleError, inspectServer }) => {
  const { domain } = app.locals;
  const { host, port, https } = config;
  const server = createServer(app, https);
  domain.on('error', (error) => {
    console.log('DOMAIN ERROR', error);
    handleError(error, true);
    shutdownServer(server, app, config).then(
      () => process.exit(1),
      (error) => handleError(error)
    );
  });
  process.on('SIGTERM', () =>
    shutdownServer(server, app, config).then(
      () => process.exit(0),
      (error) => {
        console.log('HANDLE Error.apply................', error);
        handleError(error);
      }
    )
  );
  getPort(port).then(
    (port) =>
      server.listen(port, host, (error) => {
        if (error) {
          handleError(error);
        } else {
          inspectServer(server);
          server.emit('startup', formatUrl(https, host, port));
        }
      }),
    handleError
  );
};
