
var helpers = require('../config/helpers');

module.exports = {
  entry: ['hops'],
  extend: helpers.extend.bind(null, __filename)
};
