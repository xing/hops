const { Mixin } = require('@untool/core');
const { sync, async } = require('mixinable');

module.exports = {
  Mixin,
  strategies: { sync, async },
};
