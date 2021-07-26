# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [15.0.0-nightly.11](https://github.com/xing/hops/compare/v15.0.0-nightly.10...v15.0.0-nightly.11) (2021-07-26)


### Bug Fixes

* **msw:** correct type definition for main export ([37686d8](https://github.com/xing/hops/commit/37686d8f89af38225c77f6a4e79a4fcb5cd52da8))
* **msw:** do not install msw if browser does not support service workers ([7c5c201](https://github.com/xing/hops/commit/7c5c201883012ed7cccba7fe408edb70cdde760b))
* update dependency msw to ^0.33.0 ([9b0765e](https://github.com/xing/hops/commit/9b0765e9417f3000c926f148851ebd25bde08c71))


### Features

* **msw:** allow to skip waiting for browser mocks ([e395c52](https://github.com/xing/hops/commit/e395c524e925e19d0fd32a77ed3610a96d1b060a))
* **msw:** print debug information from the mixins ([c3cf7ea](https://github.com/xing/hops/commit/c3cf7ead00e0d02012c8717529504405ca217a48))





# [15.0.0-nightly.10](https://github.com/xing/hops/compare/v15.0.0-nightly.9...v15.0.0-nightly.10) (2021-07-13)


### Bug Fixes

* **msw:** provide empty hops-msw/handlers file to fix webpack errors ([429ea12](https://github.com/xing/hops/commit/429ea122fa86f03af98b90a74df4362afdc16ebe))





# [15.0.0-nightly.9](https://github.com/xing/hops/compare/v15.0.0-nightly.8...v15.0.0-nightly.9) (2021-07-12)


### Bug Fixes

* update dependency msw to ^0.31.0 ([79ed0dc](https://github.com/xing/hops/commit/79ed0dc851aa5f4e990f036c90ba48e1fe8d860e))


### Features

* **msw:** allow to specify a handlers file to use during development ([fa11617](https://github.com/xing/hops/commit/fa1161750eac2b1c569d653fff68a8ffc761e0bf))
* **msw:** only wait for browser mocks in integration tests ([b40d8ac](https://github.com/xing/hops/commit/b40d8ac8b475631ca722fd5b54dacdd2219bb4e9))





# [15.0.0-nightly.8](https://github.com/xing/hops/compare/v15.0.0-nightly.7...v15.0.0-nightly.8) (2021-07-06)


### Bug Fixes

* **msw:** delay rendering until msw mocks have been registered ([dffafa4](https://github.com/xing/hops/commit/dffafa43f0e6647912843ba14061617128f9893a))





# [15.0.0-nightly.7](https://github.com/xing/hops/compare/v15.0.0-nightly.6...v15.0.0-nightly.7) (2021-07-05)


### Bug Fixes

* **msw:** rename /_mocks/ endpoint to /_msw/ to avoid clashes ([93a446d](https://github.com/xing/hops/commit/93a446df76d6933c945aed79974ed052f2bd0a8e))
* update dependency msw to ^0.30.0 ([1e8e8b7](https://github.com/xing/hops/commit/1e8e8b74d3dc21f3ec57660284b92ff9c82fc41c))





# [15.0.0-nightly.6](https://github.com/xing/hops/compare/v15.0.0-nightly.5...v15.0.0-nightly.6) (2021-06-30)


### Features

* **msw:** introduce new hops-msw package ([8c29169](https://github.com/xing/hops/commit/8c29169b781719e44e5fbec201083fd52c20e991))
