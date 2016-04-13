#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const shell = require('shelljs');
const normalizeData = require('normalize-package-data');

const config = require('../lib/config');
const pkgPath = path.join(config.appRoot, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath));

normalizeData(pkg);

const scripts = Object.assign({}, { start: 'hops' }, pkg.scripts);
const babel = Object.assign({}, { extends: 'hops/etc/babel' }, pkg.babel);
const main = pkg.main || 'src/main.js';

fs.writeFileSync(
  pkgPath,
  JSON.stringify(Object.assign({}, pkg, { main, scripts, babel }), null, 2)
);

const tryCopy = (file) => {
  try {
    fs.accessSync(file.path, fs.F_OK);
  } catch (e) {
    shell.cp('-R', file.origin, file.destination);
  }
};

const projectPath = (pathname) => path.join(config.appRoot, pathname);

const template = [
  {
    path: config.srcDir,
    origin: path.join('app', 'src'),
    destination: path.join('..', '..')
  },
  {
    path: projectPath('.eslintrc.js'),
    origin: path.join('app', '.eslintrc.js'),
    destination: config.appRoot
  },
  {
    path: projectPath('.stylelintrc.js'),
    origin: path.join('app', '.stylelintrc.js'),
    destination: config.appRoot
  }
];

template.forEach(tryCopy);
