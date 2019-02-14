const { Mixin } = require('hops-mixin');

class ProxyTargetMixin extends Mixin {
  configureServer(app) {
    app.get('/proxy/:slug', (req, res) => {
      res.send('proxy:' + req.params.slug);
    });

    app.get('/proxy2/:slug', (req, res) => {
      res.send('proxy2:' + req.params.slug);
    });

    return app;
  }

  onProxyReq(proxyReq, req, res) {
    if (req.url === '/proxy-req') {
      res.send('onProxyReq');
    }
  }

  onProxyRes(proxyRes, req, res) {
    if (req.url === '/proxy-res') {
      res.send('onProxyRes');
    }
  }
}

module.exports = ProxyTargetMixin;
