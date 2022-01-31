'use strict';

import { extname } from 'path';
import { ensureLeadingSlash } from 'pathifist';

export default (stats, chunks) => {
  const { entryFiles, vendorFiles } = stats;
  const chunkFiles = chunks.reduce((result, chunk) => {
    const chunkGroup = stats.namedChunkGroups[chunk];
    const assets = chunkGroup.assets.map((asset) =>
      ensureLeadingSlash(asset.name)
    );
    return [...result, ...assets];
  }, []);

  return [...vendorFiles, ...chunkFiles, ...entryFiles]
    .filter(
      (asset, index, self) =>
        self.indexOf(asset) === index &&
        /\.(css|js)$/.test(asset) &&
        !/\.hot-update\./.test(asset)
    )
    .reduce(
      (result, asset) => {
        const extension = extname(asset).substring(1);
        result[extension].push(asset);

        return result;
      },
      { css: [], js: [] }
    );
};
