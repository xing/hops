const { callable, override, parallel, pipe, compose } = require('mixinable');
// eslint-disable-next-line node/no-extraneous-require
const { Mixin } = require('hops-mixin');

class AMixin extends Mixin {
  callFirst() {
    return this.callSecond();
  }

  override() {
    return 'from a-mixin';
  }

  parallel() {
    return 'from a-mixin';
  }

  pipe(input) {
    return `${input} Hello`.trim();
  }

  compose(input) {
    return { 'a-mixin': input };
  }
}

AMixin.strategies = {
  callFirst: callable,
  override,
  parallel,
  pipe,
  compose,
};

module.exports = AMixin;
