const debug = require('debug')('hops:development-proxy');
const {
  Mixin,
  strategies: {
    sync: { sequence },
  },
} = require('hops-mixin');
const proxy = require('http-proxy-middleware');

class ProxyMixin extends Mixin {
  configureServer(app, middlewares, mode) {
    const proxyConfig = this.config.proxy;

    if (mode !== 'develop' || !proxyConfig) {
      return;
    }

    const hooks = {
      onProxyReq: this.onProxyReq,
      onProxyRes: this.onProxyRes,
      onError: this.onProxyError,
    };

    if (typeof proxyConfig === 'string') {
      debug('Using proxy string version: ', proxyConfig);

      middlewares.initial.push(
        proxy(
          (pathName, req) => {
            return (
              req.headers.accept && !req.headers.accept.includes('text/html')
            );
          },
          Object.assign(
            {
              target: proxyConfig,
              changeOrigin: true,
              logLevel: 'warn',
            },
            hooks
          )
        )
      );
    }

    if (typeof proxyConfig === 'object') {
      debug('Using proxy object version', proxyConfig);

      Object.entries(proxyConfig).forEach(([path, { target }]) => {
        middlewares.initial.push(
          proxy(
            path,
            Object.assign(
              {
                changeOrigin: true,
                logLevel: 'warn',
                target,
              },
              hooks
            )
          )
        );
      });
    }
  }
}

ProxyMixin.strategies = {
  onProxyReq: sequence,
  onProxyRes: sequence,
  onProxyError: sequence,
};
module.exports = ProxyMixin;
