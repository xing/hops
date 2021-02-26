import { sync } from 'mixinable';
import { Mixin } from 'hops-mixin';
import { internal as bootstrap } from 'hops-bootstrap';

const { callable } = sync;
const { validate, invariant } = bootstrap;

class ServerLogMixin extends Mixin {
  bootstrap(_, res) {
    const { logger } = res.locals;
    this.logger = logger;
  }

  getLogger() {
    return this.logger;
  }
}

ServerLogMixin.strategies = {
  getLogger: validate(callable, ({ length }) => {
    invariant(length === 0, 'getLogger(): Received unexpected argument(s)');
  }),
};

export default ServerLogMixin;
