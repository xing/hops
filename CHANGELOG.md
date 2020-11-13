# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
