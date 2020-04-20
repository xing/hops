'use strict';

const {
  async: { parallel },
} = require('mixinable');

const { Mixin } = require('hops-mixin');

const {
  internal: { validate, invariant },
} = require('hops-bootstrap');

const { createDoctor } = require('../../lib/doctor');

class DoctorMixin extends Mixin {
  constructor(...args) {
    super(...args);
    this.doctor = createDoctor(this.config);
  }
  diagnose({ validateConfig, detectDuplicatePackages }) {
    validateConfig();
    detectDuplicatePackages('@untool/*');
  }
  bootstrap() {
    const { doctor } = this;
    return this.diagnose(doctor).then((results) =>
      doctor.collectResults(
        ...[].concat(...results.filter((result) => result !== undefined))
      )
    );
  }
  handleArguments() {
    const { doctor } = this;
    const logger = this.getLogger();
    doctor.logResults(logger);
  }
}

DoctorMixin.strategies = {
  diagnose: validate(parallel, ([doctor]) =>
    invariant(
      doctor instanceof createDoctor,
      'diagnose(): Received invalid doctor argument'
    )
  ),
};

module.exports = DoctorMixin;
