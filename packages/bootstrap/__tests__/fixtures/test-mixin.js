// eslint-disable-next-line node/no-extraneous-require
const { Mixin } = require('hops-mixin');

class TestMixin extends Mixin {
  constructor(...args) {
    super(...args);
    TestMixin.mixinCreated = true;
  }
}

TestMixin.mixinCreated = false;

module.exports = TestMixin;
