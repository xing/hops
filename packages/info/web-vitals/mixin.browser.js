import { Mixin, strategies } from 'hops-mixin';
import { getCLS, getFID, getLCP } from 'web-vitals';

const {
  sync: { override },
} = strategies;

class WebVitalsMixin extends Mixin {
  constructor(config, element, { webVitals: options = {} } = {}) {
    super(config, element);

    this.options = options;
  }

  bootstrap() {
    const handler = this.getWebVitalsHandler();

    if (typeof handler === 'function') {
      getCLS(handler);
      getFID(handler);
      getLCP(handler);
    }
  }

  getWebVitalsHandler() {
    return this.options.handler;
  }
}

WebVitalsMixin.strategies = {
  getWebVitalsHandler: override,
};

export default WebVitalsMixin;
