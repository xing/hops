/* eslint-env browser */

var { getConfigAndMixins } = require('./lib/loader-shim');

module.exports = function installServiceWorker() {
  return new Promise(function(resolve, reject) {
    if (!('serviceWorker' in navigator)) {
      return reject(
        new Error('ServiceWorkers are not supported in this browser')
      );
    }

    if (
      window.location.protocol === 'https:' ||
      window.location.hostname === 'localhost'
    ) {
      window.addEventListener('load', function() {
        resolve(
          navigator.serviceWorker.register(
            getConfigAndMixins().config.workerPath
          )
        );
      });
    }
  });
};
