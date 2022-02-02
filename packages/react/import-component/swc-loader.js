const { transformSync } = require('@swc/core');
const { ImportComponentTransformer } = require('./swc-transformer');

function importComponentLoader(source, inputSourceMap) {
  if (!/[^\w]importComponent\s*\(/.test(source)) return source;

  const { resourcePath: sourceFileName } = this;
  const ts = /\.tsx?$/.test(sourceFileName);
  const tsx = /\.tsx$/.test(sourceFileName);
  const parser = ts
    ? { syntax: 'typescript', tsx }
    : { syntax: 'ecmascript', jsx: true };

  const { code } = transformSync(source, {
    sourceFileName,
    inputSourceMap: inputSourceMap && JSON.stringify(inputSourceMap),
    jsc: {
      target: 'es2022',
      parser,
    },
    plugin: (m) => new ImportComponentTransformer().visitProgram(m),
  });

  return code;
}

module.exports = importComponentLoader;
