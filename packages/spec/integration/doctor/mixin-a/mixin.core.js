const { Mixin } = require('hops-mixin');

const defer = () => new Promise((resolve) => setTimeout(resolve, 200));

module.exports = class DoctorCoreMixin extends Mixin {
  diagnose({ pushError, pushWarning }, mode) {
    if (mode === 'develop') {
      pushError('doctor-mixin-a-one', 'Err::Mixin-A First');
      pushWarning('Warn::Mixin-A First');
    }
    if (mode === 'build') {
      pushError('doctor-mixin-a-two', 'Err::Mixin-A Second');
    }
    return defer().then(() => pushWarning('Warn::Mixin-A Second'));
  }
};
