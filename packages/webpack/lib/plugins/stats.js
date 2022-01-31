const { mkdirSync, writeFileSync } = require('fs');
const { dirname } = require('path');
const { trimTrailingSlash } = require('pathifist');

const analyzeCompilation = ({ chunks, chunkGroups, chunkGraph }) => {
  const entryChunks = [];

  for (const chunk of chunks) {
    for (const module of chunkGraph.getChunkModulesIterable(chunk)) {
      if (chunkGraph.isEntryModule(module)) {
        entryChunks.push(chunk);
        continue;
      }
    }
  }

  const vendorChunks = chunkGroups.reduce(
    (result, { chunks }) => [
      ...result,
      ...(chunks.find((chunk) => entryChunks.includes(chunk))
        ? chunks.filter((chunk) => !entryChunks.includes(chunk))
        : []),
    ],
    []
  );

  return { entryChunks, vendorChunks };
};

const extractFiles = (chunkData, rawPublicPath) => {
  const publicPath = trimTrailingSlash(rawPublicPath);
  const { entryChunks, vendorChunks } = chunkData;
  const gatherFiles = (result, { files }) => [
    ...result,
    ...Array.from(files).map((file) => `${publicPath}/${file}`),
  ];

  return {
    entryFiles: entryChunks.reduce(gatherFiles, []),
    vendorFiles: vendorChunks.reduce(gatherFiles, []),
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
            ...compilation.getStats().toJson({
              chunksSort: 'id',
              all: false,
              assets: true,
              chunkGroupChildren: true,
              entrypoints: true,
              chunkGroups: true,
            }),
            ...extractFiles(analyzeCompilation(compilation), publicPath),
          };

          mkdirSync(dirname(statsFile), { recursive: true });
          writeFileSync(statsFile, JSON.stringify(stats), 'utf8');
          enhancedPromise.resolve(stats);
        });
      });

      compiler.hooks.watchRun.tap('StatsWritePlugin', () => {
        enhancedPromise.reset();
      });
    };
  }
};
