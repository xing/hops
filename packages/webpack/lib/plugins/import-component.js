const BasicEvaluatedExpression = require('webpack/lib/BasicEvaluatedExpression');
const Dependency = require('webpack/lib/Dependency');
const { builders } = require('ast-types');

/** @typedef {import('webpack').Compiler} Compiler */
/** @typedef {import('webpack').javascript['JavascriptParser']} JavascriptParser */

class ImportComponentDependency extends Dependency {
  constructor(range) {
    super();
    this.range = range;
  }

  updateHash(hash) {
    hash.update('ImportComponentDependency');
  }
}

ImportComponentDependency.Template = class ImportComponentDependencyTemplate {
  apply(dep, source, runtime) {
    console.log({ dep, source, runtime });
    // const moduleId = runtime.moduleId({
    //   module: dep._module,
    //   request: dep._request,
    // });
    source.replace(
      dep.range[0],
      dep.range[1],
      'importComponent({ load() {} })'
    );
  }
};

module.exports = class ImportComponentPlugin {
  apply(/** @type {Compiler} */ compiler) {
    const pluginName = this.constructor.name;

    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      compilation.dependencyTemplates.set(
        ImportComponentDependency,
        new ImportComponentDependency.Template()
      );
    });

    compiler.hooks.normalModuleFactory.tap(pluginName, (factory) => {
      factory.hooks.parser.for('javascript/auto').tap(pluginName, (
        /** @type {InstanceType<JavascriptParser>} */ parser
      ) => {
        parser.hooks.evaluate
          .for('Identifier')
          .tap({ name: pluginName, before: 'Parser' }, (node) => {
            if (node.name === 'importComponent') {
              console.log(node);
              const expression = new BasicEvaluatedExpression();
              expression.setRange(node.range);
              expression.setExpression(node);
              expression.setIdentifier(node.name);

              return expression;
            }
          });

        parser.hooks.evaluateIdentifier
          .for('imported var')
          .tap({ name: pluginName, before: 'Parser' }, (node) => {
            if (node.name === 'importComponent') {
              const expression = new BasicEvaluatedExpression();
              expression.setRange(node.range);
              expression.setExpression(node);
              expression.setIdentifier(node.name);

              return expression;
            }
          });

        parser.hooks.call
          .for('importComponent')
          .tap({ name: pluginName, before: 'Parser' }, (node) => {
            if (node.type === 'CallExpression') {
              parser.state.module.addDependency(
                new ImportComponentDependency(node.range)
              );
              // node.arguments[0] = builders.objectExpression([
              //   builders.objectProperty(
              //     builders.identifier('load'),
              //     builders.stringLiteral('testhelloworld')
              //   ),
              // ]);
            }
          });
      });
    });
  }
};
