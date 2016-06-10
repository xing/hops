
var fs = require('fs');
var path = require('path');
var util = require('util');

var test = require('tape');
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

test('build: file creation test', function (t) {
  t.plan(6);

  var jsRegex = /^main-[0-9a-f]+\.js$/;
  var cssRegex = /^main-[0-9a-f]+\.css$/;
  var htmlRegex = /^index\.html$/;

  t.notOk(fileExists(jsRegex), 'js file not there already');
  t.notOk(fileExists(cssRegex), 'css file not there already');
  t.notOk(fileExists(htmlRegex), 'html shell not there already');

  shell.exec(
    util.format('cd %s && npm start --production', appRoot),
    { silent: true },
    function () {
      t.ok(fileExists(jsRegex), 'js file created');
      t.ok(fileExists(cssRegex), 'css file created');
      t.ok(fileExists(htmlRegex), 'html file created');
    }
  );
});
