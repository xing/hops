'use strict';

var fs = require('fs');
var path = require('path');
var archiver = require('archiver');
var resolveTree = require('resolve-tree');

function omitSubPaths (_path, i, paths) {
  var isSubPath = paths.some(function (_path1) {
    return _path1 !== _path &&
      path.relative(_path, _path1).split(path.sep).every(function (part) {
        return part === '..';
      });
  });
  return !isSubPath;
}

function getProductionDependencies (manifest) {
  return new Promise(function (resolve, reject) {
    resolveTree.manifest(manifest, function (error, tree) {
      if (error) {
        return reject(error);
      }
      resolve(
        resolveTree.flatten(tree)
          .map(function (dependency) { return dependency.root; })
          .filter(function (dependency, i, self) {
            return self.indexOf(dependency) === i;
          })
      );
    });
  });
}

module.exports = function createLambdaBundle (
  rootDir,
  outFile,
  additionalDirectories,
  additionalFiles,
  onProgress
) {
  return new Promise(function (resolve, reject) {
    var output = fs.createWriteStream(outFile)
      .on('error', reject)
      .on('finish', resolve.bind(null, outFile));

    var archive = archiver('zip', { zlib: { level: 9 } });
    archive.on('error', reject);
    archive.on('warning', console.warn);

    if (typeof onProgress === 'function') {
      archive.on('progress', onProgress);
    }

    var packageJson = path.join(rootDir, 'package.json');
    var manifest = require(packageJson);

    getProductionDependencies(manifest).then(function (dependencies) {
      (additionalDirectories || []).concat(dependencies)
        .filter(omitSubPaths)
        .forEach(function (folder) {
          archive.directory(folder, path.relative(rootDir, folder));
        });

      (additionalFiles || []).concat(packageJson).forEach(function (file) {
        archive.file(file, { name: path.relative(rootDir, file) });
      });

      archive.pipe(output);
      archive.finalize();
    });
  });
};
