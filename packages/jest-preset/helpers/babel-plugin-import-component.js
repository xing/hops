/**
 * Babel-plugin for enabling the synchronous import
 * of components in the Jest environment.
 *
 * Compiles `importComponent` calls like...
 *
 * ```javascript
 * importComponent(() => import('./test'));
 * ```
 *
 * ...to ones where the `require`-call is inserted.
 *
 * ```javascript
 * importComponent({ component: require('./test') });
 * importComponent({ component: require('./another-test') });
 * ```
 *
 * The optional second argument of `importComponent` is left
 * untouched as in hops-react/lib/babel.
 */
module.exports = ({ types: t }) => ({
  visitor: {
    ImportDeclaration(path) {
      const specifiers = path.get('specifiers');
      const specifier = specifiers.find(
        (specifier) =>
          specifier.node.imported &&
          specifier.node.imported.name === 'importComponent'
      );
      if (!specifier) return;

      const bindingName = specifier.node.local.name;
      const binding = path.scope.getBinding(bindingName);

      binding.referencePaths.forEach((refPath) => {
        let importComponentCallExpression = refPath.parentPath;

        // jest --coverage adds instrumentation code so we need to find the
        // actual call expression
        if (importComponentCallExpression.isSequenceExpression()) {
          importComponentCallExpression = importComponentCallExpression
            .get('expressions')
            .find((path) => path.isCallExpression());
        }

        t.assertCallExpression(importComponentCallExpression);

        const argument = importComponentCallExpression.get('arguments.0');
        if (!argument) {
          throw new Error(
            '"importComponent" must be called with at least one parameter!'
          );
        }

        function objectWithSyncRequire(moduleIdentifier) {
          return t.objectExpression([
            t.objectProperty(
              t.identifier('component'),
              t.callExpression(t.identifier('require'), [
                t.stringLiteral(moduleIdentifier),
              ])
            ),
          ]);
        }

        let importCallExpression = argument.get('body');
        let pathReplacement = (path, moduleIdentifier) =>
          path.replaceWith(objectWithSyncRequire(moduleIdentifier));

        t.assertArrowFunctionExpression(argument);

        // jest adds coverage instrumentation to the arrow function so we need
        // to find the `import()` call expression in the return statement
        if (importCallExpression.isBlockStatement()) {
          importCallExpression = importCallExpression
            .get('body')
            .find((p) => p.isReturnStatement())
            .get('argument');

          pathReplacement = (path, moduleIdentifier) => {
            path.traverse({
              CallExpression(path) {
                if (path.get('callee').isImport()) {
                  path.replaceWith(objectWithSyncRequire(moduleIdentifier));
                }
              },
            });

            path.replaceWith(t.CallExpression(path.node, []));
          };
        }

        t.assertCallExpression(importCallExpression);
        t.assertImport(importCallExpression.get('callee'));

        const importedComponent = importCallExpression.get('arguments.0').node
          .value;

        pathReplacement(argument, importedComponent);
      });
    },
  },
});
