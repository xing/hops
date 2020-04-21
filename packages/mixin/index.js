const { Mixin } = require('hops-bootstrap');
const { sync, async } = require('mixinable');
const deprecate = require('depd')('hops-config');

deprecate(
  '[DEP0005] hops-mixin is deprecated. Please import "Mixin" from "hops-bootstrap" and strategies from "mixinable" https://github.com/xing/hops/blob/master/DEPRECATIONS.md#dep0005.'
);

module.exports = {
  Mixin,
  strategies: { sync, async },
};
