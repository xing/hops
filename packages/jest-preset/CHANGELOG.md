# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [14.3.2](https://github.com/xing/hops/compare/v14.3.1...v14.3.2) (2021-08-02)

**Note:** Version bump only for package jest-preset-hops





## [14.3.1](https://github.com/xing/hops/compare/v14.3.0...v14.3.1) (2021-07-28)

**Note:** Version bump only for package jest-preset-hops





# [14.3.0](https://github.com/xing/hops/compare/v14.2.1...v14.3.0) (2021-07-27)


### Features

* **jest-preset:** automatically set-up graphql and msw ([860a8fe](https://github.com/xing/hops/commit/860a8fe9ba558f6195842edb73d1724fd50419b4))
* **msw:** allow to specify a handlers file to use during development ([f83409a](https://github.com/xing/hops/commit/f83409aca4303c5024eddfa52f4b8359087bbd87))





## [14.2.1](https://github.com/xing/hops/compare/v14.2.0...v14.2.1) (2021-06-22)

**Note:** Version bump only for package jest-preset-hops





# [14.2.0](https://github.com/xing/hops/compare/v14.1.0...v14.2.0) (2021-06-14)


### Bug Fixes

* **jest-preset:** use correct import of babel-jest package ([20f6ed3](https://github.com/xing/hops/commit/20f6ed3f2b87e752f56eb02404c26fdea8d78dd4))
* update dependency import-from to v4 ([07ffb06](https://github.com/xing/hops/commit/07ffb06b6c132b247d0ce6ca2807d28677827bff))
* **jest-preset:** set Jest test environment explicitly ([1847985](https://github.com/xing/hops/commit/1847985e41d152788db447aad878a1b56246906d))


### Features

* **jest-preset:** enable ESM support for Typescript ([4a8cf18](https://github.com/xing/hops/commit/4a8cf183f9eab34f72b4daf568ed3108b20ba238))
* update Jest to version 27 ([31fd69b](https://github.com/xing/hops/commit/31fd69b23fd5f1dd0e0cfce46d7a8db173eb9361)), closes [#1838](https://github.com/xing/hops/issues/1838) [#1839](https://github.com/xing/hops/issues/1839) [#1761](https://github.com/xing/hops/issues/1761)





# [14.1.0](https://github.com/xing/hops/compare/v14.0.1...v14.1.0) (2021-04-20)

**Note:** Version bump only for package jest-preset-hops





## [14.0.1](https://github.com/xing/hops/compare/v14.0.0...v14.0.1) (2021-03-29)

**Note:** Version bump only for package jest-preset-hops





# [14.0.0](https://github.com/xing/hops/compare/v14.0.0-nightly.11...v14.0.0) (2021-03-29)

**Note:** Version bump only for package jest-preset-hops





# [14.0.0-nightly.11](https://github.com/xing/hops/compare/v14.0.0-nightly.10...v14.0.0-nightly.11) (2021-03-24)


### Features

* **jest-preset:** introduce experimental esbuild transpilation ([6a2845e](https://github.com/xing/hops/commit/6a2845e6d2daf096edc1d61c59d65cdb68fc0391))





# [14.0.0-nightly.10](https://github.com/xing/hops/compare/v14.0.0-nightly.9...v14.0.0-nightly.10) (2021-03-18)

**Note:** Version bump only for package jest-preset-hops





# [14.0.0-nightly.9](https://github.com/xing/hops/compare/v14.0.0-nightly.7...v14.0.0-nightly.9) (2021-03-15)


### Features

* rewrite runtime code to ESM to facilitate tree shaking ([3352add](https://github.com/xing/hops/commit/3352adda0476c199275d2162a7c51955ab0990f2))


### BREAKING CHANGES

* Some parts of Hops are rewritten to ES-Modules
This could potentially be a breaking change for some consumers when
using deep-imports.





# [14.0.0-nightly.8](https://github.com/xing/hops/compare/v14.0.0-nightly.7...v14.0.0-nightly.8) (2021-03-09)

**Note:** Version bump only for package jest-preset-hops





# [14.0.0-nightly.7](https://github.com/xing/hops/compare/v14.0.0-nightly.6...v14.0.0-nightly.7) (2021-02-09)

**Note:** Version bump only for package jest-preset-hops





# [14.0.0-nightly.6](https://github.com/xing/hops/compare/v14.0.0-nightly.5...v14.0.0-nightly.6) (2021-01-13)

**Note:** Version bump only for package jest-preset-hops





# [14.0.0-nightly.5](https://github.com/xing/hops/compare/v14.0.0-nightly.4...v14.0.0-nightly.5) (2021-01-11)

**Note:** Version bump only for package jest-preset-hops





# [14.0.0-nightly.4](https://github.com/xing/hops/compare/v14.0.0-nightly.3...v14.0.0-nightly.4) (2020-12-07)

**Note:** Version bump only for package jest-preset-hops





# [14.0.0-nightly.3](https://github.com/xing/hops/compare/v14.0.0-nightly.2...v14.0.0-nightly.3) (2020-11-20)


### Bug Fixes

* upgrade react monorepo to v17 ([ccd74f0](https://github.com/xing/hops/commit/ccd74f01923b8b902c64deaa8990b67cfe781bed))





# [14.0.0-nightly.2](https://github.com/xing/hops/compare/v14.0.0-nightly.1...v14.0.0-nightly.2) (2020-11-13)


### Features

* **jest-preset:** import jest-config from jest package ([903d07c](https://github.com/xing/hops/commit/903d07c6cb80689ac342a7e55aa4f58f9b107247))
* **jest-preset:** make babel-jest & ts-jest peer-dependencies ([af4c932](https://github.com/xing/hops/commit/af4c9321ad85b5181866ccd6358e5b1ff50e8b3e))


### BREAKING CHANGES

* **jest-preset:** babel-jest & ts-jest need to be installed additionally now in order
to set up Jest for Hops.





# [14.0.0-nightly.1](https://github.com/xing/hops/compare/v13.0.0...v14.0.0-nightly.1) (2020-11-06)


### Features

* add support for Node v15 ([75d22c8](https://github.com/xing/hops/commit/75d22c88db5beab3fa4f3edf29ccd5c5fb29fd2f))
