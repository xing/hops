export const createCombinedContext = (
  config = {},
  ReactContext,
  combineContexts
) => {
  let mergedConfig = Object.assign({}, config);
  delete mergedConfig.extensions;
  const mergedContexts = [ReactContext];
  if (config.extensions) {
    config.extensions.forEach(extension => {
      const context = extension.context;
      mergedContexts.push(context);
      const extensionConfig = extension.config;
      mergedConfig = Object.assign(mergedConfig, extensionConfig);
    });
  }
  const combinedContext = combineContexts(...mergedContexts);
  return combinedContext(mergedConfig);
};
