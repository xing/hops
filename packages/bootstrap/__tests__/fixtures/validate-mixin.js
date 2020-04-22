const { callable } = require('mixinable');
const {
  Mixin,
  internal: { validate },
} = require('../..');

class ValidateMixin extends Mixin {
  validateAndFailArgs() {
    throw new Error('This should not be executed');
  }

  validateAndFailResult() {
    return 'some value';
  }

  validateAndSucceed() {
    return 'Call result';
  }
}

ValidateMixin.strategies = {
  validateAndFailArgs: validate(callable, () => {
    throw new Error('This is invalid');
  }),
  validateAndFailResult: validate(
    callable,
    () => {},
    () => {
      throw new Error('This is invalid');
    }
  ),
  validateAndSucceed: validate(callable),
};

module.exports = ValidateMixin;
