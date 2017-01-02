'use strict';


exports.default = {
  test: /\.((html)|(svg)|((o|t)tf)|(woff2?)|(jpe?g)|(ico))$/,
  use: {
    loader: 'file-loader'
  }
};
