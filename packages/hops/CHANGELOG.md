# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [12.0.0-beta.1](https://github.com/xing/hops/compare/v12.0.0-beta.0...v12.0.0-beta.1) (2019-12-18)

**Note:** Version bump only for package hops





# [12.0.0-beta.0](https://github.com/xing/hops/compare/v11.9.1...v12.0.0-beta.0) (2019-12-12)


### Bug Fixes

* switch to react-helmet-async ([47cbd04](https://github.com/xing/hops/commit/47cbd0436cd43a67ecaf2ccc0994c21ac948c7c1))
* upgrade untool ([c9a951d](https://github.com/xing/hops/commit/c9a951d0d6d51994af8a1214b369e1d71b20db1d))
* upgrade untool to 2.0.0-beta.0 ([d6910f2](https://github.com/xing/hops/commit/d6910f2e097f77160c7176eb9c1f87e0636f55e0))
* upgrade untool to 2.0.0-beta.1 ([2895a5c](https://github.com/xing/hops/commit/2895a5cd7617116be4476ffe87174bd2d15a0cdc))


### chore

* **hops:** bump minimum required node version ([20c3e2e](https://github.com/xing/hops/commit/20c3e2e1fdf0cfd3c238bb96ad4f9b0d8eaf122a))
* **hops:** bump minimum required node versions ([cd8da87](https://github.com/xing/hops/commit/cd8da87026789a7afda34ca6bd32cbc353870525))


### Features

* **hops:** add typings for config & server-data context hooks ([2c831f7](https://github.com/xing/hops/commit/2c831f7479e6f637bd3c9526fb982865c7f320d8))
* **hops:** re-export config & server-data hooks from hops-react ([9bd6c24](https://github.com/xing/hops/commit/9bd6c24637422913666f466291f86991dc812df2))
* bump all packages to their latest available versions ([29c2963](https://github.com/xing/hops/commit/29c29633fae95e2813dae9b1b6c8140d33332c35))
* upgrade untool to 2.0.0-alpha.4 ([769ea81](https://github.com/xing/hops/commit/769ea81c279af6888a5c2bbf046e224b647aa38c))
* **hops:** improve type definitions for withServerData and withConfig ([6dc2053](https://github.com/xing/hops/commit/6dc2053941e7d252fc4b2c0aa11d6caab59dc9f5))
* **hops:** simplify typings ([40f72d9](https://github.com/xing/hops/commit/40f72d9ea09f1a66bae31b8b4b1a65a3fa43d23e))


### BREAKING CHANGES

* **hops:** Hops drops support for non-LTS versions of Node
* The following peer dependencies have increased versions
- `jest`: 24.9.0
- `react` & `react-dom`: 16.8.0
- `react-apollo`: 3.1.0
- `react-redux`: 7.1.0
- `react-router-dom`: 5.1.0
- `redux-thunk`: 2.3.0
- `styled-components: 4.4.0
- `typescript`: 3.6.0
* **hops:** Hops drops support for Node v8
* **hops:** `withConfig` and `withServerData` have a simpler type definition now. They only take one generic argument instead of three.

Co-Authored-By: Emanuel Kluge <emanuel.kluge@xing.com>





# [12.0.0-alpha.5](https://github.com/xing/hops/compare/v11.9.1...v12.0.0-alpha.5) (2019-11-27)


### Bug Fixes

* switch to react-helmet-async ([870aaa3](https://github.com/xing/hops/commit/870aaa3ff45c911aabbfe047ec4977d45d3aac4e))
* upgrade untool ([6ef31f3](https://github.com/xing/hops/commit/6ef31f366527ac335ac134447343118723d39109))


### chore

* **hops:** bump minimum required node version ([b3429a0](https://github.com/xing/hops/commit/b3429a07b9380afe8b1022204047c728f359b44f))


### Features

* bump all packages to their latest available versions ([a4710b1](https://github.com/xing/hops/commit/a4710b1bf7005efc3a3809b6ebc4f905f9c0e003))
* upgrade untool to 2.0.0-alpha.4 ([74adb91](https://github.com/xing/hops/commit/74adb91eb8bdced218857944bffa47e43f6674dd))
* **hops:** add typings for config & server-data context hooks ([4420446](https://github.com/xing/hops/commit/4420446464f294022dfe162c4e0845247b0ce1b6))
* **hops:** improve type definitions for withServerData and withConfig ([328e094](https://github.com/xing/hops/commit/328e0942bbfd30fbf85f434a2c3ac73cb096c62c))
* **hops:** re-export config & server-data hooks from hops-react ([93dd68a](https://github.com/xing/hops/commit/93dd68aa98c2192244c255a79c8d9bc0c9d64de1))
* **hops:** simplify typings ([41f1145](https://github.com/xing/hops/commit/41f1145aa777ae91237d1ea84a6e4820ac94351a))


### BREAKING CHANGES

* The following peer dependencies have increased versions
- `jest`: 24.9.0
- `react` & `react-dom`: 16.8.0
- `react-apollo`: 3.1.0
- `react-redux`: 7.1.0
- `react-router-dom`: 5.1.0
- `redux-thunk`: 2.3.0
- `styled-components: 4.4.0
- `typescript`: 3.6.0
* **hops:** Hops drops support for Node v8
* **hops:** `withConfig` and `withServerData` have a simpler type definition now. They only take one generic argument instead of three.

Co-Authored-By: Emanuel Kluge <emanuel.kluge@xing.com>





# [12.0.0-alpha.4](https://github.com/xing/hops/compare/v12.0.0-alpha.3...v12.0.0-alpha.4) (2019-10-29)


### Features

* **hops:** add typings for config & server-data context hooks ([8677c9e](https://github.com/xing/hops/commit/8677c9e2df68bd1dd9ef7bef224000674ae24dff))
* **hops:** re-export config & server-data hooks from hops-react ([578407e](https://github.com/xing/hops/commit/578407e274cf07f6055cde944c0446daecf4b742))





# [12.0.0-alpha.3](https://github.com/xing/hops/compare/v11.9.1...v12.0.0-alpha.3) (2019-10-28)


### Bug Fixes

* switch to react-helmet-async ([f1c61d1](https://github.com/xing/hops/commit/f1c61d1c248db30532c1c1ecdafe266d8cc363ed))
* upgrade untool ([4034440](https://github.com/xing/hops/commit/4034440864806f3e40677fcde5a2f871729596cd))


### chore

* **hops:** bump minimum required node version ([cf74790](https://github.com/xing/hops/commit/cf74790a085d586a664abfe1f11f8d60416f19d6))


### Features

* **hops:** improve type definitions for withServerData and withConfig ([0ddbdce](https://github.com/xing/hops/commit/0ddbdce2fa0e13cd2bee90ea9f4ce5274263ea1b))
* **hops:** simplify typings ([038eb2b](https://github.com/xing/hops/commit/038eb2b1bd1d55c8ad155be4aa4c10aed87199e0))
* bump all packages to their latest available versions ([5fb0b5b](https://github.com/xing/hops/commit/5fb0b5bca2eec20ce2d9f652ac03985b31b7a5ef))
* upgrade untool to 2.0.0-alpha.4 ([6fae67b](https://github.com/xing/hops/commit/6fae67be37e83e5d3a1f4770d47dfec236428d50))


### BREAKING CHANGES

* The following peer dependencies have increased versions
- `jest`: 24.9.0
- `react` & `react-dom`: 16.8.0
- `react-apollo`: 3.1.0
- `react-redux`: 7.1.0
- `react-router-dom`: 5.1.0
- `redux-thunk`: 2.3.0
- `styled-components: 4.4.0
- `typescript`: 3.6.0
* **hops:** Hops drops support for Node v8
* **hops:** `withConfig` and `withServerData` have a simpler type definition now. They only take one generic argument instead of three.

Co-Authored-By: Emanuel Kluge <emanuel.kluge@xing.com>





# [12.0.0-alpha.2](https://github.com/xing/hops/compare/v11.9.1...v12.0.0-alpha.2) (2019-10-07)


### Bug Fixes

* upgrade untool ([6d306fa](https://github.com/xing/hops/commit/6d306fa))


### chore

* **hops:** bump minimum required node version ([97afc00](https://github.com/xing/hops/commit/97afc00))


### Features

* **hops:** improve type definitions for withServerData and withConfig ([4cd6185](https://github.com/xing/hops/commit/4cd6185))
* **hops:** simplify typings ([966989c](https://github.com/xing/hops/commit/966989c))


### BREAKING CHANGES

* **hops:** Hops drops support for Node v8
* **hops:** `withConfig` and `withServerData` have a simpler type definition now. They only take one generic argument instead of three.

Co-Authored-By: Emanuel Kluge <emanuel.kluge@xing.com>





# [12.0.0-alpha.1](https://github.com/xing/hops/compare/v11.9.1...v12.0.0-alpha.1) (2019-09-12)


### Features

* **hops:** simplify typings ([cf646ea](https://github.com/xing/hops/commit/cf646ea))


### BREAKING CHANGES

* **hops:** `withConfig` and `withServerData` have a simpler type definition now. They only take one generic argument instead of three.

Co-Authored-By: Emanuel Kluge <emanuel.kluge@xing.com>





## [11.9.1](https://github.com/xing/hops/compare/v11.9.0...v11.9.1) (2019-09-11)


### Bug Fixes

* upgrade untool ([0e4c4b4](https://github.com/xing/hops/commit/0e4c4b4))





# [11.9.0](https://github.com/xing/hops/compare/v11.8.5...v11.9.0) (2019-08-12)


### Features

* upgrade untool ([bc2557e](https://github.com/xing/hops/commit/bc2557e))





## [11.8.5](https://github.com/xing/hops/compare/v11.8.4...v11.8.5) (2019-07-23)


### Bug Fixes

* upgrade untool ([719a4e3](https://github.com/xing/hops/commit/719a4e3))





## [11.8.4](https://github.com/xing/hops/compare/v11.8.3...v11.8.4) (2019-07-19)


### Bug Fixes

* upgrade untool ([9312357](https://github.com/xing/hops/commit/9312357))





## [11.8.3](https://github.com/xing/hops/compare/v11.8.1...v11.8.3) (2019-07-12)


### Bug Fixes

* upgrade untool ([4e85423](https://github.com/xing/hops/commit/4e85423))







**Note:** Version bump only for package hops





# [11.8.0](https://github.com/xing/hops/compare/v11.7.1...v11.8.0) (2019-06-19)


### Bug Fixes

* upgrade untool ([577c1e1](https://github.com/xing/hops/commit/577c1e1))





## [11.7.1](https://github.com/xing/hops/compare/v11.7.0...v11.7.1) (2019-05-13)


### Bug Fixes

* upgrade untool ([4e9481f](https://github.com/xing/hops/commit/4e9481f))





# [11.7.0](https://github.com/xing/hops/compare/v11.6.2...v11.7.0) (2019-05-09)


### Features

* upgrade untool to include multi-threaded webpack compiler ([cebfec6](https://github.com/xing/hops/commit/cebfec6))





## [11.6.2](https://github.com/xing/hops/compare/v11.6.1...v11.6.2) (2019-05-06)

**Note:** Version bump only for package hops





## [11.6.1](https://github.com/xing/hops/compare/v11.6.0...v11.6.1) (2019-04-16)


### Bug Fixes

* upgrade to latest untool release ([ba7e50c](https://github.com/xing/hops/commit/ba7e50c))





# [11.6.0](https://github.com/xing/hops/compare/v11.5.0...v11.6.0) (2019-04-09)


### Bug Fixes

* upgrade untool to v1.5.1 ([6c09463](https://github.com/xing/hops/commit/6c09463))


### Features

* use @untool/info for CLI output/logging ([e1f3f92](https://github.com/xing/hops/commit/e1f3f92))





# [11.5.0](https://github.com/xing/hops/compare/v11.4.1...v11.5.0) (2019-04-03)


### Bug Fixes

* **dependencies:** remove react-router-dom version range where not needed ([809b196](https://github.com/xing/hops/commit/809b196))
* **dependencies:** update dependency pretty-ms to v4 ([d2a76a0](https://github.com/xing/hops/commit/d2a76a0))
* **dependencies:** update dependency react-router-dom to v^4.3.1 || v^5 ([d5f8713](https://github.com/xing/hops/commit/d5f8713))
* upgrade untool to v1.5.0 ([b8d5396](https://github.com/xing/hops/commit/b8d5396))





# [11.4.0](https://github.com/xing/hops/compare/v11.3.0...v11.4.0) (2019-03-12)


### Features

* add typescript typings for runtime API in hops and hops-pwa ([5a4ad00](https://github.com/xing/hops/commit/5a4ad00)), closes [#360](https://github.com/xing/hops/issues/360)
* **hops:** add cli flag to analyze client bundle ([3094350](https://github.com/xing/hops/commit/3094350))
* **hops:** disable automatic browser opening on --analyze-client-bundle flag ([fec7d91](https://github.com/xing/hops/commit/fec7d91))





# [11.3.0](https://github.com/xing/hops/compare/v11.2.0...v11.3.0) (2019-03-07)


### Features

* upgrade untool to 1.2.0 ([b1b742d](https://github.com/xing/hops/commit/b1b742d))





# [11.2.0](https://github.com/xing/hops/compare/v11.2.0-rc.1...v11.2.0) (2019-02-14)

**Note:** Version bump only for package hops





# [11.2.0-rc.1](https://github.com/xing/hops/compare/v11.2.0-rc.0...v11.2.0-rc.1) (2019-01-24)


### Bug Fixes

* upgrade untool to v1.0.0-rc-20 ([201e8a2](https://github.com/xing/hops/commit/201e8a2))





# [11.2.0-rc.0](https://github.com/xing/hops/compare/v11.1.0...v11.2.0-rc.0) (2019-01-23)


### Bug Fixes

* upgrade untool ([faafda2](https://github.com/xing/hops/commit/faafda2))
* upgrade untool ([afb5ccb](https://github.com/xing/hops/commit/afb5ccb))
* upgrade untool ([ec0a2f3](https://github.com/xing/hops/commit/ec0a2f3))





# [11.1.0](https://github.com/xing/hops/compare/v11.0.1...v11.1.0) (2019-01-11)


### Bug Fixes

* upgrade untool ([5f2561a](https://github.com/xing/hops/commit/5f2561a)), closes [#758](https://github.com/xing/hops/issues/758)





## [11.0.1](https://github.com/xing/hops/compare/v11.0.0...v11.0.1) (2018-12-19)

**Note:** Version bump only for package hops





# [11.0.0](https://github.com/xing/hops/compare/v11.0.0-rc.55...v11.0.0) (2018-12-13)

**Note:** Version bump only for package hops





# [11.0.0-rc.55](https://github.com/xing/hops/compare/v11.0.0-rc.54...v11.0.0-rc.55) (2018-12-12)

**Note:** Version bump only for package hops





# [11.0.0-rc.54](https://github.com/xing/hops/compare/v11.0.0-rc.53...v11.0.0-rc.54) (2018-12-12)

**Note:** Version bump only for package hops





# [11.0.0-rc.53](https://github.com/xing/hops/compare/v11.0.0-rc.52...v11.0.0-rc.53) (2018-12-10)

**Note:** Version bump only for package hops





# [11.0.0-rc.52](https://github.com/xing/hops/compare/v11.0.0-rc.51...v11.0.0-rc.52) (2018-12-10)


### Bug Fixes

* upgrade untool ([53cab73](https://github.com/xing/hops/commit/53cab73))





# [11.0.0-rc.51](https://github.com/xing/hops/compare/v11.0.0-rc.50...v11.0.0-rc.51) (2018-12-10)


### Bug Fixes

* change Import to importComponent ([94a1174](https://github.com/xing/hops/commit/94a1174))





# [11.0.0-rc.50](https://github.com/xing/hops/compare/v11.0.0-rc.49...v11.0.0-rc.50) (2018-12-05)


### Bug Fixes

* upgrade untool packages ([9be2e1e](https://github.com/xing/hops/commit/9be2e1e))





# [11.0.0-rc.49](https://github.com/xing/hops/compare/v11.0.0-rc.48...v11.0.0-rc.49) (2018-11-29)

**Note:** Version bump only for package hops





# [11.0.0-rc.48](https://github.com/xing/hops/compare/v11.0.0-rc.47...v11.0.0-rc.48) (2018-11-23)

**Note:** Version bump only for package hops





# [11.0.0-rc.47](https://github.com/xing/hops/compare/v11.0.0-rc.46...v11.0.0-rc.47) (2018-11-21)


### Bug Fixes

* upgrade untool ([d20228b](https://github.com/xing/hops/commit/d20228b))





# [11.0.0-rc.46](https://github.com/xing/hops/compare/v11.0.0-rc.45...v11.0.0-rc.46) (2018-11-15)


### Bug Fixes

* upgrade untool ([11c2de5](https://github.com/xing/hops/commit/11c2de5))





# [11.0.0-rc.45](https://github.com/xing/hops/compare/v11.0.0-rc.44...v11.0.0-rc.45) (2018-11-15)

**Note:** Version bump only for package hops





# [11.0.0-rc.44](https://github.com/xing/hops/compare/v11.0.0-rc.43...v11.0.0-rc.44) (2018-10-24)


### Bug Fixes

* upgrade untool to rc.8 ([77d6f96](https://github.com/xing/hops/commit/77d6f96))





# [11.0.0-rc.43](https://github.com/xing/hops/compare/v11.0.0-rc.42...v11.0.0-rc.43) (2018-10-23)

**Note:** Version bump only for package hops





# [11.0.0-rc.42](https://github.com/xing/hops/compare/v11.0.0-rc.41...v11.0.0-rc.42) (2018-10-23)

**Note:** Version bump only for package hops





# [11.0.0-rc.41](https://github.com/xing/hops/compare/v11.0.0-rc.40...v11.0.0-rc.41) (2018-10-17)


### Bug Fixes

* upgrade untool to 1.0.0-rc.4 ([3bdc48d](https://github.com/xing/hops/commit/3bdc48d))


### Features

* **cli:** log webpack errors and warnings in watch mode to terminal ([a0aa1fc](https://github.com/xing/hops/commit/a0aa1fc))





# [11.0.0-rc.40](https://github.com/xing/hops/compare/v11.0.0-rc.39...v11.0.0-rc.40) (2018-10-15)


### Bug Fixes

* adapt to new untool exports and config loader ([ea86491](https://github.com/xing/hops/commit/ea86491))





<a name="11.0.0-rc.39"></a>
# [11.0.0-rc.39](https://github.com/xing/hops/compare/v11.0.0-rc.38...v11.0.0-rc.39) (2018-10-10)


### Features

* **create-hops-app:** init package ([cf02570](https://github.com/xing/hops/commit/cf02570))





<a name="11.0.0-rc.38"></a>
# [11.0.0-rc.38](https://github.com/xing/hops/compare/v11.0.0-rc.37...v11.0.0-rc.38) (2018-10-05)


### Bug Fixes

* **cli:** add missing [@untool](https://github.com/untool)/yargs ([b23a7b1](https://github.com/xing/hops/commit/b23a7b1))





<a name="11.0.0-rc.37"></a>
# [11.0.0-rc.37](https://github.com/xing/hops/compare/v11.0.0-rc.36...v11.0.0-rc.37) (2018-09-27)


### Features

* **cli:** use untools CLI mixin to print build stats and server status ([3303eaf](https://github.com/xing/hops/commit/3303eaf))





<a name="11.0.0-rc.36"></a>
# [11.0.0-rc.36](https://github.com/xing/hops/compare/v11.0.0-rc.35...v11.0.0-rc.36) (2018-09-26)

**Note:** Version bump only for package hops





<a name="11.0.0-rc.35"></a>
# [11.0.0-rc.35](https://github.com/xing/hops/compare/v11.0.0-rc.34...v11.0.0-rc.35) (2018-09-13)

**Note:** Version bump only for package hops





<a name="11.0.0-rc.32"></a>
# [11.0.0-rc.32](https://github.com/xing/hops/compare/v11.0.0-rc.31...v11.0.0-rc.32) (2018-09-04)


### Bug Fixes

* **cli:** print getting started message based on availability of CLI ([f4c88b8](https://github.com/xing/hops/commit/f4c88b8))





<a name="11.0.0-rc.27"></a>
# [11.0.0-rc.27](https://github.com/xing/hops/compare/v11.0.0-rc.26...v11.0.0-rc.27) (2018-08-06)




**Note:** Version bump only for package hops

<a name="11.0.0-rc.26"></a>
# [11.0.0-rc.26](https://github.com/xing/hops/compare/v10.4.6...v11.0.0-rc.26) (2018-08-01)


### Chores

* specify engines as >=8.10 in all packages ([1b7a1d2](https://github.com/xing/hops/commit/1b7a1d2))


### Features

* **cli:** add dotenv support ([32d717e](https://github.com/xing/hops/commit/32d717e))
* **cli:** remove dotenv again as it is now part of untool ([92f6417](https://github.com/xing/hops/commit/92f6417))
* **preset-defaults:** move default presets into separate package ([722f67c](https://github.com/xing/hops/commit/722f67c))
* **react:** implement server components ([53f3cfb](https://github.com/xing/hops/commit/53f3cfb))


### BREAKING CHANGES

* Increase minimum required Node.js version from 6 to 8
This commit specifies Node.js 8.10 as minimum required version in all
packages.




<a name="11.0.0-rc.25"></a>
# [11.0.0-rc.25](https://github.com/xing/hops/compare/v10.4.6...v11.0.0-rc.25) (2018-07-31)


### Chores

* specify engines as >=8.10 in all packages ([1b7a1d2](https://github.com/xing/hops/commit/1b7a1d2))


### Features

* **cli:** add dotenv support ([32d717e](https://github.com/xing/hops/commit/32d717e))
* **cli:** remove dotenv again as it is now part of untool ([92f6417](https://github.com/xing/hops/commit/92f6417))
* **preset-defaults:** move default presets into separate package ([722f67c](https://github.com/xing/hops/commit/722f67c))
* **react:** implement server components ([53f3cfb](https://github.com/xing/hops/commit/53f3cfb))


### BREAKING CHANGES

* Increase minimum required Node.js version from 6 to 8
This commit specifies Node.js 8.10 as minimum required version in all
packages.




<a name="11.0.0-rc.19"></a>
# [11.0.0-rc.19](https://github.com/xing/hops/compare/v10.4.6...v11.0.0-rc.19) (2018-07-19)


### Chores

* specify engines as >=8.10 in all packages ([bb20aa6](https://github.com/xing/hops/commit/bb20aa6))


### Features

* **cli:** add dotenv support ([2f68e19](https://github.com/xing/hops/commit/2f68e19))
* **cli:** remove dotenv again as it is now part of untool ([cd6936c](https://github.com/xing/hops/commit/cd6936c))
* **preset-defaults:** move default presets into separate package ([f8a095a](https://github.com/xing/hops/commit/f8a095a))
* **react:** implement server components ([8249d90](https://github.com/xing/hops/commit/8249d90))


### BREAKING CHANGES

* Increase minimum required Node.js version from 6 to 8
This commit specifies Node.js 8.10 as minimum required version in all
packages.




<a name="11.0.0-rc.17"></a>
# [11.0.0-rc.17](https://github.com/xing/hops/compare/v11.0.0-rc.16...v11.0.0-rc.17) (2018-07-09)


### Features

* **cli:** remove dotenv again as it is now part of untool ([1044735](https://github.com/xing/hops/commit/1044735))




<a name="11.0.0-rc.16"></a>
# [11.0.0-rc.16](https://github.com/xing/hops/compare/v11.0.0-rc.15...v11.0.0-rc.16) (2018-07-09)




**Note:** Version bump only for package hops

<a name="11.0.0-rc.12"></a>
# [11.0.0-rc.12](https://github.com/xing/hops/compare/v11.0.0-rc.11...v11.0.0-rc.12) (2018-06-28)


### Features

* **cli:** add dotenv support ([7b7a683](https://github.com/xing/hops/commit/7b7a683))




<a name="11.0.0-rc.5"></a>
# [11.0.0-rc.5](https://github.com/xing/hops/compare/v11.0.0-rc.4...v11.0.0-rc.5) (2018-06-25)


### Features

* **react:** implement server components ([95d329f](https://github.com/xing/hops/commit/95d329f))




<a name="11.0.0-rc.3"></a>
# [11.0.0-rc.3](https://github.com/xing/hops/compare/v10.4.3...v11.0.0-rc.3) (2018-05-25)


### Chores

* specify engines as >=8.10 in all packages ([335fd84](https://github.com/xing/hops/commit/335fd84))
* specify engines as >=8.10 in all packages ([9228cb1](https://github.com/xing/hops/commit/9228cb1))


### Features

* **preset-defaults:** move default presets into separate package ([4d726bf](https://github.com/xing/hops/commit/4d726bf))


### BREAKING CHANGES

* Increase minimum required Node.js version from 6 to 8
This commit specifies Node.js 8.10 as minimum required version in all
packages.
* Increase minimum required Node.js version from 6 to 8
This commit specifies Node.js 8.10 as minimum required version in all
packages.




<a name="11.0.0-rc.0"></a>
# [11.0.0-rc.0](https://github.com/xing/hops/compare/v10.4.3...v11.0.0-rc.0) (2018-05-22)


### Chores

* specify engines as >=8.10 in all packages ([bc24dca](https://github.com/xing/hops/commit/bc24dca))
* specify engines as >=8.10 in all packages ([9228cb1](https://github.com/xing/hops/commit/9228cb1))


### Features

* **preset-defaults:** move default presets into separate package ([9000cb0](https://github.com/xing/hops/commit/9000cb0))


### BREAKING CHANGES

* Increase minimum required Node.js version from 6 to 8
This commit specifies Node.js 8.10 as minimum required version in all
packages.
* Increase minimum required Node.js version from 6 to 8
This commit specifies Node.js 8.10 as minimum required version in all
packages.




<a name="10.4.0"></a>
# [10.4.0](https://github.com/xing/hops/compare/v10.2.0-rc.5...v10.4.0) (2018-04-17)




**Note:** Version bump only for package hops

<a name="10.2.0"></a>
# [10.2.0](https://github.com/xing/hops/compare/v10.2.0-rc.5...v10.2.0) (2018-03-26)




**Note:** Version bump only for package hops

<a name="10.0.2"></a>
## [10.0.2](https://github.com/xing/hops/compare/v10.0.1...v10.0.2) (2018-02-15)


### Bug Fixes

* **cli:** fix variable scoping issues, improve error messages ([e29552c](https://github.com/xing/hops/commit/e29552c))




<a name="10.0.0"></a>
# [10.0.0](https://github.com/xing/hops/compare/v10.0.0-rc.4...v10.0.0) (2018-02-07)




**Note:** Version bump only for package hops

<a name="9.7.0"></a>
# [9.7.0](https://github.com/xing/hops/compare/v9.6.1...v9.7.0) (2018-01-22)


### Features

* **cli:** execute build to prod start command ([8565081](https://github.com/xing/hops/commit/8565081))




<a name="9.6.1"></a>
## [9.6.1](https://github.com/xing/hops/compare/v9.6.0...v9.6.1) (2018-01-12)


### Bug Fixes

* **hops-cli:** allow to add .npmrc in templates ([3a47f3d](https://github.com/xing/hops/commit/3a47f3d))




<a name="9.6.0"></a>
# [9.6.0](https://github.com/xing/hops/compare/v9.5.0...v9.6.0) (2018-01-09)


### Bug Fixes

* **cli:** use pkg-dir instead of hops-config to figure out app root ([34bd28f](https://github.com/xing/hops/commit/34bd28f))




<a name="9.5.0"></a>
# [9.5.0](https://github.com/xing/hops/compare/v9.4.3...v9.5.0) (2018-01-09)




**Note:** Version bump only for package hops

<a name="9.4.3"></a>
## [9.4.3](https://github.com/xing/hops/compare/v9.4.2...v9.4.3) (2018-01-08)


### Bug Fixes

* **cli:** do not require local packages in global context ([42002a3](https://github.com/xing/hops/commit/42002a3))




<a name="9.4.0"></a>
# [9.4.0](https://github.com/xing/hops/compare/v9.3.2...v9.4.0) (2018-01-08)




**Note:** Version bump only for package hops

<a name="9.3.2"></a>
## [9.3.2](https://github.com/xing/hops/compare/v9.3.1...v9.3.2) (2018-01-08)




**Note:** Version bump only for package hops-cli

<a name="9.1.1"></a>
## [9.1.1](https://github.com/xing/hops/compare/v9.1.0...v9.1.1) (2017-12-05)




**Note:** Version bump only for package hops-cli

<a name="7.4.0"></a>
# [7.4.0](https://github.com/xing/hops/compare/v7.3.5...v7.4.0) (2017-11-01)




**Note:** Version bump only for package hops-cli

<a name="7.3.0"></a>
# [7.3.0](https://github.com/xing/hops/compare/v7.2.0...v7.3.0) (2017-10-26)


### Bug Fixes

* **cli:** lookup "hops-local-cli" in dependencies + devDependencies ([9aa136e](https://github.com/xing/hops/commit/9aa136e))


### Features

* **cli:** update cli for extensible local-cli ([aa794fc](https://github.com/xing/hops/commit/aa794fc))




<a name="7.2.0"></a>
# [7.2.0](https://github.com/xing/hops/compare/v7.1.0...v7.2.0) (2017-10-18)




**Note:** Version bump only for package hops-cli

<a name="7.1.0"></a>
# [7.1.0](https://github.com/xing/hops/compare/v7.0.0...v7.1.0) (2017-10-16)




**Note:** Version bump only for package hops-cli

<a name="7.0.0"></a>
# [7.0.0](https://github.com/xing/hops/compare/v6.2.8...v7.0.0) (2017-10-13)


### Features

* **cli:** split hops packages, introduce changelog
