const { Mixin } = require('../..');

class TestMixin extends Mixin {
  constructor(...args) {
    super(...args);
    TestMixin.mixinCreated = true;
  }
}

TestMixin.mixinCreated = false;

module.exports = TestMixin;
