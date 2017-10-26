'use strict';

var prompt = require('prompt');

module.exports = function (message) {
  var yesno = {
    name: 'yesno',
    message: message,
    validator: /y[es]*|n[o]?/i,
    warning: 'Must respond yes or no',
    default: 'no'
  };

  return new Promise(function (resolve, reject) {
    prompt.get(yesno, function (error, answer) {
      if (error) {
        return reject(error);
      }
      resolve(answer.yesno[0] === 'y');
    });
  });
};
