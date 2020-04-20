const { renderToString } = require('react-dom/server');

module.exports = (element) => {
  const reactMarkup = renderToString(element);
  return { reactMarkup };
};
