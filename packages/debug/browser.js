/* eslint-env browser */

const debugCookie =
  (document.cookie.match(/(^|;)\s*hops_debug\s*=\s*([^;]+)/) || []).pop() || '';
const debugRegex = new RegExp(debugCookie.replace('*', '.*'));

module.exports = function debug(name) {
  const isEnabled = debugCookie !== '' && debugRegex.test(name);

  return isEnabled
    ? (format, ...args) => {
        if (typeof format === 'string') {
          console.debug(
            `%c${name}%c ${format}`,
            'font-weight: bold',
            'font-weight: initial',
            ...args
          );
        } else {
          console.debug(
            `%c${name}%c`,
            'font-weight: bold',
            'font-weight: initial',
            format,
            ...args
          );
        }
      }
    : () => {};
};
