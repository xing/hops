const { Mixin } = require('hops-mixin');
const React = require('react');
const { ThemeProvider } = require('styled-components');

class StyledComponentsMixin extends Mixin {
  constructor(config, element, { styled: options = {} } = {}) {
    super(config);
    this.theme = options.theme || {};
  }

  enhanceElement(reactElement) {
    return React.createElement(
      ThemeProvider,
      { theme: this.theme },
      reactElement
    );
  }
}

module.exports = StyledComponentsMixin;
