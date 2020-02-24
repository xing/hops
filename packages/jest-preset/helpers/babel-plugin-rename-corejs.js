const { dirname } = require('path');

module.exports = function pluginRenameCoreJS() {
  function replaceSource(source) {
    source.value = source.value.replace(
      /^core-js/,
      dirname(require.resolve('core-js/package.json'))
    );
  }

  function isRequire(path) {
    if (!path.get('callee').isIdentifier({ name: 'require' })) return false;
    if (path.node.arguments.length === 0) return false;
    if (!path.get('arguments.0').isStringLiteral()) return false;
    return true;
  }

  const visitor = {
    ImportDeclaration(path) {
      replaceSource(path.node.source);
    },
    CallExpression(path) {
      if (isRequire(path)) {
        replaceSource(path.node.arguments[0]);
      }
    },
  };

  return {
    visitor,
  };
};
