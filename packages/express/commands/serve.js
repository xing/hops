#!/usr/bin/env node
'use strict';

module.exports = function defineServeCommand(args) {
  args.command({
    command: 'serve',
    describe:
      'Starts a production-ready Node.js server to serve your ' + 'application',
    builder: {
      static: {
        alias: 's',
        default: false,
        describe: 'Serve built app with static env variable turned on',
        type: 'boolean',
      },
      production: {
        alias: 'p',
        default: false,
        describe:
          'Minifies the output, generates source maps and removes ' +
          'React developer warnings',
        type: 'boolean',
      },
    },
    handler: function serveHandler(argv) {
      if (argv.production) {
        process.env.NODE_ENV = 'production';
      }
      if (argv.static) {
        process.env.HOPS_MODE = 'static';
      }
      require('..').runServer(argv);
    },
  });
};

if (require.main === module) {
  try {
    require.resolve('hops-local-cli');
    require('hops-local-cli').run(module.exports, 'serve');
  } catch (_) {
    require('hops').run(module.exports, 'serve');
  }
}
