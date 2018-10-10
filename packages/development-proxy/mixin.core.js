const debug = require('debug')('hops:development-proxy');
const { Mixin } = require('hops-mixin');
const proxy = require('http-proxy-middleware');

class ProxyMixin extends Mixin {
  configureServer(app, middlewares, mode) {
    const proxyConfig = this.config.proxy;

    if (mode !== 'develop' || !proxyConfig) {
      return;
    }

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
            target: proxyConfig,
            changeOrigin: true,
            logLevel: 'warn',
          }
        )
      );
    }

    if (typeof proxyConfig === 'object') {
      debug('Using proxy object version', proxyConfig);

      Object.entries(proxyConfig).forEach(([path, config]) => {
        middlewares.initial.push(
          proxy(
            path,
            Object.assign(
              {},
              {
                changeOrigin: true,
                logLevel: 'warn',
              },
              config
            )
          )
        );
      });
    }
  }
}

module.exports = ProxyMixin;
