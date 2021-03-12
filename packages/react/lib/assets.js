'use strict';

import { extname } from 'path';

export default (stats, modules) => {
  const { entryFiles, vendorFiles, moduleFileMap } = stats;
  const moduleFiles = modules.reduce(
    (result, module) => [...result, ...moduleFileMap[module]],
    []
  );

  return [...vendorFiles, ...moduleFiles, ...entryFiles]
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
