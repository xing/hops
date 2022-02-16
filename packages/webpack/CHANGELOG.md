# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [15.1.0](https://github.com/xing/hops/compare/v15.0.2...v15.1.0) (2022-02-16)


### Bug Fixes

* reference webpack chunks via chunk name ([3521a78](https://github.com/xing/hops/commit/3521a7868976c855f036ab7b4c6a0e5fd556812d)), closes [#1976](https://github.com/xing/hops/issues/1976)





## [15.0.2](https://github.com/xing/hops/compare/v15.0.1...v15.0.2) (2022-01-12)


### Bug Fixes

* **webpack:** externalize server source-map to prevent RangeError ([1d43d68](https://github.com/xing/hops/commit/1d43d68bac5b028f85a76682936c5d13fb2aa1f4))
* **webpack:** print file name and location in webpack warnings ([94eddc8](https://github.com/xing/hops/commit/94eddc8d22b73f27515b04f3a66b6f29bff9fc6c))





## [15.0.1](https://github.com/xing/hops/compare/v15.0.0...v15.0.1) (2021-10-11)

**Note:** Version bump only for package hops-webpack





# [15.0.0](https://github.com/xing/hops/compare/v15.0.0-nightly.14...v15.0.0) (2021-09-30)


### Bug Fixes

* create same hashes on server and client ([63d90db](https://github.com/xing/hops/commit/63d90dbde4bfd066a19ca3f67f8a9f3b27d884c6))





# [15.0.0-nightly.14](https://github.com/xing/hops/compare/v15.0.0-nightly.13...v15.0.0-nightly.14) (2021-09-27)

**Note:** Version bump only for package hops-webpack





# [15.0.0-nightly.13](https://github.com/xing/hops/compare/v15.0.0-nightly.12...v15.0.0-nightly.13) (2021-09-27)

**Note:** Version bump only for package hops-webpack





# [15.0.0-nightly.12](https://github.com/xing/hops/compare/v15.0.0-nightly.11...v15.0.0-nightly.12) (2021-09-27)


### Bug Fixes

* exit Hops on unrecovrable webpack errors ([2030586](https://github.com/xing/hops/commit/203058633427f38a9902856b8295651207323f30))
* remove version pinning of webpack 5 ([216ad8d](https://github.com/xing/hops/commit/216ad8d56a8b2209369b8fd1fe145aacfd4d965f))
* update dependency webpack to v5.46.0 ([a67cd2c](https://github.com/xing/hops/commit/a67cd2c606f872ae4f80381bba5d1fe5cf2536cd))
* update dependency webpack to v5.51.1 ([bee9400](https://github.com/xing/hops/commit/bee94004cdc29b5073b8e79f2dc1250f5788c3f7))
* update dependency webpack-sources to v3 ([8dca82a](https://github.com/xing/hops/commit/8dca82a850b8c45e4556c7c764e8184d87ce7652))


### chore

* remove node 12 from engines field ([d3d3624](https://github.com/xing/hops/commit/d3d3624cec813bfe4d9ab4abe86e051bd7f9e61e))
* remove node 15 from engines ([f3c08b2](https://github.com/xing/hops/commit/f3c08b28feb6d64ff57f6c34b1f67a023146243d))


### BREAKING CHANGES

* drops Node 15 support
* drops Node 12 support





# [15.0.0-nightly.11](https://github.com/xing/hops/compare/v15.0.0-nightly.10...v15.0.0-nightly.11) (2021-07-26)

**Note:** Version bump only for package hops-webpack





# [15.0.0-nightly.10](https://github.com/xing/hops/compare/v15.0.0-nightly.9...v15.0.0-nightly.10) (2021-07-13)

**Note:** Version bump only for package hops-webpack





# [15.0.0-nightly.9](https://github.com/xing/hops/compare/v15.0.0-nightly.8...v15.0.0-nightly.9) (2021-07-12)

**Note:** Version bump only for package hops-webpack





# [15.0.0-nightly.8](https://github.com/xing/hops/compare/v15.0.0-nightly.7...v15.0.0-nightly.8) (2021-07-06)

**Note:** Version bump only for package hops-webpack





# [15.0.0-nightly.7](https://github.com/xing/hops/compare/v15.0.0-nightly.6...v15.0.0-nightly.7) (2021-07-05)

**Note:** Version bump only for package hops-webpack





# [15.0.0-nightly.6](https://github.com/xing/hops/compare/v15.0.0-nightly.5...v15.0.0-nightly.6) (2021-06-30)

**Note:** Version bump only for package hops-webpack





# [15.0.0-nightly.5](https://github.com/xing/hops/compare/v15.0.0-nightly.4...v15.0.0-nightly.5) (2021-06-21)


### Bug Fixes

* **webpack:** target ES5 for browser builds ([ca3a68e](https://github.com/xing/hops/commit/ca3a68ed46291113e26d51c848efcbaea9830770))


### Features

* **webpack:** enable filesystem-based caching ([dccb7e0](https://github.com/xing/hops/commit/dccb7e0384f5140265f6cb68279ae73bbcb49da8))





# [15.0.0-nightly.4](https://github.com/xing/hops/compare/v15.0.0-nightly.3...v15.0.0-nightly.4) (2021-06-18)


### Bug Fixes

* **webpack:** bring back named chunks in dev-mode ([19a2f81](https://github.com/xing/hops/commit/19a2f810b5e49f961b070c206ce8fe4c6b0c2f29))
* **webpack:** ensure to collect all entry modules ([8b49a5a](https://github.com/xing/hops/commit/8b49a5a20be7918d9be7a519ef1d5338c899f05b))





# [15.0.0-nightly.3](https://github.com/xing/hops/compare/v15.0.0-nightly.2...v15.0.0-nightly.3) (2021-06-17)


### Bug Fixes

* **webpack:** enable error logging of underlying tooling ([938d12c](https://github.com/xing/hops/commit/938d12cd67061d26239c1d21a49c470c8f54f34e))


### Features

* update webpack to version 5 ([837420a](https://github.com/xing/hops/commit/837420a27315be1768e1f922aa5f5b3589d8d549))





# [15.0.0-nightly.2](https://github.com/xing/hops/compare/v15.0.0-nightly.1...v15.0.0-nightly.2) (2021-06-08)


### Bug Fixes

* update dependency webpack-dev-middleware to v5 ([ba24511](https://github.com/xing/hops/commit/ba245117444edba7aa3b7edf7ff806370668534e))
* **webpack:** add missing CLI-flags to develop command ([db0964c](https://github.com/xing/hops/commit/db0964c8011396f36d0637dd4afcef8d2df32000))
* update webpack core ([64c748f](https://github.com/xing/hops/commit/64c748fe3907fa6a440a9b41d1264cb956ac05c2))





# [15.0.0-nightly.1](https://github.com/xing/hops/compare/v15.0.0-nightly.0...v15.0.0-nightly.1) (2021-04-07)

**Note:** Version bump only for package hops-webpack





# [15.0.0-nightly.0](https://github.com/xing/hops/compare/v14.0.0...v15.0.0-nightly.0) (2021-03-29)

**Note:** Version bump only for package hops-webpack
