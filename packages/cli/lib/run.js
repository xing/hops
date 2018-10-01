'use strict';

const { dirname, join } = require('path');

const { sync: findUp } = require('find-up');
const { sync: resolve } = require('enhanced-resolve');

const getRootDir = () => {
  const pkgFile = findUp('package.json');
  if (!pkgFile) throw new Error("Can't resolve package.json");
  return dirname(pkgFile);
};

const configure = (
  config = { untoolNamespace: 'hops', mixins: [join(__dirname, '..')] },
  options
) => ({
  run() {
    try {
      const rootDir = getRootDir();
      const yargsPath = resolve(rootDir, '@untool/yargs');
      const { configure: configureYargs } = require(yargsPath);
      configureYargs(config, options).run();
    } catch (error) {
      if (error.message && error.message.startsWith("Can't resolve")) {
        console.error("Error: Can't find @untool/yargs \n");
      } else {
        console.error(error.stack ? error.stack.toString() : error.toString());
      }
      process.exit(1);
    }
  },
  configure,
});

module.exports = configure();
