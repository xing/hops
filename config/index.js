
var util = require('util');

var helpers = require('./helpers');

function getConfig() {
  var npmEvent = process.env.npm_lifecycle_event;
  var fileName = util.format('webpack.%s.js', npmEvent);
  var filePath = helpers.resolve(fileName);
  return require(filePath);
}

module.exports = getConfig();
