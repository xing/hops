const { Mixin } = require('hops-mixin');

module.exports = class DoctorCoreMixin extends Mixin {
  diagnose({ pushError, pushWarning }, mode) {
    if (mode === 'develop') {
      pushError('doctor-mixin-b-one', 'Err::Mixin-B First');
      pushWarning('Warn::Mixin-B First');
    }
    if (mode === 'build') {
      pushError('doctor-mixin-b-one', 'Err::Mixin-B Second');
      pushWarning('Warn::Mixin-B Second');
    }
  }
};
