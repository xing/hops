# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [14.0.0-nightly.9](https://github.com/xing/hops/compare/v14.0.0-nightly.7...v14.0.0-nightly.9) (2021-03-15)


### Bug Fixes

* **info:** remove deprecated handling of warning messages ([4502420](https://github.com/xing/hops/commit/4502420014e44532b2dd580cac94c16beecd6a77))
* remove mixin-order escape hatch ([22f921f](https://github.com/xing/hops/commit/22f921f86768b8b2a71053b877073e506843a16a))
* remove static rendering ([ed90792](https://github.com/xing/hops/commit/ed90792176298284d1f19fef4c09571edfaa07e2))
* require strictly de-duplicated Hops packages ([dd3e30a](https://github.com/xing/hops/commit/dd3e30af9f8746153ec8dcf4f102302811b2c604))
* update dependency puppeteer to v7 ([187d9a5](https://github.com/xing/hops/commit/187d9a5fa6e966225936e1a3ecefc62a5c09414b))
* update dependency puppeteer to v8 ([8ab7206](https://github.com/xing/hops/commit/8ab72065ebd7ae3de59daee888c3250f094b677f))


### chore

* remove peer dependencies for apollo v2 ([581d406](https://github.com/xing/hops/commit/581d406309703f7fd1ae8c189cb38eb18f9f2806))


### Features

* **react-apollo:** implement support for apollo v3 ([ee5e984](https://github.com/xing/hops/commit/ee5e98400584d01ca62969fbe239ea84eafde1f5))
* introduce hops-debug as a node/browser wrapper for debug ([84d5f80](https://github.com/xing/hops/commit/84d5f8032a3d7679d9d7c53e55f8e9d28fc193c8))
* return result from detectDuplicatePackages ([6564728](https://github.com/xing/hops/commit/656472896fc1b8af9a53e0362d8e1adcffa902b8))
* rewrite runtime code to ESM to facilitate tree shaking ([3352add](https://github.com/xing/hops/commit/3352adda0476c199275d2162a7c51955ab0990f2))


### Reverts

* Revert "chore: add automatic nightly release workflow" ([015c320](https://github.com/xing/hops/commit/015c320871859f9ea6b2371660e27894666f80b2))
* Revert "chore: do not persist credentials during checkout" ([d886675](https://github.com/xing/hops/commit/d88667595177c1a0e086731f55247e33a8cb4602))
* Revert "chore: persist credentials during checkout" ([d271bf4](https://github.com/xing/hops/commit/d271bf457152e86df4536f8d4460b824321ed00f))
* Revert "chore: make git config for user global" ([dd27272](https://github.com/xing/hops/commit/dd27272cbc5613ddea7044950c71f8165ffc2f9c))
* Revert "chore: make git config of user local" ([91ed5ee](https://github.com/xing/hops/commit/91ed5ee69eeda6ed495657dd406d3dacf8e09811))
* Revert "chore: use PAT to do the git checkout" ([4e0344a](https://github.com/xing/hops/commit/4e0344aef286bb1e453816c68150f83117b8d4a3))


### BREAKING CHANGES

* Hops no longer has peer dependencies to apollo v2

In detail, this means, that even though you still can use apollo@2,
your package manager will no longer warn when you're missing a
dependency.

Please see the readme of Hops v13 for information on which dependencies
you need with apollo@2.
* Some parts of Hops are rewritten to ES-Modules
This could potentially be a breaking change for some consumers when
using deep-imports.
* **info:** hops-info does not handle warnings returned from the `diagnose`-hook anymore.
* Hops now requires strictly de-duplicated packages

Hops will abort the build immediately when it detects a duplicated Hops
package. This situation arises when the versions of all the installed
Hops packages aren't aligned exactly.

To resolve the situation and thus get the build going again, the
versions have to be aligned.

In case of an emergency you can unblock the build without resolving the
underlying issue by passing `HOPS_IGNORE_ERRORS=hops-duplicates` into
the `hops start`-/`hops build`-command. This might still lead to errors
though, because misaligned Hops packages are common cause of bugs.
* the config option `enableLegacyMixinSortOrder` has been removed.
* static rendering of Hops apps has been removed (`hops build --static`)





# [14.0.0-nightly.8](https://github.com/xing/hops/compare/v14.0.0-nightly.7...v14.0.0-nightly.8) (2021-03-09)


### Bug Fixes

* **info:** remove deprecated handling of warning messages ([4502420](https://github.com/xing/hops/commit/4502420014e44532b2dd580cac94c16beecd6a77))
* remove mixin-order escape hatch ([22f921f](https://github.com/xing/hops/commit/22f921f86768b8b2a71053b877073e506843a16a))
* remove static rendering ([ed90792](https://github.com/xing/hops/commit/ed90792176298284d1f19fef4c09571edfaa07e2))
* require strictly de-duplicated Hops packages ([dd3e30a](https://github.com/xing/hops/commit/dd3e30af9f8746153ec8dcf4f102302811b2c604))
* update dependency puppeteer to v7 ([187d9a5](https://github.com/xing/hops/commit/187d9a5fa6e966225936e1a3ecefc62a5c09414b))
* update dependency puppeteer to v8 ([8ab7206](https://github.com/xing/hops/commit/8ab72065ebd7ae3de59daee888c3250f094b677f))


### Features

* introduce hops-debug as a node/browser wrapper for debug ([84d5f80](https://github.com/xing/hops/commit/84d5f8032a3d7679d9d7c53e55f8e9d28fc193c8))
* return result from detectDuplicatePackages ([6564728](https://github.com/xing/hops/commit/656472896fc1b8af9a53e0362d8e1adcffa902b8))


### Reverts

* Revert "chore: add automatic nightly release workflow" ([015c320](https://github.com/xing/hops/commit/015c320871859f9ea6b2371660e27894666f80b2))
* Revert "chore: do not persist credentials during checkout" ([d886675](https://github.com/xing/hops/commit/d88667595177c1a0e086731f55247e33a8cb4602))
* Revert "chore: persist credentials during checkout" ([d271bf4](https://github.com/xing/hops/commit/d271bf457152e86df4536f8d4460b824321ed00f))
* Revert "chore: make git config for user global" ([dd27272](https://github.com/xing/hops/commit/dd27272cbc5613ddea7044950c71f8165ffc2f9c))
* Revert "chore: make git config of user local" ([91ed5ee](https://github.com/xing/hops/commit/91ed5ee69eeda6ed495657dd406d3dacf8e09811))
* Revert "chore: use PAT to do the git checkout" ([4e0344a](https://github.com/xing/hops/commit/4e0344aef286bb1e453816c68150f83117b8d4a3))


### BREAKING CHANGES

* **info:** hops-info does not handle warnings returned from the `diagnose`-hook anymore.
* Hops now requires strictly de-duplicated packages

Hops will abort the build immediately when it detects a duplicated Hops
package. This situation arises when the versions of all the installed
Hops packages aren't aligned exactly.

To resolve the situation and thus get the build going again, the
versions have to be aligned.

In case of an emergency you can unblock the build without resolving the
underlying issue by passing `HOPS_IGNORE_ERRORS=hops-duplicates` into
the `hops start`-/`hops build`-command. This might still lead to errors
though, because misaligned Hops packages are common cause of bugs.
* the config option `enableLegacyMixinSortOrder` has been removed.
* static rendering of Hops apps has been removed (`hops build --static`)





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
