'use strict';

module.exports = function createDispatcher(emitter) {
  var events = {};
  emitter(function(topic) {
    var args = Array.prototype.slice.call(arguments, 1);
    if (topic in events) {
      events[topic].forEach(function(handler) {
        handler.apply(null, args);
      });
    }
  });
  var dispatcher = {
    on: function(topic, handler) {
      events[topic] = events[topic] || [];
      events[topic].push(handler);
    },
    off: function(topic, handler) {
      if (events[topic]) {
        for (var i = 0; i < events[topic].length; i++) {
          if (events[topic][i] === handler) {
            events[topic].splice(i, 1);
            break;
          }
        }
      }
    },
    once: function(topic, handler) {
      var wrapper = function() {
        handler.apply(null, arguments);
        dispatcher.off(topic, wrapper);
      };
      dispatcher.on(topic, wrapper);
    },
  };
  return dispatcher;
};
