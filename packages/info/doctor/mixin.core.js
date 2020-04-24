const { async } = require('mixinable');
const { Mixin } = require('hops-mixin');
const { internal: bootstrap } = require('hops-bootstrap');
const { createDoctor } = require('.');

const { parallel } = async;
const { validate, invariant } = bootstrap;

class DoctorMixin extends Mixin {
  constructor(...args) {
    super(...args);

    this.doctor = createDoctor(this.config);
  }

  diagnose({ validateConfig, detectDuplicatePackages }) {
    validateConfig();
    detectDuplicatePackages('hops-*');
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
      [
        'validateConfig',
        'detectDuplicatePackages',
        'collectResults',
        'logResults',
      ].every((fn) => typeof doctor[fn] === 'function'),
      'diagnose(): Received invalid doctor argument'
    )
  ),
};

module.exports = DoctorMixin;
