const debug = require('debug')('hops:development-proxy');
const {
  Mixin,
  strategies: {
    sync: { sequence },
  },
} = require('hops-mixin');
const { createProxyMiddleware: proxy } = require('http-proxy-middleware');

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
      if (proxyConfig === '') {
        if (typeof this.getLogger === 'function') {
          this.getLogger().info(
            `The proxy target "${proxyConfig}" is empty, disabling feature`
          );
        }
        return;
      }

      debug('Using proxy string version', proxyConfig);

      middlewares.initial.push(
        proxy(
          (pathName, req) => {
            const nonhtml =
              req.headers.accept && !req.headers.accept.includes('text/html');
            const xhr = req.headers['x-requested-with'] === 'XMLHttpRequest';

            return nonhtml || xhr;
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
        const { target } =
          typeof config === 'string' ? { target: config } : config;

        if (target === '') {
          if (typeof this.getLogger === 'function') {
            this.getLogger().info(
              `The proxy target "${target}" is empty, ignoring path "${path}"`
            );
          }
          return;
        }

        middlewares.initial.push(
          proxy(path, {
            ...options,
            target,
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
