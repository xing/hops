const { mkdirSync, writeFileSync } = require('fs');
const { dirname } = require('path');
const { trimTrailingSlash } = require('pathifist');

const analyzeCompilation = ({ chunks, chunkGroups }) => {
  const entryChunks = chunks.filter(({ entryModule }) => !!entryModule);
  const vendorChunks = chunkGroups.reduce(
    (result, { chunks }) => [
      ...result,
      ...(chunks.find((chunk) => entryChunks.includes(chunk))
        ? chunks.filter((chunk) => !entryChunks.includes(chunk))
        : []),
    ],
    []
  );

  const chunksByModule = chunks.reduce(
    (result, chunk) =>
      Array.from(chunk.modulesIterable).reduce((result, module) => {
        const { chunks } = chunkGroups.find(({ chunks }) =>
          chunks.includes(chunk)
        );
        return [...result, [module.id, chunks]];
      }, result),
    []
  );

  return { entryChunks, vendorChunks, chunksByModule };
};

const extractFiles = (chunkData, rawPublicPath) => {
  const publicPath = trimTrailingSlash(rawPublicPath);
  const { entryChunks, vendorChunks, chunksByModule } = chunkData;
  const gatherFiles = (result, { files }) => [
    ...result,
    ...files.map((file) => `${publicPath}/${file}`),
  ];

  return {
    entryFiles: entryChunks.reduce(gatherFiles, []),
    vendorFiles: vendorChunks.reduce(gatherFiles, []),
    moduleFileMap: chunksByModule.reduce((result, [module, chunks]) => {
      result[module] = chunks.reduce(gatherFiles, []);
      return result;
    }, {}),
  };
};

exports.StatsWritePlugin = class StatsWritePlugin {
  constructor(enhancedPromise, statsFile) {
    this.apply = (compiler) => {
      compiler.hooks.compilation.tap('StatsWritePlugin', (compilation) => {
        compilation.hooks.additionalAssets.tap('StatsWritePlugin', () => {
          const { publicPath } = compilation.outputOptions;

          if (compilation.compiler.isChild()) {
            return;
          }

          const stats = {
            ...compilation
              .getStats()
              .toJson({ all: false, assets: true, entrypoints: true }),
            ...extractFiles(analyzeCompilation(compilation), publicPath),
          };

          mkdirSync(dirname(statsFile), { recursive: true });
          writeFileSync(statsFile, JSON.stringify(stats), 'utf8');

          enhancedPromise.resolve(stats);
        });
      });
    };
  }
};
