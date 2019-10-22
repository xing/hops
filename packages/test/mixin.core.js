const {
  Mixin,
  strategies: {
    sync: { pipe },
  },
} = require('hops-mixin');
const { run } = require('jest');

class HopsTestMixin extends Mixin {
  enhanceTestElement([element, config]) {
    const React = require('react');
    const { MemoryRouter } = require('react-router-dom');
    const { memoryRouterProps = null } = config;
    return [
      React.createElement(MemoryRouter, memoryRouterProps, element),
      config,
    ];
  }

  registerCommands(yargs) {
    yargs.command(
      'test',
      'Execute Jest tests',
      () => {},
      argv => run(argv._.slice(1))
    );
  }
}

HopsTestMixin.strategies = {
  enhanceTestElement: pipe,
};

module.exports = HopsTestMixin;
