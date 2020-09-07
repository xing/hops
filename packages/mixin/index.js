const { Mixin } = require('hops-bootstrap');
const { sync, async } = require('mixinable');

module.exports = {
  Mixin,
  strategies: { sync, async },
};
