'use strict';

var fs = require('fs');
var path = require('path');
var globby = require('globby');
var archiver = require('archiver');
var resolveTree = require('resolve-tree');

function omitSubPaths(_path, i, paths) {
  var isSubPath = paths.some(function (_path1) {
    return (
      _path1 !== _path &&
      path
        .relative(_path, _path1)
        .split(path.sep)
        .every(function (part) {
          return part === '..';
        })
    );
  });
  return !isSubPath;
}

function getProductionDependencies(manifest) {
  return new Promise(function (resolve, reject) {
    resolveTree.manifest(manifest, function (error, tree) {
      if (error) {
        return reject(error);
      }
      resolve(
        resolveTree
          .flattenMap(tree, 'root')
          .filter(function (dependency, i, self) {
            return self.indexOf(dependency) === i;
          })
          .filter(omitSubPaths)
      );
    });
  });
}

module.exports = function createLambdaBundle(
  rootDir,
  outFile,
  include,
  exclude,
  onProgress,
  logger
) {
  return new Promise(function (resolve, reject) {
    var output = fs
      .createWriteStream(outFile)
      .on('error', reject)
      .on('finish', resolve.bind(null, outFile));

    var archive = archiver('zip', { zlib: { level: 9 } });
    archive.on('error', reject);
    if (logger) {
      archive.on('warning', logger.warning.bind(logger));
    }

    if (typeof onProgress === 'function') {
      archive.on('progress', onProgress);
    }

    var productionDependencies = getProductionDependencies(
      require(path.join(rootDir, 'package.json'))
    );

    output.on('open', function () {
      archive.pipe(output);

      productionDependencies.then(function (paths) {
        var patterns = paths.map(function (p) {
          return p + '/**';
        });
        globby(['**', '!node_modules/**'].concat(include).concat(patterns), {
          cwd: rootDir,
          dot: true,
          followSymbolicLinks: true,
          onlyFiles: true,
          ignore: ['.git/**'].concat(exclude),
        }).then(function (paths) {
          paths.forEach(function (file) {
            archive.file(file, { name: path.relative(rootDir, file) });
          });
          archive.finalize();
        });
      });
    });
  });
};
