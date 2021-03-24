# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [14.0.0-nightly.11](https://github.com/xing/hops/compare/v14.0.0-nightly.10...v14.0.0-nightly.11) (2021-03-24)


### Bug Fixes

* **webpack:** ignore source-maps in total asset size ([dc59abd](https://github.com/xing/hops/commit/dc59abda61bb1bc27956c047a759485f4b5ca51f))


### Features

* **webpack:** introduce experimental esbuild transpilation ([1746b4d](https://github.com/xing/hops/commit/1746b4da07b53c2b37815916bc8ed14aa24a6d1a))





# [14.0.0-nightly.10](https://github.com/xing/hops/compare/v14.0.0-nightly.9...v14.0.0-nightly.10) (2021-03-18)

**Note:** Version bump only for package hops-webpack





# [14.0.0-nightly.9](https://github.com/xing/hops/compare/v14.0.0-nightly.7...v14.0.0-nightly.9) (2021-03-15)


### Bug Fixes

* remove mixin-order escape hatch ([22f921f](https://github.com/xing/hops/commit/22f921f86768b8b2a71053b877073e506843a16a))
* remove static rendering ([ed90792](https://github.com/xing/hops/commit/ed90792176298284d1f19fef4c09571edfaa07e2))


### Features

* introduce hops-debug as a node/browser wrapper for debug ([84d5f80](https://github.com/xing/hops/commit/84d5f8032a3d7679d9d7c53e55f8e9d28fc193c8))


### BREAKING CHANGES

* the config option `enableLegacyMixinSortOrder` has been removed.
* static rendering of Hops apps has been removed (`hops build --static`)





# [14.0.0-nightly.8](https://github.com/xing/hops/compare/v14.0.0-nightly.7...v14.0.0-nightly.8) (2021-03-09)


### Bug Fixes

* remove mixin-order escape hatch ([22f921f](https://github.com/xing/hops/commit/22f921f86768b8b2a71053b877073e506843a16a))
* remove static rendering ([ed90792](https://github.com/xing/hops/commit/ed90792176298284d1f19fef4c09571edfaa07e2))


### Features

* introduce hops-debug as a node/browser wrapper for debug ([84d5f80](https://github.com/xing/hops/commit/84d5f8032a3d7679d9d7c53e55f8e9d28fc193c8))


### BREAKING CHANGES

* the config option `enableLegacyMixinSortOrder` has been removed.
* static rendering of Hops apps has been removed (`hops build --static`)





# [14.0.0-nightly.7](https://github.com/xing/hops/compare/v14.0.0-nightly.6...v14.0.0-nightly.7) (2021-02-09)


### Bug Fixes

* disable native Webpack stats in develop-mode ([33a060b](https://github.com/xing/hops/commit/33a060b191d94822c5d0868782c1c6cbdc88b8a5))





# [14.0.0-nightly.6](https://github.com/xing/hops/compare/v14.0.0-nightly.5...v14.0.0-nightly.6) (2021-01-13)

**Note:** Version bump only for package hops-webpack





# [14.0.0-nightly.5](https://github.com/xing/hops/compare/v14.0.0-nightly.4...v14.0.0-nightly.5) (2021-01-11)


### Bug Fixes

* **webpack:** ensure forked compiler exits when done ([642459e](https://github.com/xing/hops/commit/642459ecad38a529235c474404905b28459fe665))





# [14.0.0-nightly.4](https://github.com/xing/hops/compare/v14.0.0-nightly.3...v14.0.0-nightly.4) (2020-12-07)


### Bug Fixes

* **webpack:** always transpile optional chaining and nullish coalescing ([a996301](https://github.com/xing/hops/commit/a996301c5c7c6ce30bd594d414a1d93af946c0f1))
* **webpack:** consider the current node version for babel cache ([70ab6b7](https://github.com/xing/hops/commit/70ab6b765bdb191c2a4f1a4b6474f7512de0929e))
* update dependency supports-color to v8 ([910aba9](https://github.com/xing/hops/commit/910aba9e16ebefab136db29c9eb242a59f548cbf))





# [14.0.0-nightly.3](https://github.com/xing/hops/compare/v14.0.0-nightly.2...v14.0.0-nightly.3) (2020-11-20)


### Bug Fixes

* **webpack:** compile browser bundle for latest chrome only ([ec7aa01](https://github.com/xing/hops/commit/ec7aa01f43bf989944aed464511a3bab52fe63af))
* **webpack:** fix memory leak in StatsWriterPlugin ([42e7fc8](https://github.com/xing/hops/commit/42e7fc836a43f534efe381f17065ce77a3ab6c68))
* upgrade dependency is-plain-obj ([3f9fb41](https://github.com/xing/hops/commit/3f9fb4144ddbcab62a0f02e11dd5947e5b81994b))
* upgrade webpack-dev-middleware to v4 ([83b39ee](https://github.com/xing/hops/commit/83b39ee866a10e292a9c68c7b62673b038bf4205))





# [14.0.0-nightly.2](https://github.com/xing/hops/compare/v14.0.0-nightly.1...v14.0.0-nightly.2) (2020-11-13)

**Note:** Version bump only for package hops-webpack





# [14.0.0-nightly.1](https://github.com/xing/hops/compare/v13.0.0...v14.0.0-nightly.1) (2020-11-06)


### Bug Fixes

* **webpack:** accept object argument in BuildError ([30016ee](https://github.com/xing/hops/commit/30016ee6e6fc9cd2c53f413dff61b5206bf0d80e))


### Features

* add support for Node v15 ([75d22c8](https://github.com/xing/hops/commit/75d22c88db5beab3fa4f3edf29ccd5c5fb29fd2f))
