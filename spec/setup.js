
var fs = require('fs');
var path = require('path');

var test = require('tape');

var appRoot = path.resolve(__dirname, '..', 'tmp');

function fileExists(file) {
  try {
    return fs.statSync(file).size;
  }
  catch (e) {
    return null;
  }
}

test('setup test', function (t) {
  t.plan(3);

  var packageFile = path.join(appRoot, 'package.json');
  var eslintFile = path.join(appRoot, '.eslintrc.js');
  var stylelintFile = path.join(appRoot, '.stylelintrc.js');

  t.ok(fileExists(packageFile), 'package.json created and not empty');
  t.ok(fileExists(eslintFile), '.eslintrc created and not empty');
  t.ok(fileExists(stylelintFile), '.stylelintrc created and not empty');
});
