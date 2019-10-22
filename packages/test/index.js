const { initialize } = require('@untool/core');

const HopsTest = ({ config = {}, children }) => {
  const { enhanceTestElement } = initialize({});
  const [element] = enhanceTestElement([children, config]);

  return element;
};

exports.HopsTest = HopsTest;
