# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [13.3.3](https://github.com/xing/hops/compare/v13.3.2...v13.3.3) (2021-02-23)

**Note:** Version bump only for package hops-webpack





## [13.3.2](https://github.com/xing/hops/compare/v13.3.1...v13.3.2) (2021-02-03)

**Note:** Version bump only for package hops-webpack





## [13.3.1](https://github.com/xing/hops/compare/v13.3.0...v13.3.1) (2021-01-13)

**Note:** Version bump only for package hops-webpack





# [13.3.0](https://github.com/xing/hops/compare/v13.2.2...v13.3.0) (2021-01-11)


### Bug Fixes

* **webpack:** ensure forked compiler exits when done ([f20f0f0](https://github.com/xing/hops/commit/f20f0f0b0accade4e5973accbd3afc1bf33221fd))
* update dependency supports-color to v8 ([14f8179](https://github.com/xing/hops/commit/14f8179ad1982a4c1bd359e56acd194324f54c3e))





## [13.2.2](https://github.com/xing/hops/compare/v13.2.1...v13.2.2) (2020-12-07)


### Bug Fixes

* **webpack:** always transpile optional chaining and nullish coalescing ([1cdb38a](https://github.com/xing/hops/commit/1cdb38ad209404e038fcd17cb495f4008c9e8baa))
* **webpack:** consider the current node version for babel cache ([de91f45](https://github.com/xing/hops/commit/de91f454bae3b49f159ef053a7fcfaa35f200418))





## [13.2.1](https://github.com/xing/hops/compare/v13.2.0...v13.2.1) (2020-11-20)


### Bug Fixes

* **webpack:** compile browser bundle for latest chrome only ([d5d901a](https://github.com/xing/hops/commit/d5d901ab00e0cf92d5660a95ee65fb9cf44aa77d))
* **webpack:** fix memory leak in StatsWriterPlugin ([276f049](https://github.com/xing/hops/commit/276f0499315a9dc786ee7c50ae1f52d62ad49092))
* upgrade is-plain-obj to v3 ([fb864d7](https://github.com/xing/hops/commit/fb864d7ad007d135d033d46cc3ded7e78fd61f90))
* upgrade webpack-dev-middleware to v4 ([3ff152b](https://github.com/xing/hops/commit/3ff152b8ee91199017fae28059fa82d8f87b58bd))





# [13.2.0](https://github.com/xing/hops/compare/v13.1.0...v13.2.0) (2020-11-06)


### Features

* add support for Node v15 ([3ea8714](https://github.com/xing/hops/commit/3ea8714702960d0408cb6eae4bf336cb637eea9d))





# [13.1.0](https://github.com/xing/hops/compare/v13.0.0...v13.1.0) (2020-10-09)


### Bug Fixes

* **webpack:** accept object argument in BuildError ([33e378f](https://github.com/xing/hops/commit/33e378f7e1b4a65b816bafa8da0fd88caf563fdc))





# [13.0.0](https://github.com/xing/hops/compare/v13.0.0-rc.0...v13.0.0) (2020-09-28)


### Bug Fixes

* **webpack:** replace serialize-error with a custom implementation ([65931fc](https://github.com/xing/hops/commit/65931fcb319198b61f20baf07bfbd8d7d3d750dd))
* update dependency enhanced-resolve to v5 ([4842d30](https://github.com/xing/hops/commit/4842d307931699b3d5aef656a8b0900e038be768))
* update dependency webpack-sources to v2 ([12134a4](https://github.com/xing/hops/commit/12134a40aec57c8b2cbdedbbcfd15bd3883e224e))
* **webpack:** use webpack HMR for node build to fix memory leak ([2826fdf](https://github.com/xing/hops/commit/2826fdfa64084507fdd07be7a34cee66763ee73a))





# [13.0.0-rc.0](https://github.com/xing/hops/compare/v13.0.0-alpha.2...v13.0.0-rc.0) (2020-09-07)


### Bug Fixes

* update dependency find-up to v5 ([ce11652](https://github.com/xing/hops/commit/ce1165227b2a0782f6e945e0a1c8de8adb1a4ea9))
* update dependency terser-webpack-plugin to v4 ([b0c5132](https://github.com/xing/hops/commit/b0c51320984d42bce065718cf8626080a75928a4))





# [13.0.0-alpha.2](https://github.com/xing/hops/compare/v13.0.0-alpha.1...v13.0.0-alpha.2) (2020-08-17)

**Note:** Version bump only for package hops-webpack





# [13.0.0-alpha.1](https://github.com/xing/hops/compare/v13.0.0-alpha.0...v13.0.0-alpha.1) (2020-07-31)


### Bug Fixes

* **webpack:** reset stats promise on watch run events ([0cd654d](https://github.com/xing/hops/commit/0cd654d33c56f068fdf5412e6e45901312948b0d))





# [13.0.0-alpha.0](https://github.com/xing/hops/compare/v12.0.0-rc99...v13.0.0-alpha.0) (2020-07-23)


### Bug Fixes

* remove support for Node versions 10 & 13 ([00e7f2f](https://github.com/xing/hops/commit/00e7f2fb2ec92b859805b65bfeee697a78bf8147))


### BREAKING CHANGES

* Hops does not support the outdated Node versions 10
and 13 anymore. In case you're using one of these, please update your
Node version to the current version 14 or the LTS version 12.
