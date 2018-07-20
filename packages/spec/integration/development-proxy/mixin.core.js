const { Mixin } = require('@untool/core');

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
}

module.exports = ProxyTargetMixin;
