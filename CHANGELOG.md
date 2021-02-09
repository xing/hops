# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [14.0.0-nightly.7](https://github.com/xing/hops/compare/v14.0.0-nightly.6...v14.0.0-nightly.7) (2021-02-09)


### Bug Fixes

* **postcss:** tidy up misplaced [@charset](https://github.com/charset) directives ([7de0751](https://github.com/xing/hops/commit/7de0751e777975127b5e8e49bfdb863ab7c2a7c9))
* disable native Webpack stats in develop-mode ([33a060b](https://github.com/xing/hops/commit/33a060b191d94822c5d0868782c1c6cbdc88b8a5))





# [14.0.0-nightly.6](https://github.com/xing/hops/compare/v14.0.0-nightly.5...v14.0.0-nightly.6) (2021-01-13)


### Bug Fixes

* **postcss:** disable external PostCSS configs ([0083506](https://github.com/xing/hops/commit/008350615e18733bbf0c95e6cf25d8756bb7e978))





# [14.0.0-nightly.5](https://github.com/xing/hops/compare/v14.0.0-nightly.4...v14.0.0-nightly.5) (2021-01-11)


### Bug Fixes

* **bootstrap:** add Ajv formats ([7a516dc](https://github.com/xing/hops/commit/7a516dc358a6899ff8889eadbe7c43dc1ea47ed9))
* **bootstrap:** limit pattern properties, too ([9e8c045](https://github.com/xing/hops/commit/9e8c0457d19d0c697f61d55948709ad52c98d946))
* **bootstrap:** opt out of Ajv's strict mode ([28b429b](https://github.com/xing/hops/commit/28b429b228f3205831cdf6d85500fb58b8874bef))
* **bootstrap:** use default import of Ajv ([49fa6e9](https://github.com/xing/hops/commit/49fa6e98938e0c1e52c872bef9a3289a28e5ced8))
* update dependency ajv to v7 ([b2cac42](https://github.com/xing/hops/commit/b2cac42847dc9b5b110dc8eff0eb7499c9fc2b04))
* **postcss:** update Webpack's CSS compilation ([c7e8b1e](https://github.com/xing/hops/commit/c7e8b1e236e1e1ed745917f6c83783efee161828))
* **webpack:** ensure forked compiler exits when done ([642459e](https://github.com/xing/hops/commit/642459ecad38a529235c474404905b28459fe665))


### Features

* **jest-environment:** add package jest-environment-hops ([e5a7941](https://github.com/xing/hops/commit/e5a7941888b3fb8115b583dacd78e95f39a104d9))
* **postcss:** add option to enable named exports for CSS Modules ([426c051](https://github.com/xing/hops/commit/426c051f129a0c5ef0e5cc65d47bdaf6355e9084))
* **postcss:** export CSS Modules as ES Modules ([5f4ff80](https://github.com/xing/hops/commit/5f4ff80bf2897f737ba1bdcf3d9ea8322f35326e))


### BREAKING CHANGES

* **postcss:** CSS Modules switched to ESM and now export the styles
object as a `default`-export.





# [14.0.0-nightly.4](https://github.com/xing/hops/compare/v14.0.0-nightly.3...v14.0.0-nightly.4) (2020-12-07)


### Bug Fixes

* **bootstrap:** do not try to resolve ESM packages for presets ([e00c047](https://github.com/xing/hops/commit/e00c047c21eec896a4e00b7b2383771271b6cd63))
* **create-hops-app:** force legacy peer deps handling for npm@7 ([c1fd0cb](https://github.com/xing/hops/commit/c1fd0cb47f206be3ad7dfaf5a5d8f1ab6400e518))
* **webpack:** always transpile optional chaining and nullish coalescing ([a996301](https://github.com/xing/hops/commit/a996301c5c7c6ce30bd594d414a1d93af946c0f1))
* **webpack:** consider the current node version for babel cache ([70ab6b7](https://github.com/xing/hops/commit/70ab6b765bdb191c2a4f1a4b6474f7512de0929e))
* update dependency supports-color to v8 ([910aba9](https://github.com/xing/hops/commit/910aba9e16ebefab136db29c9eb242a59f548cbf))





# [14.0.0-nightly.3](https://github.com/xing/hops/compare/v14.0.0-nightly.2...v14.0.0-nightly.3) (2020-11-20)


### Bug Fixes

* **webpack:** compile browser bundle for latest chrome only ([ec7aa01](https://github.com/xing/hops/commit/ec7aa01f43bf989944aed464511a3bab52fe63af))
* **webpack:** fix memory leak in StatsWriterPlugin ([42e7fc8](https://github.com/xing/hops/commit/42e7fc836a43f534efe381f17065ce77a3ab6c68))
* upgrade dependency is-plain-obj ([3f9fb41](https://github.com/xing/hops/commit/3f9fb4144ddbcab62a0f02e11dd5947e5b81994b))
* upgrade graphql-tools monorepo ([9530be1](https://github.com/xing/hops/commit/9530be135335dd454d44a0a4db8f3ef246279865))
* upgrade react monorepo to v17 ([ccd74f0](https://github.com/xing/hops/commit/ccd74f01923b8b902c64deaa8990b67cfe781bed))
* upgrade webpack-bundle-analyzer to v4 ([6522387](https://github.com/xing/hops/commit/65223876a1a35e936036194511de0a4ac4fbbb9f))
* upgrade webpack-dev-middleware to v4 ([83b39ee](https://github.com/xing/hops/commit/83b39ee866a10e292a9c68c7b62673b038bf4205))
* upgrade yargs to v16 ([35e48f1](https://github.com/xing/hops/commit/35e48f1a72e7e3ef220b3cedfc30209d00b715f7))
* **spec:** hops dependencies should be wildcards ([88aab72](https://github.com/xing/hops/commit/88aab7229d127083b12c03873582e2c5a0aaa8ab))





# [14.0.0-nightly.2](https://github.com/xing/hops/compare/v14.0.0-nightly.1...v14.0.0-nightly.2) (2020-11-13)


### Features

* **jest-preset:** import jest-config from jest package ([903d07c](https://github.com/xing/hops/commit/903d07c6cb80689ac342a7e55aa4f58f9b107247))
* **jest-preset:** make babel-jest & ts-jest peer-dependencies ([af4c932](https://github.com/xing/hops/commit/af4c9321ad85b5181866ccd6358e5b1ff50e8b3e))


### BREAKING CHANGES

* **jest-preset:** babel-jest & ts-jest need to be installed additionally now in order
to set up Jest for Hops.





# [14.0.0-nightly.1](https://github.com/xing/hops/compare/v13.0.0...v14.0.0-nightly.1) (2020-11-06)


### Bug Fixes

* update dependency mini-css-extract-plugin to v1 ([45344c4](https://github.com/xing/hops/commit/45344c4708be39bb1f82432aac50ebc8a09dfc25))
* update dependency style-loader to v2 ([0b2d3c9](https://github.com/xing/hops/commit/0b2d3c9c7fc0c18f8e1c266ce8d7e8dfe87d392e))
* **bootstrap:** ignore exports fields when resolving presets ([618bc76](https://github.com/xing/hops/commit/618bc76eab109b0a09dadd4124cd5e78cbece472))
* **typescript:** preserve JSX ([b4948bb](https://github.com/xing/hops/commit/b4948bb1883f3dfd3fabeb17ea10694e14ef0415))
* **webpack:** accept object argument in BuildError ([30016ee](https://github.com/xing/hops/commit/30016ee6e6fc9cd2c53f413dff61b5206bf0d80e))


### Features

* **info:** introduce helpers for emitting warnings & errors ([84095e8](https://github.com/xing/hops/commit/84095e8d955ac1093bf12cdc0e8dad60fe2d86d1))
* **info:** make logger available in server runtime ([f550cf1](https://github.com/xing/hops/commit/f550cf1d4fbdd1ff28172edba87be616f9905125))
* **info:** use existing logger if available ([de7d62e](https://github.com/xing/hops/commit/de7d62e955953b966d7f66d5c4ca819e4dc591d7))
* add support for Node v15 ([75d22c8](https://github.com/xing/hops/commit/75d22c88db5beab3fa4f3edf29ccd5c5fb29fd2f))


### BREAKING CHANGES

* the `esModule` option is `true` by default, you need to change `const locals = require('./styles.css')`/`require('./styles.css')` to `import locals from './styles.css'`/`import './styles.css'`
* the `esModule` option is `true` by default, you need to change `const locals = require('./styles.css')`/`require('./styles.css')` to `import locals from './styles.css'`/`import './styles.css'`





[Hops v13 changelog](https://github.com/xing/hops/blob/v13.x/CHANGELOG.md)
