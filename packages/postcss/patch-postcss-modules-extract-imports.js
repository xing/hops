require('core-js/features/array/flat');
const { dirname } = require('path');
const { create } = require('enhanced-resolve');
const postcssModulesExtractImports = require('postcss-modules-extract-imports');

const resolve = create.sync({
  extensions: ['.css'],
  mainFields: ['style'],
  symlinks: false,
});
const matchImports = /^(.+?)\s+from\s+(?:"([^"]+)"|'([^']+)'|(global))$/;

const plugin = postcssModulesExtractImports();

(function patchModules() {
  module.children
    .filter(mod => mod.id.includes('postcss-modules-extract-imports'))
    .forEach(mod => {
      // XXX: The following line mutates exports of a CommonJS module
      mod.exports = postcssModulesExtractImportsPatched;
    });
})();

function postcssModulesExtractImportsPatched() {
  return css => {
    const inputPath = dirname(css.source.input.file);
    // XXX: The "patchDeclarationValue" mutates the CSS AST
    findComposesDeclarations(css).forEach(patchDeclarationValue(inputPath));
    return plugin(css);
  };
}

function findComposesDeclarations(css) {
  return css.nodes
    .filter(node => node.type === 'rule')
    .map(rule => rule.nodes)
    .flat()
    .filter(node => node.type === 'decl' && node.prop === 'composes');
}

const patchDeclarationValue = inputPath => declaration => {
  const matches = declaration.value.match(matchImports);
  if (matches) {
    const [, symbols, doubleQuotePath, singleQuotePath, global] = matches;

    if (!global) {
      const importPath = doubleQuotePath || singleQuotePath;

      if (!isRelative(inputPath, importPath)) {
        declaration.value = `${symbols} from '~${importPath}'`;
      }
    }
  }
};

function isRelative(inputPath, importPath) {
  try {
    resolve(inputPath, `./${importPath}`);
    return true;
  } catch {
    return false;
  }
}
