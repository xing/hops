const fs = require('fs');
const url = require('url');
const path = require('path');
const http = require('http');
const https = require('https');
const net = require('net');

function getPort(host, port, max) {
  return new Promise((resolve, reject) => {
    max = max || Math.min(65535, port + 50);
    if (port > max) {
      return reject(new Error('unable to find free port'));
    }
    const server = net.createServer();
    server.on('error', () => {
      resolve(getPort(host, port + 1, max));
      server.close();
    });
    server.listen(port, host, () => {
      server.once('close', () => resolve(port));
      server.close();
    });
  });
}

function createServer(httpsConfig) {
  if (httpsConfig.https) {
    const options = {
      key: fs.readFileSync(
        httpsConfig.keyFile ||
          path.resolve(path.join(__dirname, '..', 'ssl', 'localhost.ssl.key'))
      ),
      cert: fs.readFileSync(
        httpsConfig.certFile ||
          path.resolve(path.join(__dirname, '..', 'ssl', 'localhost.ssl.crt'))
      ),
    };
    return https.createServer.bind(https, options);
  }
  return http.createServer;
}

module.exports = function run(app, config, logger, callback) {
  const server = createServer({
    https: config.https,
    keyFile: config.keyFile,
    certFile: config.certFile,
  })(app);

  function listen(port) {
    server.listen(port, config.host, error => {
      if (error) {
        logger.error(error.stack ? error.stack.toString() : error.toString());
      } else {
        const address = server.address();
        logger.info(
          'hops: Server listening at ' +
            url.format({
              protocol: config.https ? 'https' : 'http',
              hostname:
                address.address === '0.0.0.0' ? 'localhost' : address.address,
              port: address.port,
              pathname: config.basePath,
            })
        );
      }
      if (typeof callback === 'function') {
        callback(error, server);
      }
    });
  }

  if (config.port) {
    listen(config.port);
  } else {
    getPort(config.host, 8080)
      .then(listen)
      .catch(logger.error);
  }
};
