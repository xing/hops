'use strict';

var hopsConfig = require('hops-config');

var createDispatcher = require('./lib/events');

module.exports = createDispatcher(function(emit) {
  if (
    'serviceWorker' in navigator &&
    (window.location.protocol === 'https:' ||
      window.location.hostname === 'localhost')
  ) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register(hopsConfig.workerPath).then(
        function(registration) {
          emit('registration', registration);
        },
        function(err) {
          emit('failure', err);
        }
      );
    });
  } else {
    emit('failure', new Error('serviceWorker support missing'));
  }
});

module.exports.emit = function() {
  // proxy postmessage to service worker...
};
