# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="10.4.4"></a>
## [10.4.4](https://github.com/xing/hops/compare/v10.4.3...v10.4.4) (2018-04-26)


### Bug Fixes

* **build-config:** Do not use optimizations that assume concatenation ([5faa93d](https://github.com/xing/hops/commit/5faa93d))




<a name="10.4.3"></a>
## [10.4.3](https://github.com/xing/hops/compare/v10.4.2...v10.4.3) (2018-04-24)


### Bug Fixes

* update dependency style-loader to ^0.21.0 ([6ba2bb2](https://github.com/xing/hops/commit/6ba2bb2))




<a name="10.4.0"></a>
# [10.4.0](https://github.com/xing/hops/compare/v10.2.0-rc.5...v10.4.0) (2018-04-17)


### Bug Fixes

* **build-config:** make service worker plugin async via tapAsync ([f230ffc](https://github.com/xing/hops/commit/f230ffc))
* **build-config:** make webmanifest loader webpack 4 compatible ([1c398ee](https://github.com/xing/hops/commit/1c398ee))
* **build-config:** remove mjs support when resolving files ([59947ea](https://github.com/xing/hops/commit/59947ea))
* **build-config:** use [name]-[chunkhash] as chunk names ([83021d4](https://github.com/xing/hops/commit/83021d4))


### Features

* **build-config:** add CSS optimizer plugin to minify assets ([236e127](https://github.com/xing/hops/commit/236e127))
* **build-config:** get rid of manifest plugin, simplify config loader ([70aa374](https://github.com/xing/hops/commit/70aa374))
* **build-config:** introduce global css mode ([4d9b36f](https://github.com/xing/hops/commit/4d9b36f))
* **build-config:** switch to mini-css-extract-plugin ([37d5b8f](https://github.com/xing/hops/commit/37d5b8f)), closes [/github.com/webpack-contrib/extract-text-webpack-plugin/issues/731#issuecomment-374548865](https://github.com//github.com/webpack-contrib/extract-text-webpack-plugin/issues/731/issues/issuecomment-374548865)
* **build-config:** tweak Webpack configs for v4 ([b28a787](https://github.com/xing/hops/commit/b28a787))
* **build-config:** update to latest alpha of extract text plugin ([823b562](https://github.com/xing/hops/commit/823b562))
* **build-config:** update webpack to v4 ([eafe4f2](https://github.com/xing/hops/commit/eafe4f2))




<a name="10.3.0"></a>
# [10.3.0](https://github.com/xing/hops/compare/v10.3.0-rc.3...v10.3.0) (2018-04-09)




**Note:** Version bump only for package hops-build-config

<a name="10.2.0"></a>
# [10.2.0](https://github.com/xing/hops/compare/v10.2.0-rc.5...v10.2.0) (2018-03-26)




**Note:** Version bump only for package hops-build-config

<a name="10.0.2"></a>
## [10.0.2](https://github.com/xing/hops/compare/v10.0.1...v10.0.2) (2018-02-15)




**Note:** Version bump only for package hops-build-config

<a name="10.0.1"></a>
## [10.0.1](https://github.com/xing/hops/compare/v10.0.0...v10.0.1) (2018-02-09)




**Note:** Version bump only for package hops-build-config

<a name="10.0.0"></a>
# [10.0.0](https://github.com/xing/hops/compare/v10.0.0-rc.4...v10.0.0) (2018-02-07)




**Note:** Version bump only for package hops-build-config

<a name="9.7.0"></a>
# [9.7.0](https://github.com/xing/hops/compare/v9.6.1...v9.7.0) (2018-01-22)


### Bug Fixes

* **build-config:** fix dependency asset imports ([4cd4b1d](https://github.com/xing/hops/commit/4cd4b1d)), closes [#342](https://github.com/xing/hops/issues/342)


### Features

* **build-config:** add .node files to exclusion regex ([f59f733](https://github.com/xing/hops/commit/f59f733))
* **build-config:** optimize exclusion heuristic ([b9bddbb](https://github.com/xing/hops/commit/b9bddbb))




<a name="9.5.0"></a>
# [9.5.0](https://github.com/xing/hops/compare/v9.4.3...v9.5.0) (2018-01-09)


### Features

* **build-config:** move manifest getters into the config loader ([d7e5aa0](https://github.com/xing/hops/commit/d7e5aa0))
* **build-config:** re-add config to node build ([ebbd930](https://github.com/xing/hops/commit/ebbd930))




<a name="9.3.2"></a>
## [9.3.2](https://github.com/xing/hops/compare/v9.3.1...v9.3.2) (2018-01-08)


### Bug Fixes

* **hops-build-config:** exclude manifest.js.map as well ([29a5f61](https://github.com/xing/hops/commit/29a5f61))
* **hops-build-config:** move StatsWriterPlugin down so it does not include removed manifest chunk ([ce2d68d](https://github.com/xing/hops/commit/ce2d68d))




<a name="9.3.0"></a>
# [9.3.0](https://github.com/xing/hops/compare/v9.2.0...v9.3.0) (2017-12-14)


### Features

* **build-config:** make environment variables configurable ([27de5fe](https://github.com/xing/hops/commit/27de5fe))




<a name="9.1.1"></a>
## [9.1.1](https://github.com/xing/hops/compare/v9.1.0...v9.1.1) (2017-12-05)




**Note:** Version bump only for package hops-build-config

<a name="9.0.0"></a>
# [9.0.0](https://github.com/xing/hops/compare/v8.0.0...v9.0.0) (2017-11-27)




**Note:** Version bump only for package hops-build-config

<a name="8.0.0"></a>
# [8.0.0](https://github.com/xing/hops/compare/v7.4.1...v8.0.0) (2017-11-22)


### Bug Fixes

* **build-config:** exclude absolute paths from bundled config ([4ecc41f](https://github.com/xing/hops/commit/4ecc41f))
* **build-config:** inline core-js polyfills in bundled Node.js code ([37e0feb](https://github.com/xing/hops/commit/37e0feb))
* **build-config:** replace babel-minify with uglify-es ([f1be32c](https://github.com/xing/hops/commit/f1be32c))


### Code Refactoring

* **build-config:** remove propTypes in production builds ([50c9d6c](https://github.com/xing/hops/commit/50c9d6c))


### Features

* **config:** allow targeting specific Node version in babel preset ([4437c6b](https://github.com/xing/hops/commit/4437c6b))
* **hops-build-config:** add source maps to production build output ([9cfde51](https://github.com/xing/hops/commit/9cfde51))
* **hops-build-config:** add webpack-stats-plugin to build ([a752635](https://github.com/xing/hops/commit/a752635))


### BREAKING CHANGES

* **build-config:** Hops now no longer has built-in support for converting flow type
annotations into react prop-type definitions.
It still supports flow out of the box, via the babel-react preset,
but now it only removes flow type annotations from the build instead
of converting them to prop-types.




<a name="7.4.1"></a>
## [7.4.1](https://github.com/xing/hops/compare/v7.4.0...v7.4.1) (2017-11-08)




**Note:** Version bump only for package hops-build-config

<a name="7.4.0"></a>
# [7.4.0](https://github.com/xing/hops/compare/v7.3.5...v7.4.0) (2017-11-01)




**Note:** Version bump only for package hops-build-config

<a name="7.3.0"></a>
# [7.3.0](https://github.com/xing/hops/compare/v7.2.0...v7.3.0) (2017-10-26)


### Features

* **build-config:** add graphql loader support ([938133a](https://github.com/xing/hops/commit/938133a))




<a name="7.2.0"></a>
# [7.2.0](https://github.com/xing/hops/compare/v7.1.0...v7.2.0) (2017-10-18)


### Features

* **build-config:** added mode as environment variable ([f8855df](https://github.com/xing/hops/commit/f8855df))




<a name="7.1.0"></a>
# [7.1.0](https://github.com/xing/hops/compare/v7.0.0...v7.1.0) (2017-10-16)




**Note:** Version bump only for package hops-build-config

<a name="7.0.0"></a>
# [7.0.0](https://github.com/xing/hops/compare/v6.2.8...v7.0.0) (2017-10-13)


### Features

* **build-config:** split hops packages, introduce changelog
