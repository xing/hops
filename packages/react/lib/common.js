'use strict';

exports.createCombinedContext = function(
  config,
  ReactContext,
  combineContexts
) {
  var mergedConfig = Object.assign({}, config);
  delete mergedConfig.extensions;
  var mergedContexts = [ReactContext];
  if (config.extensions) {
    config.extensions.forEach(function(extension) {
      var context = extension.context;
      mergedContexts.push(context);
      var extensionConfig = extension.config;
      mergedConfig = Object.assign(mergedConfig, extensionConfig);
    });
  }
  var combinedContext = combineContexts.apply(null, mergedContexts);
  return combinedContext(mergedConfig);
};
