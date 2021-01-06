const { callable, override, parallel, pipe, compose } = require('mixinable');
const { Mixin } = require('hops-mixin');

class AnotherMixin extends Mixin {
  callSecond() {
    return 'execute callSecond';
  }

  override() {
    return 'from another-mixin';
  }

  parallel() {
    return 'from another-mixin';
  }

  pipe(input) {
    return `${input} World`.trim();
  }

  compose(input) {
    return { 'another-mixin': input };
  }
}

AnotherMixin.strategies = {
  callSecond: callable,
  override,
  parallel,
  pipe,
  compose,
};

module.exports = AnotherMixin;
