exports.handleConsoleOutput = (msg) => {
  const type = msg.type();
  const text = msg.text();
  if (type === 'error') {
    throw new Error(`${type} in browser console: ${text}`);
  }
};
