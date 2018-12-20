const debug = require('debug')('hops:development-proxy');
const {
  Mixin,
  strategies: {
    sync: { sequence },
  },
} = require('hops-mixin');
const proxy = require('http-proxy-middleware');

class ProxyMixin extends Mixin {
  configureServer(app, middlewares) {
    const proxyConfig = this.config.proxy;

    if (process.env.NODE_ENV === 'production' || !proxyConfig) {
      return;
    }

    const options = {
      changeOrigin: true,
      logLevel: 'warn',
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
          {
            ...options,
            target: proxyConfig,
          }
        )
      );
    }

    if (typeof proxyConfig === 'object') {
      debug('Using proxy object version', proxyConfig);

      Object.entries(proxyConfig).forEach(([path, config]) => {
        const { target, routes } =
          typeof config === 'string' ? { target: config } : config;

        middlewares.initial.push(
          proxy(path, {
            ...options,
            target,
            routes,
          })
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
