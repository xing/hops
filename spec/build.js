
var fs = require('fs');
var path = require('path');
var util = require('util');

var test = require('tape');
var shell = require('shelljs');

var appRoot = path.resolve(__dirname, '..', 'app');

function exec() {
  return shell.exec(
    util.format.apply(util, arguments),
    { silent: true }
  );
}

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

  t.notOk(fileExists(htmlFile));
  t.notOk(fileExists(cssFile));
  t.notOk(fileExists(jsFile));

  exec('cd %s && npm start --production', appRoot);

  t.ok(fileExists(htmlFile));
  t.ok(fileExists(cssFile));
  t.ok(fileExists(jsFile));
});
