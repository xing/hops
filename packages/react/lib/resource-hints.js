const { extname } = require('path');

const extnameToType = (extension) => {
  switch (extension) {
    case 'js':
    case 'mjs':
      return 'script';
    case 'css':
      return 'style';
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'webp':
    case 'svg':
      return 'image';
    case 'woff':
    case 'woff2':
    case 'otf':
    case 'ttf':
      return 'font';
    case 'html':
    case 'htm':
      return 'document';
    default:
      throw new Error(`Received invalid extension "${extension}".`);
  }
};

const augment = (rel) => (acc, resource) => {
  const type = extnameToType(extname(resource).substring(1));
  acc.push({
    rel,
    href: `/${resource}`,
    htmlAs: rel === 'preload' ? type : null,
  });
  return acc;
};

module.exports = (stats) => {
  const { preload = [], prefetch = [] } = stats.entrypoints.main.childAssets;

  return [
    ...preload.reduce(augment('preload'), []),
    ...prefetch.reduce(augment('prefetch'), []),
  ];
};
