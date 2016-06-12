/* eslint-env node, mocha */

var fs = require('fs');
var path = require('path');
var util = require('util');
var assert = require('assert');

var shell = require('shelljs');


var appRoot = path.resolve(__dirname, '..', 'tmp');

function fileExists(regex) {
  try {
    var index = fs.readdirSync(path.join(appRoot, 'dist')).findIndex(
      function (file) { return file.search(regex) > -1; }
    );
    return index > -1;
  }
  catch (e) {
    return false;
  }
}


var jsRegex = /^main-[0-9a-f]+\.js$/;
var cssRegex = /^main-[0-9a-f]+\.css$/;
var htmlRegex = /^index\.html$/;


describe('build: file creation', function () {
  it('should not already contain files', function () {
    assert(!fileExists(jsRegex), 'js file not there already');
    assert(!fileExists(cssRegex), 'css file not there already');
    assert(!fileExists(htmlRegex), 'html shell not there already');
  });
  it('should create expected files', function (done) {
    shell.exec(
      util.format('cd %s && npm start --production', appRoot),
      { silent: true },
      function () {
        assert(fileExists(jsRegex), 'js file created');
        assert(fileExists(cssRegex), 'css file created');
        assert(fileExists(htmlRegex), 'html file created');
        done();
      }
    );
  }).timeout(60000);
});
