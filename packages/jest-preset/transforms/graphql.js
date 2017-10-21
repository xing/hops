function getLoader () {
  try {
    require.resolve('graphql-tag/loader');
    return require('graphql-tag/loader');
  } catch (_) {
    console.warn('graphql-tag/loader not found');
    return function () { return '{}'; };
  }
}

module.exports = {
  process (src) {
    return getLoader().call({ cacheable: function () {} }, src);
  }
};
