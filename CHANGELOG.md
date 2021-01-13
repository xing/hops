# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [13.3.1](https://github.com/xing/hops/compare/v13.3.0...v13.3.1) (2021-01-13)


### Bug Fixes

* **postcss:** disable external PostCSS configs ([6e24f3f](https://github.com/xing/hops/commit/6e24f3f129481a8eb4529275381b9a94b40a2fcd))





# [13.3.0](https://github.com/xing/hops/compare/v13.2.2...v13.3.0) (2021-01-11)


### Bug Fixes

* **bootstrap:** add Ajv formats ([fb51f62](https://github.com/xing/hops/commit/fb51f6274bede052e9db4a10c2155f4240a44af4))
* **bootstrap:** limit pattern properties, too ([f6885e1](https://github.com/xing/hops/commit/f6885e196df98492d9caae4bab5382432e34401e))
* **bootstrap:** opt out of Ajv's strict mode ([9c96e2c](https://github.com/xing/hops/commit/9c96e2c8a80afe1b2a9e719e702e4fed95db334b))
* **bootstrap:** use default import of Ajv ([df98412](https://github.com/xing/hops/commit/df98412d8b966375b278aff8d3dee62ece4e9841))
* **postcss:** update Webpack's CSS compilation ([5e53691](https://github.com/xing/hops/commit/5e5369158dfb0f08e397ed07884b6af38a2b6570))
* **webpack:** ensure forked compiler exits when done ([f20f0f0](https://github.com/xing/hops/commit/f20f0f0b0accade4e5973accbd3afc1bf33221fd))
* update dependency ajv to v7 ([71b95bb](https://github.com/xing/hops/commit/71b95bb99960685e993b56889bbaf6787eb2ee4f))
* update dependency supports-color to v8 ([14f8179](https://github.com/xing/hops/commit/14f8179ad1982a4c1bd359e56acd194324f54c3e))


### Features

* **jest-environment:** add package jest-environment-hops ([f9434ad](https://github.com/xing/hops/commit/f9434ad5767f4c9cb0099832b7f74ef7035a854e))





## [13.2.2](https://github.com/xing/hops/compare/v13.2.1...v13.2.2) (2020-12-07)


### Bug Fixes

* **bootstrap:** do not try to resolve ESM packages for presets ([1815f58](https://github.com/xing/hops/commit/1815f58f99fbd06ef77463caa4bd08f4e10eeea8))
* **create-hops-app:** force legacy peer deps handling for npm@7 ([de9c7db](https://github.com/xing/hops/commit/de9c7db4121437d38594ed7a5786917592c0bc74))
* **webpack:** always transpile optional chaining and nullish coalescing ([1cdb38a](https://github.com/xing/hops/commit/1cdb38ad209404e038fcd17cb495f4008c9e8baa))
* **webpack:** consider the current node version for babel cache ([de91f45](https://github.com/xing/hops/commit/de91f454bae3b49f159ef053a7fcfaa35f200418))





## [13.2.1](https://github.com/xing/hops/compare/v13.2.0...v13.2.1) (2020-11-20)


### Bug Fixes

* **webpack:** compile browser bundle for latest chrome only ([d5d901a](https://github.com/xing/hops/commit/d5d901ab00e0cf92d5660a95ee65fb9cf44aa77d))
* **webpack:** fix memory leak in StatsWriterPlugin ([276f049](https://github.com/xing/hops/commit/276f0499315a9dc786ee7c50ae1f52d62ad49092))
* allow react v17 and upgrade to v17 ([97b7385](https://github.com/xing/hops/commit/97b7385334e37af6c1e437d0572d36023eefb65f))
* update dependency mini-css-extract-plugin to ^0.12.0 ([da30026](https://github.com/xing/hops/commit/da30026f2493fbcd86316b531b8a61710a79b73a))
* update dependency react-test-renderer to v17 ([b25b7f0](https://github.com/xing/hops/commit/b25b7f05b8a7de743253c816e6c7a257a9feeac0))
* upgrade graphql-tools packages to v7 ([9dbfc5e](https://github.com/xing/hops/commit/9dbfc5e2d1ac86bb9d787873289964ce2bc9be4d))
* upgrade is-plain-obj to v3 ([fb864d7](https://github.com/xing/hops/commit/fb864d7ad007d135d033d46cc3ded7e78fd61f90))
* upgrade webpack-bundle-analyzer to v4 ([0c87811](https://github.com/xing/hops/commit/0c87811d6d52135816e552e2ca9aed914cb5524b))
* upgrade webpack-dev-middleware to v4 ([3ff152b](https://github.com/xing/hops/commit/3ff152b8ee91199017fae28059fa82d8f87b58bd))
* upgrade yargs to v16 ([3997617](https://github.com/xing/hops/commit/3997617a75021d824d7958a0c773540c54a1b744))





# [13.2.0](https://github.com/xing/hops/compare/v13.1.0...v13.2.0) (2020-11-06)


### Features

* **info:** make logger available in server runtime ([4d43a3f](https://github.com/xing/hops/commit/4d43a3f3c3448a87495df00a72bc1d2e7b7ea9c5))
* **info:** use existing logger if available ([61c32b7](https://github.com/xing/hops/commit/61c32b785c05c3e86a99dcda7f0d0222eeb8b5d3))
* add support for Node v15 ([3ea8714](https://github.com/xing/hops/commit/3ea8714702960d0408cb6eae4bf336cb637eea9d))





# [13.1.0](https://github.com/xing/hops/compare/v13.0.0...v13.1.0) (2020-10-09)


### Bug Fixes

* **bootstrap:** ignore exports fields when resolving presets ([b9accbe](https://github.com/xing/hops/commit/b9accbefe824d27830926c7965d19f8e7f488449))
* **create-hops-app:** remove "[@next](https://github.com/next)" suffix of binary ([4f556ab](https://github.com/xing/hops/commit/4f556ab4b9af1f4f889b4967e7edaa802de8eb3f))
* **typescript:** preserve JSX ([03f73ae](https://github.com/xing/hops/commit/03f73aed3939bc1bf4825ed9f0c251d04fbf470f))
* **webpack:** accept object argument in BuildError ([33e378f](https://github.com/xing/hops/commit/33e378f7e1b4a65b816bafa8da0fd88caf563fdc))


### Features

* **info:** introduce helpers for emitting warnings & errors ([4937fde](https://github.com/xing/hops/commit/4937fde43f4c6f8af164d4d127897dc64f75ad91))





# [13.0.0](https://github.com/xing/hops/compare/v13.0.0-rc.0...v13.0.0) (2020-09-28)


### Bug Fixes

* **jest-preset:** fix warning in case of outdated Jest version ([4ef9ad8](https://github.com/xing/hops/commit/4ef9ad8408913ee2fcc029219796820addf26405))
* **lambda:** correct condition ([71a55e1](https://github.com/xing/hops/commit/71a55e12742d8d4dd5685b2480ee3844ead6a04b))
* **lambda:** ensure warnings are printed ([92cdeb4](https://github.com/xing/hops/commit/92cdeb4f828b3ad07c443a9dc31a0319df6f9a2f))
* **webpack:** replace serialize-error with a custom implementation ([65931fc](https://github.com/xing/hops/commit/65931fcb319198b61f20baf07bfbd8d7d3d750dd))
* update dependency enhanced-resolve to v5 ([4842d30](https://github.com/xing/hops/commit/4842d307931699b3d5aef656a8b0900e038be768))
* update dependency mini-css-extract-plugin to ^0.11.0 ([544ece2](https://github.com/xing/hops/commit/544ece2e24d4120b604fb7a1358cf7044159c8bf))
* update dependency serialize-javascript to v5 ([5f22713](https://github.com/xing/hops/commit/5f22713d77272513f80d8f1bdf0169178bfd2f2c))
* update dependency webpack-sources to v2 ([12134a4](https://github.com/xing/hops/commit/12134a40aec57c8b2cbdedbbcfd15bd3883e224e))
* **webpack:** use webpack HMR for node build to fix memory leak ([2826fdf](https://github.com/xing/hops/commit/2826fdfa64084507fdd07be7a34cee66763ee73a))


### Features

* **jest-preset:** print an error when Jest version is unsupported ([cb2126a](https://github.com/xing/hops/commit/cb2126aed02a060138764cd7fd22909648254889))





# [13.0.0-rc.0](https://github.com/xing/hops/compare/v13.0.0-alpha.2...v13.0.0-rc.0) (2020-09-07)


### Bug Fixes

* remove superfluous dependencies ([afb2de0](https://github.com/xing/hops/commit/afb2de0063c3031b215cb8d989c3babe2aa81231))
* **express:** disable helmet csp option for now ([1683035](https://github.com/xing/hops/commit/16830354363b7f1faae88b65304eed3f71e34699))
* update dependency cosmiconfig to v7 ([44e0f84](https://github.com/xing/hops/commit/44e0f84dfb464e2e9df776f4636185fbaf126c04))
* update dependency find-up to v5 ([ce11652](https://github.com/xing/hops/commit/ce1165227b2a0782f6e945e0a1c8de8adb1a4ea9))
* update dependency helmet to v4 ([712ce25](https://github.com/xing/hops/commit/712ce25e949bd5ee3b85edd1d2b0ba5a42147180))
* update dependency mini-css-extract-plugin to ^0.10.0 ([f77a14f](https://github.com/xing/hops/commit/f77a14f23b217d301446f05bc207a0f8a2a8a917))
* update dependency terser-webpack-plugin to v4 ([b0c5132](https://github.com/xing/hops/commit/b0c51320984d42bce065718cf8626080a75928a4))
* update dependency typescript to v4 ([d2ec9fc](https://github.com/xing/hops/commit/d2ec9fc52063694fd46a5dafe42f9317bf96262e))


### Reverts

* Revert "chore: deprecate "hops-mixin" in favor of "hops-bootstrap"" ([79438bb](https://github.com/xing/hops/commit/79438bb1a2054f5ef8362d59b4aefd412cd9be86))





# [13.0.0-alpha.2](https://github.com/xing/hops/compare/v13.0.0-alpha.1...v13.0.0-alpha.2) (2020-08-17)


### Bug Fixes

* **react-apollo:** prevent requests on server when SSR is turned off ([6e2cdf9](https://github.com/xing/hops/commit/6e2cdf97fdf6bb0b15212920d9f05ec956af0093))





# [13.0.0-alpha.1](https://github.com/xing/hops/compare/v13.0.0-alpha.0...v13.0.0-alpha.1) (2020-07-31)


### Bug Fixes

* **react:** declare propTypes for Import component ([a929c7d](https://github.com/xing/hops/commit/a929c7d20a5f477930373d1f99f2eea079a4880e))
* **react:** remove support of react-helmet ([3ea3cc5](https://github.com/xing/hops/commit/3ea3cc534f83cb75dcf8bff61a0dad8ac4cb7d45))
* **react:** require export resolver function in importComponent ([ff71be6](https://github.com/xing/hops/commit/ff71be69ad4d03f453d2c3bdc4177da7961c2bdd))
* **react:** require module loader function in importComponent ([dd6e501](https://github.com/xing/hops/commit/dd6e5017422fff1e3cb20a610c9010e8acc3c2fb))
* **react-apollo:** remove support for shouldPrefetchOnServer ([e52a467](https://github.com/xing/hops/commit/e52a467749f95d4fefacf023198166d967000f49))
* **redux:** remove support for shouldPrefetchOnServer ([1e2e1f2](https://github.com/xing/hops/commit/1e2e1f2bd7ed21fb7d22d95b2803e6ccffcac250))
* **webpack:** reset stats promise on watch run events ([0cd654d](https://github.com/xing/hops/commit/0cd654d33c56f068fdf5412e6e45901312948b0d))
* update dependency archiver to v5 ([30740dc](https://github.com/xing/hops/commit/30740dc6bc34310254052cb2393bf4e900c42ba5))


### BREAKING CHANGES

* **react:** Hops does not support the synchronous
`react-helmet`-package anymore; you have thus to update your
`import`-statements to import the `Helmet`-component from
`react-helmet-async` instead.
* **react:** `importComponent` does not accept a module identifier
as the first argument anymore, but requires you to pass in a function,
that returns the `Promise` of the dynamic import of the module.
* **react:** `importComponent` now requires the second argument,
that resolves a named export, to be a function.
* **redux:** Replace the outdated `shouldPrefetchOnServer` in your Hops
configuration with the new config value `allowServerSideDataFetching`.
* **react-apollo:** Replace the outdated `shouldPrefetchOnServer` in your Hops
configuration with the new config value `allowServerSideDataFetching`.





# [13.0.0-alpha.0](https://github.com/xing/hops/compare/v12.0.0-rc99...v13.0.0-alpha.0) (2020-07-23)


### Bug Fixes

* **react-apollo:** import from graphql-tools monorepo package ([d31d1b0](https://github.com/xing/hops/commit/d31d1b0b73de305fbac4e858747a7f1897d0a51d))
* ensure externals use correct version of packages ([e4ec3d7](https://github.com/xing/hops/commit/e4ec3d755d5e4da12028393866fd6c68aa89c161))
* update dependency graphql-tools to v6 ([5a4fc78](https://github.com/xing/hops/commit/5a4fc7867f91474f204e2222eb492a29111f01b2))
* **lambda:** remove support for the "nodejs10.x"-runtime ([8f9d2ac](https://github.com/xing/hops/commit/8f9d2acf070fcf894df3d1a44524dac1a0cc1f19))
* remove support for Node versions 10 & 13 ([00e7f2f](https://github.com/xing/hops/commit/00e7f2fb2ec92b859805b65bfeee697a78bf8147))
* upgrade jest to v26 ([dfaf499](https://github.com/xing/hops/commit/dfaf49999704096859b63ed94c90a00a8727c75e))


### Features

* support latest Node.js (v13) ([30ca9a4](https://github.com/xing/hops/commit/30ca9a4ebc3a43706eb07158259035349ce2d269))


### BREAKING CHANGES

* **lambda:** Since Hops dropped support for Node version 10, the
respective runtime on AWS Lambda isn't supported anymore either. If
you're running hops-lambda with `nodejs10.x`, please switch to
`nodejs12.x`.
* Hops does not support the outdated Node versions 10
and 13 anymore. In case you're using one of these, please update your
Node version to the current version 14 or the LTS version 12.
* Jest peerDependency has been changed from 24->26





[Hops v12 changelog](https://github.com/xing/hops/blob/v12.x/CHANGELOG.md)
