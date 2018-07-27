const { Mixin } = require('hops-mixin');

module.exports = class extends Mixin {
  configureServer(app) {
    app.get('/api', (req, res) => {
      return res.json({ value: 42 });
    });
    return app;
  }
};
