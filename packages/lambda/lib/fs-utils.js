'use strict';

var os = require('os');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var Transform = require('stream').Transform;

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

function templateFile (from, to, replacer) {
  return new Promise(function (resolve, reject) {
    fs.createReadStream(from)
      .pipe(new Transform({
        transform: function (chunk, encoding, callback) {
          this.push(replacer(chunk.toString('utf-8')));
          callback();
        }
      }))
      .pipe(fs.createWriteStream(to))
      .on('error', reject)
      .on('finish', function () { resolve(to); });
  });
}

module.exports = {
  hashFileContents: hashFileContents,
  createTmpDirectory: createTmpDirectory,
  templateFile: templateFile
};
