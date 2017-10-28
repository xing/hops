'use strict';

var os = require('os');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

function hashFileContents (file) {
  return new Promise(function (resolve, reject) {
    var hash = crypto.createHash('sha1').setEncoding('hex');
    fs.createReadStream(file)
      .pipe(hash)
      .on('error', reject)
      .on('finish', function () {
        resolve(hash.read());
      });
  });
}

function createTmpDirectory () {
  return new Promise(function (resolve, reject) {
    fs.mkdtemp(path.join(os.tmpdir(), 'hops-lambda-'), function (error, dir) {
      if (error) { return reject(error); }
      resolve(dir);
    });
  });
}

module.exports = {
  hashFileContents: hashFileContents,
  createTmpDirectory: createTmpDirectory
};
