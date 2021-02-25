# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [13.3.4](https://github.com/xing/hops/compare/v13.3.3...v13.3.4) (2021-02-25)


### Reverts

* Revert "chore: release v13.3.4" ([1665286](https://github.com/xing/hops/commit/1665286e4efb4316ce33bcc789b8ae6839ded3f9))
* Revert "chore: release v13.3.4" ([328c4a4](https://github.com/xing/hops/commit/328c4a494de318b7a893ac99165bf1fb1304b729))





## [13.3.3](https://github.com/xing/hops/compare/v13.3.2...v13.3.3) (2021-02-23)

**Note:** Version bump only for package hops-bootstrap





## [13.3.2](https://github.com/xing/hops/compare/v13.3.1...v13.3.2) (2021-02-03)

**Note:** Version bump only for package hops-bootstrap





## [13.3.1](https://github.com/xing/hops/compare/v13.3.0...v13.3.1) (2021-01-13)

**Note:** Version bump only for package hops-bootstrap





# [13.3.0](https://github.com/xing/hops/compare/v13.2.2...v13.3.0) (2021-01-11)


### Bug Fixes

* **bootstrap:** add Ajv formats ([fb51f62](https://github.com/xing/hops/commit/fb51f6274bede052e9db4a10c2155f4240a44af4))
* **bootstrap:** limit pattern properties, too ([f6885e1](https://github.com/xing/hops/commit/f6885e196df98492d9caae4bab5382432e34401e))
* **bootstrap:** opt out of Ajv's strict mode ([9c96e2c](https://github.com/xing/hops/commit/9c96e2c8a80afe1b2a9e719e702e4fed95db334b))
* **bootstrap:** use default import of Ajv ([df98412](https://github.com/xing/hops/commit/df98412d8b966375b278aff8d3dee62ece4e9841))
* update dependency ajv to v7 ([71b95bb](https://github.com/xing/hops/commit/71b95bb99960685e993b56889bbaf6787eb2ee4f))
* update dependency supports-color to v8 ([14f8179](https://github.com/xing/hops/commit/14f8179ad1982a4c1bd359e56acd194324f54c3e))





## [13.2.2](https://github.com/xing/hops/compare/v13.2.1...v13.2.2) (2020-12-07)


### Bug Fixes

* **bootstrap:** do not try to resolve ESM packages for presets ([1815f58](https://github.com/xing/hops/commit/1815f58f99fbd06ef77463caa4bd08f4e10eeea8))





## [13.2.1](https://github.com/xing/hops/compare/v13.2.0...v13.2.1) (2020-11-20)


### Bug Fixes

* upgrade is-plain-obj to v3 ([fb864d7](https://github.com/xing/hops/commit/fb864d7ad007d135d033d46cc3ded7e78fd61f90))





# [13.2.0](https://github.com/xing/hops/compare/v13.1.0...v13.2.0) (2020-11-06)


### Features

* add support for Node v15 ([3ea8714](https://github.com/xing/hops/commit/3ea8714702960d0408cb6eae4bf336cb637eea9d))





# [13.1.0](https://github.com/xing/hops/compare/v13.0.0...v13.1.0) (2020-10-09)


### Bug Fixes

* **bootstrap:** ignore exports fields when resolving presets ([b9accbe](https://github.com/xing/hops/commit/b9accbefe824d27830926c7965d19f8e7f488449))





# [13.0.0](https://github.com/xing/hops/compare/v13.0.0-rc.0...v13.0.0) (2020-09-28)


### Bug Fixes

* update dependency enhanced-resolve to v5 ([4842d30](https://github.com/xing/hops/commit/4842d307931699b3d5aef656a8b0900e038be768))





# [13.0.0-rc.0](https://github.com/xing/hops/compare/v13.0.0-alpha.2...v13.0.0-rc.0) (2020-09-07)


### Bug Fixes

* update dependency cosmiconfig to v7 ([44e0f84](https://github.com/xing/hops/commit/44e0f84dfb464e2e9df776f4636185fbaf126c04))
* update dependency find-up to v5 ([ce11652](https://github.com/xing/hops/commit/ce1165227b2a0782f6e945e0a1c8de8adb1a4ea9))





# [13.0.0-alpha.2](https://github.com/xing/hops/compare/v13.0.0-alpha.1...v13.0.0-alpha.2) (2020-08-17)

**Note:** Version bump only for package hops-bootstrap





# [13.0.0-alpha.1](https://github.com/xing/hops/compare/v13.0.0-alpha.0...v13.0.0-alpha.1) (2020-07-31)

**Note:** Version bump only for package hops-bootstrap





# [13.0.0-alpha.0](https://github.com/xing/hops/compare/v12.0.0-rc99...v13.0.0-alpha.0) (2020-07-23)


### Bug Fixes

* remove support for Node versions 10 & 13 ([00e7f2f](https://github.com/xing/hops/commit/00e7f2fb2ec92b859805b65bfeee697a78bf8147))


### BREAKING CHANGES

* Hops does not support the outdated Node versions 10
and 13 anymore. In case you're using one of these, please update your
Node version to the current version 14 or the LTS version 12.
