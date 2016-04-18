
var fs = require('fs');
var path = require('path');
var util = require('util');

var test = require('tape');
var shell = require('shelljs');

var appRoot = path.resolve(__dirname, '..', 'app');

function fileExists(file) {
  try {
    return fs.statSync(file).size;
  }
  catch (e) {
    return null;
  }
}

test('build test', function (t) {
  t.plan(6);

  var htmlFile = path.join(appRoot, 'dist', 'index.html');
  var cssFile = path.join(appRoot, 'dist', 'bundle.css');
  var jsFile = path.join(appRoot, 'dist', 'bundle.js');

  t.notOk(fileExists(htmlFile), 'html shell not there already');
  t.notOk(fileExists(cssFile), 'css file not there already');
  t.notOk(fileExists(jsFile), 'js file not there already');

  shell.exec(
    util.format('cd %s && npm start --production', appRoot),
    { silent: true },
    function () {
      t.ok(fileExists(htmlFile), 'html file created and not empty');
      t.ok(fileExists(cssFile), 'css file created and not empty');
      t.ok(fileExists(jsFile), 'js file created and not empty');
    }
  );
});
