const { transform } = require('@babel/core');
const regex = /importComponent/g;

function importComponentLoader(source) {
  const callback = this.async();

  if (!regex.test(source)) {
    return callback(null, source);
  }

  const options = this.getOptions();

  transform(
    source,
    {
      plugins: [
        [require.resolve('./babel'), options],
        require.resolve('@babel/plugin-syntax-jsx'),
      ],
      filename: this.resourcePath,
    },
    (err, result) => {
      if (err) {
        return callback(err);
      }

      callback(null, result.code, result.map);
    }
  );
}

module.exports = importComponentLoader;
