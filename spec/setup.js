/* eslint-env node, mocha */

var fs = require('fs');
var path = require('path');
var assert = require('assert');


var appRoot = path.resolve(__dirname, '..', 'tmp');

function fileExists(file) {
  try {
    return fs.statSync(file).size;
  }
  catch (e) {
    return null;
  }
}


var packageFile = path.join(appRoot, 'package.json');
var eslintFile = path.join(appRoot, '.eslintrc.js');
var stylelintFile = path.join(appRoot, '.stylelintrc.js');
var webpackFile = path.join(appRoot, 'webpack.config.js');


describe('setup: file creation test', function () {
  it('should have created expected files', function () {
    assert(fileExists(packageFile), 'package.json created and not empty');
    assert(fileExists(eslintFile), '.eslintrc created and not empty');
    assert(fileExists(stylelintFile), '.stylelintrc created and not empty');
    assert(fileExists(webpackFile), 'webpack.config.js created and not empty');
  });
});
