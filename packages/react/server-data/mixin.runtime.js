const React = require('react');
const { sync } = require('mixinable');
const { Mixin } = require('@untool/core');
const { Provider } = require('./context');

class HopsReactServerDataMixin extends Mixin {
  bootstrap(req, res) {
    if (req) {
      this.serverData = Object.assign({}, ...this.getServerData(req, res));
    }
  }

  getTemplateData(data) {
    if (this.serverData) {
      data.globals = {
        ...data.globals,
        _hopsServerData: this.serverData,
      };
    }

    return data;
  }

  enhanceElement(reactElement) {
    const serverData =
      typeof window !== 'undefined' ? window._hopsServerData : this.serverData;

    return <Provider value={serverData}>{reactElement}</Provider>;
  }
}

HopsReactServerDataMixin.strategies = {
  getServerData: sync.sequence,
};

module.exports = HopsReactServerDataMixin;
