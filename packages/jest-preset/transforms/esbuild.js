// eslint-disable-next-line node/no-extraneous-require
const { createTransformer } = require('esbuild-jest');
const { transformSync } = require('@babel/core');

const transformer = createTransformer({
  sourcemap: true,
});

const regex = /importComponent/g;

module.exports = {
  process(content, filename, config, opts) {
    if (!regex.test(content)) {
      return transformer.process(content, filename, config, opts);
    }

    const result = transformSync(content, {
      plugins: [
        require.resolve('../helpers/babel-plugin-import-component'),
        require.resolve('@babel/plugin-syntax-jsx'),
      ],
      filename,
    });

    return transformer.process(result.code, filename, config, opts);
  },
};
