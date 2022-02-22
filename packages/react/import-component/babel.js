'use strict';

const nodePath = require('path');
const crypto = require('crypto');

/**
 * This plugin transforms the following function call:
 * ```javascript
 * importComponent(() => import('./component'));
 * ```
 *
 * Into the following:
 *
 * ```javascript
 * importComponent({
 *  load: () => import('./component'),
 *  moduleId: require.resolveWeak('./component'),
 *  chunkName: () => 'hash'
 * })
 * ```
 */

const regex = /webpackChunkName:\s*(?:(['"])([^'"]*)\1|([^\s]*))/;

function extractChunkName(t, leadingComments) {
  if (!leadingComments || !Array.isArray(leadingComments)) {
    return;
  }

  const comment = leadingComments.find((comment) =>
    comment.value.includes('webpackChunkName')
  );

  if (!comment) {
    return;
  }

  const results = comment.value.match(regex);
  const cleanChunkName = results[2] || results[3];

  return cleanChunkName;
}

module.exports = ({ types: t }) => ({
  visitor: {
    ImportDeclaration(path, state) {
      const modules = ['hops-react', this.opts.module];
      const source = path.node.source.value;
      if (!modules.includes(source)) return;

      const specifiers = path.get('specifiers');
      const specifier = specifiers.find(
        (specifier) => specifier.node.imported.name === 'importComponent'
      );
      if (!specifier) return;

      const bindingName = specifier.node.local.name;
      const binding = path.scope.getBinding(bindingName);

      binding.referencePaths.forEach((refPath) => {
        const call = refPath.parentPath;
        t.assertCallExpression(call);

        const argument = call.get('arguments.0');
        if (!argument) {
          throw new Error(
            '"importComponent" must be called with at least one parameter!'
          );
        }

        t.assertArrowFunctionExpression(argument);
        t.assertCallExpression(argument.get('body'));
        t.assertImport(argument.get('body.callee'));

        const argPath = argument.get('body.arguments.0');
        const importedComponent = argPath.node.value;
        const resourcePathNode = t.stringLiteral(importedComponent);

        let chunkName = extractChunkName(t, argPath.node.leadingComments);
        if (!chunkName) {
          const hasher = crypto.createHash('md4');
          hasher.update(nodePath.relative(this.opts.rootDir, state.filename));
          hasher.update(importedComponent);
          const hash = hasher
            .digest('base64')
            .replace('/', '-')
            .replace('+', '_')
            .replace('=', '')
            .slice(0, 4);

          t.addComment(
            argPath.node,
            'leading',
            ` webpackChunkName: '${hash}' `
          );
          chunkName = hash;
        }

        argument.replaceWith(
          t.objectExpression([
            t.objectProperty(
              t.identifier('load'),
              t.arrowFunctionExpression(
                [],
                t.callExpression(t.identifier('import'), [
                  t.addComments(
                    resourcePathNode,
                    'leading',
                    argPath.node.leadingComments
                  ),
                ])
              )
            ),
            t.objectProperty(
              t.identifier('moduleId'),
              t.callExpression(
                t.memberExpression(
                  t.identifier('require'),
                  t.identifier('resolveWeak')
                ),
                [resourcePathNode]
              )
            ),
            t.objectProperty(
              t.identifier('chunkName'),
              t.arrowFunctionExpression([], t.stringLiteral(chunkName))
            ),
          ])
        );
      });
    },
  },
});

module.exports.path = __filename;
