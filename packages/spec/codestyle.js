/* eslint-env node, mocha */

var semistandard = require('mocha-standard/semistandard');

describe('code style', function () {
  this.timeout(10000);

  it('conforms to semistandard', semistandard.files(
    [
      'packages/**/*.js',
      'spec/**/*.js'
    ], {
      parser: 'babel-eslint',
      plugins: ['flowtype'],
      ignore: ['packages/template-default/**/*.js']
    }
  ));
});
