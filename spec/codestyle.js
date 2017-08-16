/* eslint-env node, mocha */

var semistandard = require('mocha-standard/semistandard');

describe('code style', function () {
  this.timeout(10000);

  it('conforms to semistandard', semistandard.files(
    [
      'packages/**/*.js',
      'demo/src/*.js',
      'spec/**/*.js'
    ], {
      parser: 'babel-eslint',
      plugins: ['flowtype']
    }
  ));
});
