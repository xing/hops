'use strict';

var chalk = require('chalk');
var readline = require('readline');

module.exports = function (message) {
  return new Promise(function (resolve) {
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(`${message} ${chalk.gray('yes/[no]')}`, function (answer) {
      rl.close();
      resolve(/^y(es)?$/i.test(answer));
    });
  });
};
