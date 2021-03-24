// eslint-disable-next-line node/no-extraneous-require
const { createTransformer } = require('esbuild-jest');

const transformer = createTransformer({
  sourcemap: true,
});

module.exports = {
  process(content, filename, config, opts) {
    content = content.replace(
      /importComponent\s*\(\s*\(\)\s+=>\s+import\(\s*'([^']+)'\s*\)\s*\)/g,
      "importComponent({ component: require('$1') })"
    );

    return transformer.process(content, filename, config, opts);
  },
};
