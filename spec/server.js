
var path = require('path');
var util = require('util');

var test = require('tape');
var shell = require('shelljs');

var kill = require('tree-kill');
var fetch = require('isomorphic-fetch');

var appRoot = path.resolve(__dirname, '..', 'tmp');

var baseUrl = 'http://localhost:8080/';

test('server test', function (t) {
  t.plan(4);
  fetch(baseUrl)
  .then(function () {
    t.end(new Error('server already running'));
  })
  .catch(function () {
    var childProcess = shell.exec(
      util.format('cd %s && npm start', appRoot),
      { async: true, silent: true }
    );
    setTimeout(function () {
      Promise.all([
        fetch(baseUrl)
          .then(function (res) {
            t.ok(res.ok, 'html shell fetched');
            return res.text();
          })
          .then(function (text) {
            t.ok(text.length, 'html shell not empty');
          })
          .catch(function (e) { t.end(e); }),
        fetch(baseUrl + 'bundle.js')
          .then(function (res) {
            t.ok(res.ok, 'js file fetched');
            return res.text();
          })
          .then(function (text) {
            t.ok(text.length, 'js file not empty');
          })
          .catch(function (e) { t.end(e); })
      ])
      .then(function () { kill(childProcess.pid); })
      .catch(function () { kill(childProcess.pid); });
    }, 5000);
  });
});
