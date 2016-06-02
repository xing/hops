
require('babel-register')({
  ignore: /node_modules\//
});

require('css-modules-require-hook')({
  generateScopedName: '[path][name]-[local]-[hash:base64:5]'
});
