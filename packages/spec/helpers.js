const isReactLifecycleWarning = (warning) => {
  const reReactLifecycleWarning = new RegExp(
    'Warning: componentWill[^\\s]+ has been renamed, and is not recommended for use. ' +
      'See https://fb.me/react-async-component-lifecycle-hooks for details.'
  );
  return Boolean(warning.match(reReactLifecycleWarning));
};

const isIntolerableWarning = (type, text) =>
  type === 'warning' && !isReactLifecycleWarning(text);

exports.handleConsoleOutput = (msg) => {
  const type = msg.type();
  const text = msg.text();
  if (type === 'error' || isIntolerableWarning(type, text)) {
    throw new Error(`${type} in browser console: ${text}`);
  }
};
