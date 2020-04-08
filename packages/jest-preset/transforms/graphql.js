function getLoader() {
  try {
    /* eslint-disable node/no-extraneous-require */
    require.resolve('graphql-tag/loader');
    /* eslint-enable node/no-extraneous-require */
    // Not all users of the jest-preset-hops package want to use graphql too
    // therefore we only want to add the graphql-tag/loader if it is already
    // installed in the application
    /* eslint-disable-next-line node/no-extraneous-require */
    return require('graphql-tag/loader');
  } catch (_) {
    console.warn('graphql-tag/loader not found');
    return function () {
      return '{}';
    };
  }
}

module.exports = {
  process(src) {
    return getLoader().call({ cacheable: function () {} }, src);
  },
};
