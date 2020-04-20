'use strict';

const indexFile = require('directory-index');
const { RawSource } = require('webpack-sources');
const deprecate = require('depd')('hops-webpack');
const { trimLeadingSlash } = require('pathifist');

exports.RenderPlugin = class RenderPlugin {
  constructor(render, requests) {
    deprecate(
      '[DEP003] Static rendering is deprecated and will be removed in a future major release ' +
        '(https://github.com/untool/untool/blob/master/DEPRECATIONS.md#dep003).'
    );

    this.apply = (compiler) => {
      compiler.hooks.compilation.tap('RenderPlugin', (compilation) => {
        if (compilation.compiler.isChild()) {
          return;
        }
        const promise = requests.then((requests) =>
          Promise.all(
            requests.map((request) =>
              render(request).then((content) => ({
                outfile: trimLeadingSlash(
                  request.outfile || indexFile(request.url || request)
                ),
                content,
              }))
            )
          )
        );
        compilation.hooks.additionalAssets.tapPromise('RenderPlugin', () =>
          promise.then((results) =>
            results.forEach(({ outfile, content }) => {
              compilation.assets[outfile] = new RawSource(content);
            })
          )
        );
      });
    };
  }
};
