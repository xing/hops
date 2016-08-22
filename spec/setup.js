/* eslint-env node, mocha */
'use strict';

var fs = require('fs');
var path = require('path');
var assert = require('assert');


var appRoot = path.resolve(__dirname, '..', '.tmp', 'test');

function fileExists(file) {
  try {
    return fs.statSync(file).size;
  }
  catch (e) {
    return null;
  }
}


var packageFile = path.join(appRoot, 'package.json');


describe('setup: file creation test', function () {
  it('should have created expected files', function () {
    assert(fileExists(packageFile), 'package.json created and not empty');
  });
});
