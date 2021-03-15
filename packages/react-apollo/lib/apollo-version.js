'use strict';
const { sync: findUp } = require('find-up');

/**
 * @returns {number}
 */
exports.getApolloVersion = () => {
  const pkgFile = findUp('package.json');
  const pkgData = require(pkgFile);

  const hasApollo3 = [
    ...Object.keys(pkgData.dependencies || {}),
    ...Object.keys(pkgData.devDependencies || {}),
  ].includes('@apollo/client');

  return hasApollo3 ? 3 : 2;
};
