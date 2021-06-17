const { mkdirSync, writeFileSync } = require('fs');
const { dirname } = require('path');
const { trimTrailingSlash } = require('pathifist');

const analyzeCompilation = ({ chunks, chunkGroups, chunkGraph }) => {
  const entryChunks = [];
  const chunksByModule = [];

  for (const chunk of chunks) {
    for (const entry of chunkGraph.getChunkEntryModulesIterable(chunk)) {
      if (chunkGraph.isModuleInChunk(entry, chunk)) {
        entryChunks.push(chunk);
      }
    }

    for (const module of chunkGraph.getChunkModules(chunk)) {
      const moduleId = chunkGraph.getModuleId(module);

      if (!moduleId) {
        continue;
      }

      const { chunks } = chunkGroups.find(({ chunks }) =>
        chunks.includes(chunk)
      );

      chunksByModule.push([moduleId, chunks]);
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

  return { entryChunks, vendorChunks, chunksByModule };
};

const extractFiles = (chunkData, rawPublicPath) => {
  const publicPath = trimTrailingSlash(rawPublicPath);
  const { entryChunks, vendorChunks, chunksByModule } = chunkData;
  const gatherFiles = (result, { files }) => [
    ...result,
    ...Array.from(files).map((file) => `${publicPath}/${file}`),
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
            ...compilation.getStats().toJson({
              chunksSort: 'id',
              all: false,
              assets: true,
              chunkGroupChildren: true,
              entrypoints: true,
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
