# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [14.5.1](https://github.com/xing/hops/compare/v14.5.0...v14.5.1) (2022-01-12)

**Note:** Version bump only for package hops-info





# [14.5.0](https://github.com/xing/hops/compare/v14.4.1...v14.5.0) (2021-09-20)

**Note:** Version bump only for package hops-info





## [14.4.1](https://github.com/xing/hops/compare/v14.4.0...v14.4.1) (2021-09-07)


### Bug Fixes

* **info:** test if logLocation is writable ([9fcc2d0](https://github.com/xing/hops/commit/9fcc2d0d495bd5c2cde03761e8d3e05f3fa04c3d))





# [14.4.0](https://github.com/xing/hops/compare/v14.3.2...v14.4.0) (2021-09-02)


### Features

* **info:** optionally log into hops-log.txt ([1d9a875](https://github.com/xing/hops/commit/1d9a875737ae25c19155c0c9f9fadae446155577))





## [14.3.2](https://github.com/xing/hops/compare/v14.3.1...v14.3.2) (2021-08-02)

**Note:** Version bump only for package hops-info





## [14.3.1](https://github.com/xing/hops/compare/v14.3.0...v14.3.1) (2021-07-28)

**Note:** Version bump only for package hops-info





# [14.3.0](https://github.com/xing/hops/compare/v14.2.1...v14.3.0) (2021-07-27)

**Note:** Version bump only for package hops-info





## [14.2.1](https://github.com/xing/hops/compare/v14.2.0...v14.2.1) (2021-06-22)

**Note:** Version bump only for package hops-info





# [14.2.0](https://github.com/xing/hops/compare/v14.1.0...v14.2.0) (2021-06-14)


### Bug Fixes

* update dependency web-vitals to v2 ([8bc5a64](https://github.com/xing/hops/commit/8bc5a64a2617d1e50a973bf8fbb33baf8d58dcd5))





# [14.1.0](https://github.com/xing/hops/compare/v14.0.1...v14.1.0) (2021-04-20)


### Features

* add web vitals support ([68b85cf](https://github.com/xing/hops/commit/68b85cf8637f1cc2e67ebe284e6b4d1c54f9edda))





## [14.0.1](https://github.com/xing/hops/compare/v14.0.0...v14.0.1) (2021-03-29)

**Note:** Version bump only for package hops-info





# [14.0.0](https://github.com/xing/hops/compare/v14.0.0-nightly.11...v14.0.0) (2021-03-29)

**Note:** Version bump only for package hops-info





# [14.0.0-nightly.11](https://github.com/xing/hops/compare/v14.0.0-nightly.10...v14.0.0-nightly.11) (2021-03-24)

**Note:** Version bump only for package hops-info





# [14.0.0-nightly.10](https://github.com/xing/hops/compare/v14.0.0-nightly.9...v14.0.0-nightly.10) (2021-03-18)

**Note:** Version bump only for package hops-info





# [14.0.0-nightly.9](https://github.com/xing/hops/compare/v14.0.0-nightly.7...v14.0.0-nightly.9) (2021-03-15)


### Bug Fixes

* **info:** remove deprecated handling of warning messages ([4502420](https://github.com/xing/hops/commit/4502420014e44532b2dd580cac94c16beecd6a77))
* remove static rendering ([ed90792](https://github.com/xing/hops/commit/ed90792176298284d1f19fef4c09571edfaa07e2))
* require strictly de-duplicated Hops packages ([dd3e30a](https://github.com/xing/hops/commit/dd3e30af9f8746153ec8dcf4f102302811b2c604))


### Features

* return result from detectDuplicatePackages ([6564728](https://github.com/xing/hops/commit/656472896fc1b8af9a53e0362d8e1adcffa902b8))
* rewrite runtime code to ESM to facilitate tree shaking ([3352add](https://github.com/xing/hops/commit/3352adda0476c199275d2162a7c51955ab0990f2))


### BREAKING CHANGES

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
* static rendering of Hops apps has been removed (`hops build --static`)





# [14.0.0-nightly.8](https://github.com/xing/hops/compare/v14.0.0-nightly.7...v14.0.0-nightly.8) (2021-03-09)


### Bug Fixes

* **info:** remove deprecated handling of warning messages ([4502420](https://github.com/xing/hops/commit/4502420014e44532b2dd580cac94c16beecd6a77))
* remove static rendering ([ed90792](https://github.com/xing/hops/commit/ed90792176298284d1f19fef4c09571edfaa07e2))
* require strictly de-duplicated Hops packages ([dd3e30a](https://github.com/xing/hops/commit/dd3e30af9f8746153ec8dcf4f102302811b2c604))


### Features

* return result from detectDuplicatePackages ([6564728](https://github.com/xing/hops/commit/656472896fc1b8af9a53e0362d8e1adcffa902b8))


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
* static rendering of Hops apps has been removed (`hops build --static`)





# [14.0.0-nightly.7](https://github.com/xing/hops/compare/v14.0.0-nightly.6...v14.0.0-nightly.7) (2021-02-09)

**Note:** Version bump only for package hops-info





# [14.0.0-nightly.6](https://github.com/xing/hops/compare/v14.0.0-nightly.5...v14.0.0-nightly.6) (2021-01-13)

**Note:** Version bump only for package hops-info





# [14.0.0-nightly.5](https://github.com/xing/hops/compare/v14.0.0-nightly.4...v14.0.0-nightly.5) (2021-01-11)

**Note:** Version bump only for package hops-info





# [14.0.0-nightly.4](https://github.com/xing/hops/compare/v14.0.0-nightly.3...v14.0.0-nightly.4) (2020-12-07)

**Note:** Version bump only for package hops-info





# [14.0.0-nightly.3](https://github.com/xing/hops/compare/v14.0.0-nightly.2...v14.0.0-nightly.3) (2020-11-20)

**Note:** Version bump only for package hops-info





# [14.0.0-nightly.2](https://github.com/xing/hops/compare/v14.0.0-nightly.1...v14.0.0-nightly.2) (2020-11-13)

**Note:** Version bump only for package hops-info





# [14.0.0-nightly.1](https://github.com/xing/hops/compare/v13.0.0...v14.0.0-nightly.1) (2020-11-06)


### Features

* **info:** introduce helpers for emitting warnings & errors ([84095e8](https://github.com/xing/hops/commit/84095e8d955ac1093bf12cdc0e8dad60fe2d86d1))
* **info:** make logger available in server runtime ([f550cf1](https://github.com/xing/hops/commit/f550cf1d4fbdd1ff28172edba87be616f9905125))
* **info:** use existing logger if available ([de7d62e](https://github.com/xing/hops/commit/de7d62e955953b966d7f66d5c4ca819e4dc591d7))
* add support for Node v15 ([75d22c8](https://github.com/xing/hops/commit/75d22c88db5beab3fa4f3edf29ccd5c5fb29fd2f))
