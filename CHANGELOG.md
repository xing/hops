# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [12.0.0-alpha.4](https://github.com/xing/hops/compare/v12.0.0-alpha.3...v12.0.0-alpha.4) (2019-10-29)


### Bug Fixes

* **graphql:** add graphqlUri to browser whitelist ([e5279b8](https://github.com/xing/hops/commit/e5279b8c9717d77ba1b725a3148b0eadb90969ae))


### Features

* **apollo:** deprecate config value "shouldPrefetchOnServer" ([2758f43](https://github.com/xing/hops/commit/2758f431bac85c77a529ba6e3a2ac37591d7f017))
* **apollo:** introduce package ([f8892ff](https://github.com/xing/hops/commit/f8892ff01072168a7c76300ff6c2669c5cad9c6e))
* **apollo-mock-server:** introduce package ([b35f618](https://github.com/xing/hops/commit/b35f6181166d7a7146e15846a808319c801ee21d))
* **hops:** add typings for config & server-data context hooks ([8677c9e](https://github.com/xing/hops/commit/8677c9e2df68bd1dd9ef7bef224000674ae24dff))
* **hops:** re-export config & server-data hooks from hops-react ([578407e](https://github.com/xing/hops/commit/578407e274cf07f6055cde944c0446daecf4b742))
* **react:** provide hooks for config & server-data contexts ([6bfaf55](https://github.com/xing/hops/commit/6bfaf55b72fbc12f86f1cd3f55420e8f6c19f678))
* **redux:** deprecate config value "shouldPrefetchOnServer" ([2fc424e](https://github.com/xing/hops/commit/2fc424eb3b22b6003e9a8112a8db9d959ad4fd8b))





# [12.0.0-alpha.3](https://github.com/xing/hops/compare/v11.9.1...v12.0.0-alpha.3) (2019-10-28)


### Bug Fixes

* **jest-preset:** add missing regenerator-runtime dependency ([6d7b6a7](https://github.com/xing/hops/commit/6d7b6a707f4c12154737d4dd09bd586f74f54884))
* **jest-preset:** remove unneeded dependency to @types/jest ([47d7bbc](https://github.com/xing/hops/commit/47d7bbc556c13c35e9fdd27278d0771459ab1657))
* **jest-preset:** use core-js v3 ([b76c888](https://github.com/xing/hops/commit/b76c88838bc8f869373bff49f41aec2f68e39a4c))
* switch to react-helmet-async ([f1c61d1](https://github.com/xing/hops/commit/f1c61d1c248db30532c1c1ecdafe266d8cc363ed))
* update dependency tar to v5 ([fb03c51](https://github.com/xing/hops/commit/fb03c51bff746e479869dcec45af1c1c8f799951))
* upgrade untool ([4034440](https://github.com/xing/hops/commit/4034440864806f3e40677fcde5a2f871729596cd))


### chore

* **spec:** bump minimum required node version ([dce399c](https://github.com/xing/hops/commit/dce399c1c825796855a062783af7d3a3a5a38649))
* bump minimum required node version ([5e8466b](https://github.com/xing/hops/commit/5e8466b217a85a846324b48b13b21dff1537d1cb))
* **config:** bump minimum required node version ([9c39fbc](https://github.com/xing/hops/commit/9c39fbc3edeb46369fc37f8e57e804cc2c9bfebb))
* **create-hops-app:** bump minimum required node version ([ebdb762](https://github.com/xing/hops/commit/ebdb76209fb42443407d26d3d23975dce689992c))
* **development-proxy:** bump minimum required node version ([a9e971f](https://github.com/xing/hops/commit/a9e971fde9824a33e52596634d7cf220b458437d))
* **express:** bump minimum required node version ([9e311bd](https://github.com/xing/hops/commit/9e311bdf879a18bf474eb2ea96fe666ed0bfe4e2))
* **graphql:** bump minimum required node version ([3534888](https://github.com/xing/hops/commit/3534888dd6af9876ce62670cd58dbc25f8fc15ca))
* **hops:** bump minimum required node version ([cf74790](https://github.com/xing/hops/commit/cf74790a085d586a664abfe1f11f8d60416f19d6))
* **jest-preset:** bump minimum required node version ([b51e858](https://github.com/xing/hops/commit/b51e858d5d02b6c27a4440053d8c4b23dbb96990))
* **lambda:** bump minimum required node version ([96e53bf](https://github.com/xing/hops/commit/96e53bf26396918803bb8927bab4f0f0c6f8dc0d))
* **mixin:** bump minimum required node version ([a4f8289](https://github.com/xing/hops/commit/a4f8289beb55ff74e94944c9defc8d9a989fc180))
* **postcss:** bump minimum required node version ([51797cc](https://github.com/xing/hops/commit/51797cc8fb56eb944796c643a2dcb5e1b5da5b63))
* **pwa:** bump minimum required node version ([d395703](https://github.com/xing/hops/commit/d3957037482609e9de1df78a5a903297229a0e3e))
* **react:** bump minimum required node version ([da59fc6](https://github.com/xing/hops/commit/da59fc67a71b791115efce7234c3f48483a9a9b9))
* **redux:** bump minimum required node version ([25dae45](https://github.com/xing/hops/commit/25dae450d9dd61e701bcdf133b353a633e3e4f26))
* **styled-components:** bump minimum required node version ([8814294](https://github.com/xing/hops/commit/881429459ae14facf584ada552ce149f3724ca3f))
* **typescript:** bump minimum required node version ([d6a416b](https://github.com/xing/hops/commit/d6a416bacc8c4c87c03c354af19222f1f4b08adb))


### Features

* **hops:** improve type definitions for withServerData and withConfig ([0ddbdce](https://github.com/xing/hops/commit/0ddbdce2fa0e13cd2bee90ea9f4ce5274263ea1b))
* **hops:** simplify typings ([038eb2b](https://github.com/xing/hops/commit/038eb2b1bd1d55c8ad155be4aa4c10aed87199e0))
* **postcss:** upgrade to css-loader v3 ([721e798](https://github.com/xing/hops/commit/721e798c66ea2c7c53878739b89e047ba5a665ff))
* bump all packages to their latest available versions ([5fb0b5b](https://github.com/xing/hops/commit/5fb0b5bca2eec20ce2d9f652ac03985b31b7a5ef))
* upgrade to jest v24 ([6482e51](https://github.com/xing/hops/commit/6482e51f63e3eb66f7680ee3e8a27f3701c078b1)), closes [#815](https://github.com/xing/hops/issues/815)
* upgrade untool to 2.0.0-alpha.4 ([6fae67b](https://github.com/xing/hops/commit/6fae67be37e83e5d3a1f4770d47dfec236428d50))
* **pwa:** whitelist config keys that should be sent to the browser ([685aa1a](https://github.com/xing/hops/commit/685aa1a7cc4dbfb2a7cfc93c07d15b67801905af))
* **typescript:** make typescript a peer dependency ([0f4a2f2](https://github.com/xing/hops/commit/0f4a2f209d8007f5af8d71a6df7ab108d4063860))


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
* **postcss:** This upgrade contains two major releases of css-loader
Please check out their release notes about breaking changes and upgrade
guides:
- https://github.com/webpack-contrib/css-loader/releases/tag/v2.0.0
- https://github.com/webpack-contrib/css-loader/releases/tag/v3.0.0
* **react:** Hops drops support for Node v8
* **redux:** Hops drops support for Node v8
* **development-proxy:** Hops drops support for Node v8
* **lambda:** Hops drops support for Node v8
* **create-hops-app:** Hops drops support for Node v8
* **pwa:** Hops drops support for Node v8
* **graphql:** Hops drops support for Node v8
* **spec:** Hops drops support for Node v8
* **postcss:** Hops drops support for Node v8
* **jest-preset:** Hops drops support for Node v8
* **typescript:** Hops drops support for Node v8
* **config:** Hops drops support for Node v8
* **express:** Hops drops support for Node v8
* **hops:** Hops drops support for Node v8
* **styled-components:** Hops drops support for Node v8
* Hops drops support for Node v8
* **hops:** `withConfig` and `withServerData` have a simpler type definition now. They only take one generic argument instead of three.

Co-Authored-By: Emanuel Kluge <emanuel.kluge@xing.com>
* Jest v23 is no longer supported. Applications must
provide Jest v24 through their dependencies.
* **typescript:** TypeScript is now a peer dependency.
* **mixin:** Hops drops support for Node v8





# [12.0.0-alpha.2](https://github.com/xing/hops/compare/v11.9.1...v12.0.0-alpha.2) (2019-10-07)


### Bug Fixes

* update dependency tar to v5 ([fb03c51](https://github.com/xing/hops/commit/fb03c51))
* **jest-preset:** add missing regenerator-runtime dependency ([e8512e5](https://github.com/xing/hops/commit/e8512e5))
* **jest-preset:** remove unneeded dependency to @types/jest ([f83b331](https://github.com/xing/hops/commit/f83b331))
* **jest-preset:** use core-js v3 ([ab77b4c](https://github.com/xing/hops/commit/ab77b4c))
* upgrade untool ([6d306fa](https://github.com/xing/hops/commit/6d306fa))


### chore

* **spec:** bump minimum required node version ([7d254f5](https://github.com/xing/hops/commit/7d254f5))
* bump minimum required node version ([a018301](https://github.com/xing/hops/commit/a018301))
* **config:** bump minimum required node version ([207fe29](https://github.com/xing/hops/commit/207fe29))
* **create-hops-app:** bump minimum required node version ([dd38f1c](https://github.com/xing/hops/commit/dd38f1c))
* **development-proxy:** bump minimum required node version ([73f0ce6](https://github.com/xing/hops/commit/73f0ce6))
* **express:** bump minimum required node version ([4e584ad](https://github.com/xing/hops/commit/4e584ad))
* **graphql:** bump minimum required node version ([175ce71](https://github.com/xing/hops/commit/175ce71))
* **hops:** bump minimum required node version ([97afc00](https://github.com/xing/hops/commit/97afc00))
* **jest-preset:** bump minimum required node version ([67d5dd3](https://github.com/xing/hops/commit/67d5dd3))
* **lambda:** bump minimum required node version ([ca4dabb](https://github.com/xing/hops/commit/ca4dabb))
* **mixin:** bump minimum required node version ([6b7db65](https://github.com/xing/hops/commit/6b7db65))
* **postcss:** bump minimum required node version ([313435b](https://github.com/xing/hops/commit/313435b))
* **pwa:** bump minimum required node version ([fc109e9](https://github.com/xing/hops/commit/fc109e9))
* **react:** bump minimum required node version ([bda65a2](https://github.com/xing/hops/commit/bda65a2))
* **redux:** bump minimum required node version ([800d595](https://github.com/xing/hops/commit/800d595))
* **styled-components:** bump minimum required node version ([fd15d9b](https://github.com/xing/hops/commit/fd15d9b))
* **typescript:** bump minimum required node version ([3e4c637](https://github.com/xing/hops/commit/3e4c637))


### Features

* upgrade to jest v24 ([1e60458](https://github.com/xing/hops/commit/1e60458)), closes [#815](https://github.com/xing/hops/issues/815)
* **hops:** improve type definitions for withServerData and withConfig ([4cd6185](https://github.com/xing/hops/commit/4cd6185))
* **hops:** simplify typings ([966989c](https://github.com/xing/hops/commit/966989c))
* **postcss:** upgrade to css-loader v3 ([31067c2](https://github.com/xing/hops/commit/31067c2))
* **typescript:** make typescript a peer dependency ([aa0c2ee](https://github.com/xing/hops/commit/aa0c2ee))


### BREAKING CHANGES

* **jest-preset:** Hops drops support for Node v8
* **postcss:** This upgrade contains two major releases of css-loader
Please check out their release notes about breaking changes and upgrade
guides:
- https://github.com/webpack-contrib/css-loader/releases/tag/v2.0.0
- https://github.com/webpack-contrib/css-loader/releases/tag/v3.0.0
* **redux:** Hops drops support for Node v8
* **development-proxy:** Hops drops support for Node v8
* **lambda:** Hops drops support for Node v8
* **create-hops-app:** Hops drops support for Node v8
* **pwa:** Hops drops support for Node v8
* **graphql:** Hops drops support for Node v8
* **spec:** Hops drops support for Node v8
* **postcss:** Hops drops support for Node v8
* **react:** Hops drops support for Node v8
* **typescript:** Hops drops support for Node v8
* **config:** Hops drops support for Node v8
* **express:** Hops drops support for Node v8
* **hops:** Hops drops support for Node v8
* **styled-components:** Hops drops support for Node v8
* Hops drops support for Node v8
* **hops:** `withConfig` and `withServerData` have a simpler type definition now. They only take one generic argument instead of three.

Co-Authored-By: Emanuel Kluge <emanuel.kluge@xing.com>
* Jest v23 is no longer supported. Applications must
provide Jest v24 through their dependencies.
* **typescript:** TypeScript is now a peer dependency.
* **mixin:** Hops drops support for Node v8





# [12.0.0-alpha.1](https://github.com/xing/hops/compare/v11.9.1...v12.0.0-alpha.1) (2019-09-12)


### Bug Fixes

* **jest-preset:** add missing regenerator-runtime dependency ([e91272e](https://github.com/xing/hops/commit/e91272e))
* **jest-preset:** remove unneeded dependency to @types/jest ([599c650](https://github.com/xing/hops/commit/599c650))


### Features

* upgrade to jest v24 ([859b88b](https://github.com/xing/hops/commit/859b88b)), closes [#815](https://github.com/xing/hops/issues/815)
* **hops:** simplify typings ([cf646ea](https://github.com/xing/hops/commit/cf646ea))
* **postcss:** upgrade to css-loader v3 ([6e36d36](https://github.com/xing/hops/commit/6e36d36))
* **typescript:** make typescript a peer dependency ([e4ddabe](https://github.com/xing/hops/commit/e4ddabe))


### BREAKING CHANGES

* **hops:** `withConfig` and `withServerData` have a simpler type definition now. They only take one generic argument instead of three.

Co-Authored-By: Emanuel Kluge <emanuel.kluge@xing.com>
* Jest v23 is no longer supported. Applications must
provide Jest v24 through their dependencies.
* **typescript:** TypeScript is now a peer dependency.
* **postcss:** This upgrade contains two major releases of css-loader
Please check out their release notes about breaking changes and upgrade
guides:
- https://github.com/webpack-contrib/css-loader/releases/tag/v2.0.0
- https://github.com/webpack-contrib/css-loader/releases/tag/v3.0.0





# [12.0.0-alpha.0](https://github.com/xing/hops/compare/v11.9.0...v12.0.0-alpha.0) (2019-09-10)


### Bug Fixes

* update dependency http-proxy-middleware to ^0.20.0 ([8510308](https://github.com/xing/hops/commit/8510308))
* update dependency yargs to v14 ([5603ec8](https://github.com/xing/hops/commit/5603ec8))


### Features

* **postcss:** upgrade to css-loader v3 ([fa0a047](https://github.com/xing/hops/commit/fa0a047))
* **typescript:** make typescript a peer dependency ([a1bf684](https://github.com/xing/hops/commit/a1bf684))


### BREAKING CHANGES

* **typescript:** TypeScript is now a peer dependency.
* **postcss:** This upgrade contains two major releases of css-loader
Please check out their release notes about breaking changes and upgrade
guides:
- https://github.com/webpack-contrib/css-loader/releases/tag/v2.0.0
- https://github.com/webpack-contrib/css-loader/releases/tag/v3.0.0





## [11.9.1](https://github.com/xing/hops/compare/v11.9.0...v11.9.1) (2019-09-11)


### Bug Fixes

* update dependency http-proxy-middleware to ^0.20.0 ([8510308](https://github.com/xing/hops/commit/8510308))
* update dependency yargs to v14 ([5603ec8](https://github.com/xing/hops/commit/5603ec8))
* upgrade untool ([0e4c4b4](https://github.com/xing/hops/commit/0e4c4b4))





# [11.9.0](https://github.com/xing/hops/compare/v11.8.5...v11.9.0) (2019-08-12)


### Bug Fixes

* update dependency react-apollo to v3 ([7a1475a](https://github.com/xing/hops/commit/7a1475a))
* update dependency style-loader to v1 ([7b7275d](https://github.com/xing/hops/commit/7b7275d))


### Features

* upgrade untool ([bc2557e](https://github.com/xing/hops/commit/bc2557e))





## [11.8.5](https://github.com/xing/hops/compare/v11.8.4...v11.8.5) (2019-07-23)


### Bug Fixes

* upgrade untool ([719a4e3](https://github.com/xing/hops/commit/719a4e3))





## [11.8.4](https://github.com/xing/hops/compare/v11.8.3...v11.8.4) (2019-07-19)


### Bug Fixes

* update dependency mini-css-extract-plugin to ^0.8.0 ([6260eca](https://github.com/xing/hops/commit/6260eca))
* upgrade untool ([9312357](https://github.com/xing/hops/commit/9312357))





## [11.8.3](https://github.com/xing/hops/compare/v11.8.1...v11.8.3) (2019-07-12)


### Bug Fixes

* bump lodash version globally ([487f82e](https://github.com/xing/hops/commit/487f82e))
* upgrade untool ([4e85423](https://github.com/xing/hops/commit/4e85423))







**Note:** Version bump only for package hops-lerna-root





## [11.8.1](https://github.com/xing/hops/compare/v11.8.0...v11.8.1) (2019-07-02)


### Bug Fixes

* **graphql:** return error ([6e5adbc](https://github.com/xing/hops/commit/6e5adbc))
* **styled-components:** temporarily restrict babel plugin version ([b5c10da](https://github.com/xing/hops/commit/b5c10da))
* update dependency babel-plugin-styled-components to < 1.10.7 ([e448781](https://github.com/xing/hops/commit/e448781))
* **styled-components:** update min version of babel plugin dependency ([242e845](https://github.com/xing/hops/commit/242e845))
* update dependency globby to v10 ([ec83ea6](https://github.com/xing/hops/commit/ec83ea6))





# [11.8.0](https://github.com/xing/hops/compare/v11.7.1...v11.8.0) (2019-06-19)


### Bug Fixes

* add babel-core to templates to ensure it being present at top-level ([21fd923](https://github.com/xing/hops/commit/21fd923))
* **dependencies:** update dependency file-loader to v4 ([875c539](https://github.com/xing/hops/commit/875c539))
* **dependencies:** update dependency mini-css-extract-plugin to ^0.7.0 ([6860178](https://github.com/xing/hops/commit/6860178))
* **graphql:** apply PR feedback ([83e2b65](https://github.com/xing/hops/commit/83e2b65))
* **postcss:** filter conflicting order warnings ([115e220](https://github.com/xing/hops/commit/115e220)), closes [/github.com/webpack-contrib/mini-css-extract-plugin/issues/250#issuecomment-415345126](https://github.com//github.com/webpack-contrib/mini-css-extract-plugin/issues/250/issues/issuecomment-415345126)
* correct yarn.lock ([7142c57](https://github.com/xing/hops/commit/7142c57))
* rename "browsers" for autoprefixer to silence deprecation warning ([24bb948](https://github.com/xing/hops/commit/24bb948))
* upgrade untool ([577c1e1](https://github.com/xing/hops/commit/577c1e1))


### Features

* **graphql:** forward network error to the client during SSR ([7c8d271](https://github.com/xing/hops/commit/7c8d271))
* **graphql:** improve server-side GraphQL FetchError ([9614182](https://github.com/xing/hops/commit/9614182))
* **graphql:** make the error handling during SSR more generic ([eba7576](https://github.com/xing/hops/commit/eba7576))





## [11.7.1](https://github.com/xing/hops/compare/v11.7.0...v11.7.1) (2019-05-13)


### Bug Fixes

* **graphql:** avoid duplicate tree rendering ([848d394](https://github.com/xing/hops/commit/848d394))
* upgrade untool ([4e9481f](https://github.com/xing/hops/commit/4e9481f))





# [11.7.0](https://github.com/xing/hops/compare/v11.6.2...v11.7.0) (2019-05-09)


### Bug Fixes

* **dependencies:** update dependency ts-loader to v6 ([b745183](https://github.com/xing/hops/commit/b745183))
* silence eslint warnings and errors ([54c0d10](https://github.com/xing/hops/commit/54c0d10))
* **graphql:** alert on duplicate "graphql" package ([d1a615f](https://github.com/xing/hops/commit/d1a615f))
* **graphql:** silence warnings for local introspection queries ([342f02a](https://github.com/xing/hops/commit/342f02a))


### Features

* upgrade untool to include multi-threaded webpack compiler ([cebfec6](https://github.com/xing/hops/commit/cebfec6))





## [11.6.2](https://github.com/xing/hops/compare/v11.6.1...v11.6.2) (2019-05-06)


### Bug Fixes

* upgrade babel dependencies and remove obsolete object-rest-spread ([e7facba](https://github.com/xing/hops/commit/e7facba))
* **dependencies:** update dependency load-json-file to v6 ([b195f5b](https://github.com/xing/hops/commit/b195f5b))
* **dependencies:** update dependency serverless-http to v2 ([cfe2bac](https://github.com/xing/hops/commit/cfe2bac))
* **dependencies:** update dependency strip-indent to v3 ([386efbe](https://github.com/xing/hops/commit/386efbe))
* **dependencies:** update dependency write-pkg to v4 ([662fe73](https://github.com/xing/hops/commit/662fe73))
* **graphql:** allow mock schema file to be a module identifier, too ([828aac9](https://github.com/xing/hops/commit/828aac9))
* **lambda:** fallback config values to empty strings ([38a30be](https://github.com/xing/hops/commit/38a30be))
* **lambda:** make sure to print errors correctly ([f8996e7](https://github.com/xing/hops/commit/f8996e7))
* **spec:** call lambda handler as promise ([0a73258](https://github.com/xing/hops/commit/0a73258))





## [11.6.1](https://github.com/xing/hops/compare/v11.6.0...v11.6.1) (2019-04-16)


### Bug Fixes

* **dependencies:** update dependency mini-css-extract-plugin to ^0.6.0 ([6be3e6c](https://github.com/xing/hops/commit/6be3e6c))
* **development-proxy:** allow empty proxy targets in config ([8660df0](https://github.com/xing/hops/commit/8660df0))
* upgrade to latest untool release ([ba7e50c](https://github.com/xing/hops/commit/ba7e50c))
* **redux:** always add redux-thunk middlware ([900edc7](https://github.com/xing/hops/commit/900edc7))





# [11.6.0](https://github.com/xing/hops/compare/v11.5.0...v11.6.0) (2019-04-09)


### Bug Fixes

* **create-hops-app:** remove [@next](https://github.com/next) bin hack ([3949fb1](https://github.com/xing/hops/commit/3949fb1))
* **dependencies:** update dependency react-redux to v7 ([4d60114](https://github.com/xing/hops/commit/4d60114))
* **jest-preset:** correctly specify peer dependencies ([58212da](https://github.com/xing/hops/commit/58212da))
* upgrade untool to v1.5.1 ([6c09463](https://github.com/xing/hops/commit/6c09463))
* **lambda:** cacheDir should be serverDir ([021ca5a](https://github.com/xing/hops/commit/021ca5a))
* **spec:** basePath and assetPath should not contain leading slash ([8b2206a](https://github.com/xing/hops/commit/8b2206a))


### Features

* add config schema validation ([96ca9dc](https://github.com/xing/hops/commit/96ca9dc))
* implement diagnose hooks for preflight validation ([4e8f1f8](https://github.com/xing/hops/commit/4e8f1f8))
* use @untool/info for CLI output/logging ([e1f3f92](https://github.com/xing/hops/commit/e1f3f92))





# [11.5.0](https://github.com/xing/hops/compare/v11.4.1...v11.5.0) (2019-04-03)


### Bug Fixes

* **dependencies:** remove react-router-dom version range where not needed ([809b196](https://github.com/xing/hops/commit/809b196))
* **dependencies:** update dependency pretty-ms to v4 ([d2a76a0](https://github.com/xing/hops/commit/d2a76a0))
* **dependencies:** update dependency react-router-dom to v^4.3.1 || v^5 ([d5f8713](https://github.com/xing/hops/commit/d5f8713))
* **dependencies:** update dependency semver to v6 ([ad2b26d](https://github.com/xing/hops/commit/ad2b26d))
* upgrade untool to v1.5.0 ([b8d5396](https://github.com/xing/hops/commit/b8d5396))
* **redux:** fixed location object, now including search and hash, too ([4bf81d8](https://github.com/xing/hops/commit/4bf81d8))
* **redux:** import "createLocation" from "history" ([14d3d6c](https://github.com/xing/hops/commit/14d3d6c)), closes [#831](https://github.com/xing/hops/issues/831)


### Features

* **redux:** Second param "location" for action creators ([f681f79](https://github.com/xing/hops/commit/f681f79))





## [11.4.1](https://github.com/xing/hops/compare/v11.4.0...v11.4.1) (2019-03-14)


### Bug Fixes

* **graphql:** enable playground requests to include credentials ([4e65a03](https://github.com/xing/hops/commit/4e65a03))





# [11.4.0](https://github.com/xing/hops/compare/v11.3.0...v11.4.0) (2019-03-12)


### Bug Fixes

* **graphql:** only initialize Apollo server once ([0f7c501](https://github.com/xing/hops/commit/0f7c501))


### Features

* add typescript typings for runtime API in hops and hops-pwa ([5a4ad00](https://github.com/xing/hops/commit/5a4ad00)), closes [#360](https://github.com/xing/hops/issues/360)
* **graphql:** add runtime options typings ([6107325](https://github.com/xing/hops/commit/6107325))
* **graphql:** restrict mock-server to specific path ([3a68068](https://github.com/xing/hops/commit/3a68068))
* **graphql:** upgrade apollo-client to allow local resolvers ([9c9f72b](https://github.com/xing/hops/commit/9c9f72b))
* **hops:** add cli flag to analyze client bundle ([3094350](https://github.com/xing/hops/commit/3094350))
* **hops:** disable automatic browser opening on --analyze-client-bundle flag ([fec7d91](https://github.com/xing/hops/commit/fec7d91))
* **redux:** add runtime options typings ([28631e9](https://github.com/xing/hops/commit/28631e9))
* **styled-components:** add runtime options typings ([b239191](https://github.com/xing/hops/commit/b239191))





# [11.3.0](https://github.com/xing/hops/compare/v11.2.0...v11.3.0) (2019-03-07)


### Bug Fixes

* harden untool/babel plugin handling ([07d64ea](https://github.com/xing/hops/commit/07d64ea))
* **jest-preset:** expose Hops runtime in mock ([d46ace4](https://github.com/xing/hops/commit/d46ace4))


### Features

* upgrade untool to 1.2.0 ([b1b742d](https://github.com/xing/hops/commit/b1b742d))
* **jest-preset:** add babel plugin for transpiling `importComponent` ([0a816ac](https://github.com/xing/hops/commit/0a816ac))
* **jest-preset:** add mock function for `importComponent` ([7d93882](https://github.com/xing/hops/commit/7d93882))





# [11.2.0](https://github.com/xing/hops/compare/v11.2.0-rc.1...v11.2.0) (2019-02-14)


### Bug Fixes

* **create-hops-app:** fix yarn detection ([772d0af](https://github.com/xing/hops/commit/772d0af))
* **create-hops-app:** remove superfluous hops-version option ([8fe25dd](https://github.com/xing/hops/commit/8fe25dd))
* **graphql:** add react-dom as peer dependency for react-apollo ([f5d0228](https://github.com/xing/hops/commit/f5d0228))


### Features

* update dependency yargs to v13 ([0934a41](https://github.com/xing/hops/commit/0934a41))





# [11.2.0-rc.1](https://github.com/xing/hops/compare/v11.2.0-rc.0...v11.2.0-rc.1) (2019-01-24)


### Bug Fixes

* upgrade untool to v1.0.0-rc-20 ([201e8a2](https://github.com/xing/hops/commit/201e8a2))





# [11.2.0-rc.0](https://github.com/xing/hops/compare/v11.1.0...v11.2.0-rc.0) (2019-01-23)


### Bug Fixes

* **typescript:** do not compile JS files ([e09a665](https://github.com/xing/hops/commit/e09a665))
* **typescript:** pipe output of ts-loader through babel-loader ([66b5210](https://github.com/xing/hops/commit/66b5210))
* upgrade untool ([faafda2](https://github.com/xing/hops/commit/faafda2))
* upgrade untool ([afb5ccb](https://github.com/xing/hops/commit/afb5ccb))
* upgrade untool ([ec0a2f3](https://github.com/xing/hops/commit/ec0a2f3))


### Features

* **development-proxy:** allow strings for proxy object configuration ([c8e0108](https://github.com/xing/hops/commit/c8e0108))
* **development-proxy:** check for full URLs ([27001f6](https://github.com/xing/hops/commit/27001f6))
* **development-proxy:** check for XHR as well ([3d3f6f6](https://github.com/xing/hops/commit/3d3f6f6))
* **development-proxy:** warn and ignore empty targets ([35d646a](https://github.com/xing/hops/commit/35d646a))





# [11.1.0](https://github.com/xing/hops/compare/v11.0.1...v11.1.0) (2019-01-11)


### Bug Fixes

* **create-hops-app:** remove version tag from npx install success notice ([3b7883f](https://github.com/xing/hops/commit/3b7883f))
* **hops-graphql:** use NODE_ENV instead of mode ([aa39272](https://github.com/xing/hops/commit/aa39272))
* upgrade untool ([5f2561a](https://github.com/xing/hops/commit/5f2561a)), closes [#758](https://github.com/xing/hops/issues/758)
* **template-graphql:** use default browsers list ([3207d26](https://github.com/xing/hops/commit/3207d26))
* **template-react:** use default browsers list ([79e5dee](https://github.com/xing/hops/commit/79e5dee))
* **template-redux:** use default browsers list ([c7ab595](https://github.com/xing/hops/commit/c7ab595))


### Features

* **jest-preset-hops:** enable *.tsx test files ([975e536](https://github.com/xing/hops/commit/975e536))





## [11.0.1](https://github.com/xing/hops/compare/v11.0.0...v11.0.1) (2018-12-19)


### Bug Fixes

* **create-hops-app:** use user-defined version range ([e7ab8df](https://github.com/xing/hops/commit/e7ab8df))
* **development-proxy:** Use NODE_ENV instead of mode to determine if proxy should run ([465e386](https://github.com/xing/hops/commit/465e386))
* **jest-preset:** allow to use ?global for css imports ([4f59156](https://github.com/xing/hops/commit/4f59156))





# [11.0.0](https://github.com/xing/hops/compare/v11.0.0-rc.55...v11.0.0) (2018-12-13)


### Bug Fixes

* **jest-preset-hops:** Use correct runtime file in moduleNameMapper ([c9a1724](https://github.com/xing/hops/commit/c9a1724))





# [11.0.0-rc.55](https://github.com/xing/hops/compare/v11.0.0-rc.54...v11.0.0-rc.55) (2018-12-12)

**Note:** Version bump only for package hops-lerna-root





# [11.0.0-rc.54](https://github.com/xing/hops/compare/v11.0.0-rc.53...v11.0.0-rc.54) (2018-12-12)


### Bug Fixes

* **postcss:** use exportOnlyLocal flag instead of locals loader ([2721b3f](https://github.com/xing/hops/commit/2721b3f))


### Features

* **development-proxy:** add proxy mixin hooks ([4aaae00](https://github.com/xing/hops/commit/4aaae00))





# [11.0.0-rc.53](https://github.com/xing/hops/compare/v11.0.0-rc.52...v11.0.0-rc.53) (2018-12-10)


### Bug Fixes

* **create-hops-app:** exit when unpacking tar archive errors ([4f18b0d](https://github.com/xing/hops/commit/4f18b0d))
* **create-hops-app:** provide root path to deleteFiles function ([e0f1d8f](https://github.com/xing/hops/commit/e0f1d8f))





# [11.0.0-rc.52](https://github.com/xing/hops/compare/v11.0.0-rc.51...v11.0.0-rc.52) (2018-12-10)


### Bug Fixes

* upgrade untool ([53cab73](https://github.com/xing/hops/commit/53cab73))
* **jest-preset:** use correct regex for "hops" module name mapper ([7dbfac4](https://github.com/xing/hops/commit/7dbfac4))





# [11.0.0-rc.51](https://github.com/xing/hops/compare/v11.0.0-rc.50...v11.0.0-rc.51) (2018-12-10)


### Bug Fixes

* **cli:** remove global CLI ([73c2bc4](https://github.com/xing/hops/commit/73c2bc4))
* **cli:** split entries into "main", "browser" and "server" ([0a23f6e](https://github.com/xing/hops/commit/0a23f6e))
* **graphql:** increase minimum version requirements for apollo ([76fe2f6](https://github.com/xing/hops/commit/76fe2f6))
* **jest-preset:** add missing "babel-core" dependency ([6208b47](https://github.com/xing/hops/commit/6208b47))
* **jest-preset:** provide runtime mock for "hops" package ([5538829](https://github.com/xing/hops/commit/5538829))
* **react:** add missing "[@babel](https://github.com/babel)/core" dependency ([cebb37b](https://github.com/xing/hops/commit/cebb37b))
* **redux:** increase peer dependency version range for "react-redux" ([fd4e78a](https://github.com/xing/hops/commit/fd4e78a))
* **styled-components:** add "react-dom" to peer dependencies ([66495c2](https://github.com/xing/hops/commit/66495c2))
* **template-graphql:** remove unused redux, react-redux dependencies ([d2d4168](https://github.com/xing/hops/commit/d2d4168))
* change Import to importComponent ([94a1174](https://github.com/xing/hops/commit/94a1174))
* increase minimum required versions of (peer)-dependencies ([61e4197](https://github.com/xing/hops/commit/61e4197))
* make hops a dependendency instead devDependency ([0ba95e7](https://github.com/xing/hops/commit/0ba95e7))
* remove "babel-core" from template dependencies ([558e720](https://github.com/xing/hops/commit/558e720))
* use semver version ranges between all hops packages ([6816ebe](https://github.com/xing/hops/commit/6816ebe))
* **template-redux:** align integration test with new react-redux@6 ([9059240](https://github.com/xing/hops/commit/9059240))


### Features

* **cli:** move preset-defaults to CLI package and re-export hops-react ([71832ed](https://github.com/xing/hops/commit/71832ed))
* **cli:** re-export hops-mixin ([8511339](https://github.com/xing/hops/commit/8511339))





# [11.0.0-rc.50](https://github.com/xing/hops/compare/v11.0.0-rc.49...v11.0.0-rc.50) (2018-12-05)


### Bug Fixes

* update minimum peer dependency versions for react(-dom) ([0fb3884](https://github.com/xing/hops/commit/0fb3884))
* upgrade untool packages ([9be2e1e](https://github.com/xing/hops/commit/9be2e1e))





# [11.0.0-rc.49](https://github.com/xing/hops/compare/v11.0.0-rc.48...v11.0.0-rc.49) (2018-11-29)


### Bug Fixes

* **redux:** always set prefetchedOnServer member variable ([6e7d156](https://github.com/xing/hops/commit/6e7d156))


### Features

* **react:** add withConfig hoc and context ([d5c35b7](https://github.com/xing/hops/commit/d5c35b7))
* **react:** export entire ServerDataContext instead Consumer only ([1b4b8ea](https://github.com/xing/hops/commit/1b4b8ea))
* **styled-components:** enable dead code elimination ([7603cdd](https://github.com/xing/hops/commit/7603cdd))





# [11.0.0-rc.48](https://github.com/xing/hops/compare/v11.0.0-rc.47...v11.0.0-rc.48) (2018-11-23)


### Bug Fixes

* **react:** deep import react runtime components from [@untool](https://github.com/untool)/react ([f61a51f](https://github.com/xing/hops/commit/f61a51f))





# [11.0.0-rc.47](https://github.com/xing/hops/compare/v11.0.0-rc.46...v11.0.0-rc.47) (2018-11-21)


### Bug Fixes

* upgrade untool ([d20228b](https://github.com/xing/hops/commit/d20228b))
* **create-hops-app:** make yarn create work with [@next](https://github.com/next) tagged version ([3727ffb](https://github.com/xing/hops/commit/3727ffb))
* **graphql:** lazily instantiate client to free up bootstrap hook ([4cf2713](https://github.com/xing/hops/commit/4cf2713))
* **template-graphql:** change browserlist to be an array ([bd81daf](https://github.com/xing/hops/commit/bd81daf))
* **template-react:** change browserlist to be an array ([4b42b6e](https://github.com/xing/hops/commit/4b42b6e))
* **template-redux:** change browserlist to be an array ([1e9e81e](https://github.com/xing/hops/commit/1e9e81e))


### Features

* **graphql:** make graphql mock server path configurable ([66e10c4](https://github.com/xing/hops/commit/66e10c4))





# [11.0.0-rc.46](https://github.com/xing/hops/compare/v11.0.0-rc.45...v11.0.0-rc.46) (2018-11-15)


### Bug Fixes

* upgrade untool ([11c2de5](https://github.com/xing/hops/commit/11c2de5))





# [11.0.0-rc.45](https://github.com/xing/hops/compare/v11.0.0-rc.44...v11.0.0-rc.45) (2018-11-15)


### Bug Fixes

* **graphql:** align exists check and resolve algo for graphqlMockSchemaFile ([36dbd4c](https://github.com/xing/hops/commit/36dbd4c))
* **graphql:** prefer polyfill over ponyfill ([93b23bb](https://github.com/xing/hops/commit/93b23bb))
* **postcss:** re-introduce global CSS support ([76edda9](https://github.com/xing/hops/commit/76edda9))





# [11.0.0-rc.44](https://github.com/xing/hops/compare/v11.0.0-rc.43...v11.0.0-rc.44) (2018-10-24)


### Bug Fixes

* upgrade untool to rc.8 ([77d6f96](https://github.com/xing/hops/commit/77d6f96))





# [11.0.0-rc.43](https://github.com/xing/hops/compare/v11.0.0-rc.42...v11.0.0-rc.43) (2018-10-23)


### Bug Fixes

* **react:** add missing dependency ([5420bd0](https://github.com/xing/hops/commit/5420bd0))





# [11.0.0-rc.42](https://github.com/xing/hops/compare/v11.0.0-rc.41...v11.0.0-rc.42) (2018-10-23)


### Bug Fixes

* **graphql:** allow CORS for credentials include ([b209f8d](https://github.com/xing/hops/commit/b209f8d))


### Features

* **graphql:** ensure mock schema is usable in mock-server and app too ([894999e](https://github.com/xing/hops/commit/894999e))
* **graphql:** ensure mock-server is only being used in development ([33ee7d4](https://github.com/xing/hops/commit/33ee7d4))





# [11.0.0-rc.41](https://github.com/xing/hops/compare/v11.0.0-rc.40...v11.0.0-rc.41) (2018-10-17)


### Bug Fixes

* upgrade untool to 1.0.0-rc.4 ([3bdc48d](https://github.com/xing/hops/commit/3bdc48d))
* **lambda:** update globby to version 8.0.0 ([38f75a3](https://github.com/xing/hops/commit/38f75a3))


### Features

* **cli:** log webpack errors and warnings in watch mode to terminal ([a0aa1fc](https://github.com/xing/hops/commit/a0aa1fc))





# [11.0.0-rc.40](https://github.com/xing/hops/compare/v11.0.0-rc.39...v11.0.0-rc.40) (2018-10-15)


### Bug Fixes

* adapt to new untool exports and config loader ([ea86491](https://github.com/xing/hops/commit/ea86491))
* remove superfluous react-router dependency ([f9970ba](https://github.com/xing/hops/commit/f9970ba))
* **lambda:** use trimSlashes from untool/express package ([f3f002e](https://github.com/xing/hops/commit/f3f002e))
* **pwa:** don't break source-maps when adding HOPS_ASSETS to sw.js ([3ef63ef](https://github.com/xing/hops/commit/3ef63ef))





<a name="11.0.0-rc.39"></a>
# [11.0.0-rc.39](https://github.com/xing/hops/compare/v11.0.0-rc.38...v11.0.0-rc.39) (2018-10-10)


### Bug Fixes

* correct CORS headers for graphql mock server ([390f7c5](https://github.com/xing/hops/commit/390f7c5))
* **config:** pass required arguments to `getConfig` calls ([d699f32](https://github.com/xing/hops/commit/d699f32))
* **create-hops-app:** update package version ([67f9a07](https://github.com/xing/hops/commit/67f9a07))
* **lambda:** ensure awsConfig and exclude pattern are of correct type ([a160706](https://github.com/xing/hops/commit/a160706))
* **lambda:** use correct variable name for hops config ([0f13050](https://github.com/xing/hops/commit/0f13050))
* **lambda:** use process.version if hopsConfig.node = "current" ([ad37372](https://github.com/xing/hops/commit/ad37372))


### Features

* **create-hops-app:** init package ([cf02570](https://github.com/xing/hops/commit/cf02570))
* **template-minimal:** remove template as we consider hops react specific ([aa8a359](https://github.com/xing/hops/commit/aa8a359))
* remove usage of hops-template-minimal ([dc241a2](https://github.com/xing/hops/commit/dc241a2))





<a name="11.0.0-rc.38"></a>
# [11.0.0-rc.38](https://github.com/xing/hops/compare/v11.0.0-rc.37...v11.0.0-rc.38) (2018-10-05)


### Bug Fixes

* **cli:** add missing [@untool](https://github.com/untool)/yargs ([b23a7b1](https://github.com/xing/hops/commit/b23a7b1))
* **lambda:** always include serverDir in bundle ([a837e3f](https://github.com/xing/hops/commit/a837e3f))





<a name="11.0.0-rc.37"></a>
# [11.0.0-rc.37](https://github.com/xing/hops/compare/v11.0.0-rc.36...v11.0.0-rc.37) (2018-09-27)


### Bug Fixes

* upgrade [@untool](https://github.com/untool)/webpack ([6f5cb04](https://github.com/xing/hops/commit/6f5cb04))


### Features

* **cli:** use untools CLI mixin to print build stats and server status ([3303eaf](https://github.com/xing/hops/commit/3303eaf))





<a name="11.0.0-rc.36"></a>
# [11.0.0-rc.36](https://github.com/xing/hops/compare/v11.0.0-rc.35...v11.0.0-rc.36) (2018-09-26)


### Bug Fixes

* upgrade untool ([622af7b](https://github.com/xing/hops/commit/622af7b))
* upgrade untool ([3528c49](https://github.com/xing/hops/commit/3528c49))
* **react:** configure untool import babel plugin to work with hops ([f16a9ef](https://github.com/xing/hops/commit/f16a9ef))


### Features

* **react:** re-export Import component from untool ([7c4b527](https://github.com/xing/hops/commit/7c4b527))
* **typescript:** don't transpile modules, allow commonjs interop ([7d18bbf](https://github.com/xing/hops/commit/7d18bbf))





<a name="11.0.0-rc.35"></a>
# [11.0.0-rc.35](https://github.com/xing/hops/compare/v11.0.0-rc.34...v11.0.0-rc.35) (2018-09-13)


### Bug Fixes

* **graphql:** correctly read fragment types and cache them in memory ([a7efa1d](https://github.com/xing/hops/commit/a7efa1d))
* **graphql:** do not call mixin methods inside constructor ([a0af0dd](https://github.com/xing/hops/commit/a0af0dd)), closes [#619](https://github.com/xing/hops/issues/619)


### Features

* **graphql:** add GraphQL mock server functionality ([2acc7a7](https://github.com/xing/hops/commit/2acc7a7))
* **graphql:** Introduce getApolloCache hook ([42dd091](https://github.com/xing/hops/commit/42dd091))





<a name="11.0.0-rc.34"></a>
# [11.0.0-rc.34](https://github.com/xing/hops/compare/v11.0.0-rc.33...v11.0.0-rc.34) (2018-09-10)


### Bug Fixes

* **jest-preset-hops:** Add missing flow preset ([7e86580](https://github.com/xing/hops/commit/7e86580))
* **react:** Ensure flow babel plugin runs before class properties plugin ([7414299](https://github.com/xing/hops/commit/7414299))
* upgrade untool packages ([24532f4](https://github.com/xing/hops/commit/24532f4))





<a name="11.0.0-rc.33"></a>
# [11.0.0-rc.33](https://github.com/xing/hops/compare/v11.0.0-rc.32...v11.0.0-rc.33) (2018-09-06)


### Bug Fixes

* **jest-preset:** revert to ts-jest instead of babel preset typescript ([726e1d1](https://github.com/xing/hops/commit/726e1d1))
* **typescript:** revert to ts-loader and typescript instead of babel ([7d74883](https://github.com/xing/hops/commit/7d74883)), closes [/github.com/xing/hops/pull/613#issuecomment-418701043](https://github.com//github.com/xing/hops/pull/613/issues/issuecomment-418701043) [babel/babel#7749](https://github.com/babel/babel/issues/7749) [babel/babel#8361](https://github.com/babel/babel/issues/8361)
* upgrade untool ([3248493](https://github.com/xing/hops/commit/3248493))





<a name="11.0.0-rc.32"></a>
# [11.0.0-rc.32](https://github.com/xing/hops/compare/v11.0.0-rc.31...v11.0.0-rc.32) (2018-09-04)


### Bug Fixes

* **cli:** print getting started message based on availability of CLI ([f4c88b8](https://github.com/xing/hops/commit/f4c88b8))
* **graphql:** IRQD <> IQRD - rename to APOLLO_FRAGMENT_TYPES ([4b40d57](https://github.com/xing/hops/commit/4b40d57))
* **jest-preset:** adjust to babel v7 ([538937d](https://github.com/xing/hops/commit/538937d))
* **jest-preset:** use babel typescript preset ([3cab0ea](https://github.com/xing/hops/commit/3cab0ea))
* **jest-preset-hops:** upgrade packages to babel v7 ([eac9f0a](https://github.com/xing/hops/commit/eac9f0a))
* **lambda:** ensure to only strip slashes from basePath ([2384d49](https://github.com/xing/hops/commit/2384d49)), closes [#608](https://github.com/xing/hops/issues/608)
* **pwa:** remove babel-polyfill as it is not needed anymore with babel7 ([7925682](https://github.com/xing/hops/commit/7925682))
* **react:** upgrade babel plugins to v7 ([701b5f0](https://github.com/xing/hops/commit/701b5f0))
* **styled-components:** downgrade babel plugin to circumvent regression ([4e2d325](https://github.com/xing/hops/commit/4e2d325))
* **test:** Replace ncp package by fs-extra ([f6afebb](https://github.com/xing/hops/commit/f6afebb))
* **typescript:** use babel 7 typescript preset ([92c228e](https://github.com/xing/hops/commit/92c228e))
* add babel-core@7 bridge to fix jest tests ([cdc9870](https://github.com/xing/hops/commit/cdc9870))
* upgrade to untool@0.18 ([5364ac5](https://github.com/xing/hops/commit/5364ac5))





<a name="11.0.0-rc.31"></a>
# [11.0.0-rc.31](https://github.com/xing/hops/compare/v11.0.0-rc.30...v11.0.0-rc.31) (2018-08-31)


### Bug Fixes

* **redux:** Do not dispatch actions in bootstrap hook to avoid clashes ([e97a52c](https://github.com/xing/hops/commit/e97a52c))


### Features

* **spec:** add debug output for integration tests ([1cf04e4](https://github.com/xing/hops/commit/1cf04e4))





<a name="11.0.0-rc.30"></a>
# [11.0.0-rc.30](https://github.com/xing/hops/compare/v11.0.0-rc.29...v11.0.0-rc.30) (2018-08-23)


### Bug Fixes

* **graphql:** operation name support for introspection query ([4935b1b](https://github.com/xing/hops/commit/4935b1b))
* **postcss:** do not output custom properties in resulting css ([981e413](https://github.com/xing/hops/commit/981e413))
* upgrade [@untool](https://github.com/untool)/webpack ([ea4986c](https://github.com/xing/hops/commit/ea4986c))


### Features

* **pwa:** allow browserconfig.xml as application manifest ([03c9090](https://github.com/xing/hops/commit/03c9090))





<a name="11.0.0-rc.29"></a>
# [11.0.0-rc.29](https://github.com/xing/hops/compare/v11.0.0-rc.28...v11.0.0-rc.29) (2018-08-21)


### Bug Fixes

* npm serve command missing ([3d360ba](https://github.com/xing/hops/commit/3d360ba))





<a name="11.0.0-rc.28"></a>
# [11.0.0-rc.28](https://github.com/xing/hops/compare/v11.0.0-rc.27...v11.0.0-rc.28) (2018-08-15)

**Note:** Version bump only for package hops-lerna-root





<a name="11.0.0-rc.27"></a>
# [11.0.0-rc.27](https://github.com/xing/hops/compare/v11.0.0-rc.26...v11.0.0-rc.27) (2018-08-06)


### Bug Fixes

* **jest-preset:** explicitly set testURL to fix jsdom localstorage issue ([94e86a4](https://github.com/xing/hops/commit/94e86a4))
* do not resolve "module" field in package.json ([32b30a3](https://github.com/xing/hops/commit/32b30a3))
* **webpack:** remove es-module workaround from Hops ([e371989](https://github.com/xing/hops/commit/e371989))




<a name="11.0.0-rc.26"></a>
# [11.0.0-rc.26](https://github.com/xing/hops/compare/v10.4.6...v11.0.0-rc.26) (2018-08-01)


### Bug Fixes

* **config:** add missing browser.js to package ([29f7297](https://github.com/xing/hops/commit/29f7297))
* **config:** environmentalize config ([86f9418](https://github.com/xing/hops/commit/86f9418))
* **config:** replace env placeholders with environment variables ([fbe0cda](https://github.com/xing/hops/commit/fbe0cda))
* **config:** use aliased config when building for browser env ([2e9251c](https://github.com/xing/hops/commit/2e9251c))
* **express:** also detect ipv6 bind-all and loopback as localhost ([fce2f75](https://github.com/xing/hops/commit/fce2f75))
* **express:** resolve circular dependency ([88b30aa](https://github.com/xing/hops/commit/88b30aa))
* **express:** return app in configureServer hook ([8ab939a](https://github.com/xing/hops/commit/8ab939a))
* **graphql:** pass apollo state to getTemplateData.globals ([9cf55a3](https://github.com/xing/hops/commit/9cf55a3))
* **lambda:** include missing preset.js in released package ([5c302ae](https://github.com/xing/hops/commit/5c302ae))
* **postcss:**  fix prefixes in dev and prod being different ([8f06882](https://github.com/xing/hops/commit/8f06882))
* **postcss:** add missing postcss features that were supported before ([0bc47a0](https://github.com/xing/hops/commit/0bc47a0))
* **pwa:** include babel polyfill and use config from [@untool](https://github.com/untool)/config ([1da3d08](https://github.com/xing/hops/commit/1da3d08))
* **pwa:** worker function receives both config and assets as arguments ([7c2fb24](https://github.com/xing/hops/commit/7c2fb24))
* **react:** add missing fetch folder to files ([514cebe](https://github.com/xing/hops/commit/514cebe))
* **react:** add missing files to package.json ([5436625](https://github.com/xing/hops/commit/5436625))
* **react:** do not fail if _hopsEnvironmentVariables is not defined ([136f464](https://github.com/xing/hops/commit/136f464))
* **react:** do not set shouldPrefetchOnServer from config ([25db2cd](https://github.com/xing/hops/commit/25db2cd))
* **react:** try to acess env var on `process.env` first ([0f5ff29](https://github.com/xing/hops/commit/0f5ff29))
* **redux:** add missing actionCreatorDispatcher files to package ([160e8df](https://github.com/xing/hops/commit/160e8df))
* **redux:** fix typo when accessing config ([b564831](https://github.com/xing/hops/commit/b564831))
* **redux:** specify esnext field to transpile code ([3ddd057](https://github.com/xing/hops/commit/3ddd057))
* **spec:** ignore case of stdout output ([68a0c81](https://github.com/xing/hops/commit/68a0c81))
* **template-minimal:** adapt to new render method signature ([4c1c8a8](https://github.com/xing/hops/commit/4c1c8a8))
* add serve command to scripts ([b6a822a](https://github.com/xing/hops/commit/b6a822a))
* do not use nested css as it is not supported anymore ([dda2115](https://github.com/xing/hops/commit/dda2115))
* upgrade dependencies ([b61e8eb](https://github.com/xing/hops/commit/b61e8eb))
* upgrade untool packages ([39fd3e1](https://github.com/xing/hops/commit/39fd3e1))
* **template-react:** remove env variable access to fix tests ([bad05df](https://github.com/xing/hops/commit/bad05df))
* use renamed getTemplateData hook in favor of enhanceData ([3577cf7](https://github.com/xing/hops/commit/3577cf7))
* Use renamed untool getConfigAndMixins function ([0304f8e](https://github.com/xing/hops/commit/0304f8e))


### Chores

* specify engines as >=8.10 in all packages ([1b7a1d2](https://github.com/xing/hops/commit/1b7a1d2))


### Code Refactoring

* **graphql:** namespace render options ([cb92adb](https://github.com/xing/hops/commit/cb92adb))
* **redux:** namespace render options ([17f3e3c](https://github.com/xing/hops/commit/17f3e3c))


### Features

* **apollo:** introduce configureFetch hook ([26a5f9f](https://github.com/xing/hops/commit/26a5f9f))
* **cli:** add dotenv support ([32d717e](https://github.com/xing/hops/commit/32d717e))
* **cli:** remove dotenv again as it is now part of untool ([92f6417](https://github.com/xing/hops/commit/92f6417))
* **config:** export config through "hops-config" ([6d23fc7](https://github.com/xing/hops/commit/6d23fc7))
* **development-proxy:** add development proxy ([7ee5ec3](https://github.com/xing/hops/commit/7ee5ec3))
* **express:** enable gzip compression when serving in production mode ([d2ab160](https://github.com/xing/hops/commit/d2ab160))
* **express:** implement hops-express package to customize server ([bf757e3](https://github.com/xing/hops/commit/bf757e3))
* **graphql:** add overridable getApolloLink hook ([e0b204a](https://github.com/xing/hops/commit/e0b204a))
* **graphql:** implement "shouldPrefetchOnServer" hook/preset option ([5a3cad5](https://github.com/xing/hops/commit/5a3cad5))
* **graphql:** remove configureFetch hook ([7bf732d](https://github.com/xing/hops/commit/7bf732d))
* **graphql:** remove usage of instrumanted fetch ([f20fd19](https://github.com/xing/hops/commit/f20fd19))
* **graphql:** use shouldPrefetchOnServer to enable prefetching of data ([be550ac](https://github.com/xing/hops/commit/be550ac))
* **hops-mixin:** add package ([26c2a90](https://github.com/xing/hops/commit/26c2a90))
* **jest-preset:** add typescript support ([b021437](https://github.com/xing/hops/commit/b021437))
* **postcss:** implement postcss package ([6091ed7](https://github.com/xing/hops/commit/6091ed7))
* **preset-defaults:** move default presets into separate package ([722f67c](https://github.com/xing/hops/commit/722f67c))
* **pwa:** allow service worker registration on all local interfaces ([b7c17fa](https://github.com/xing/hops/commit/b7c17fa))
* **pwa:** implement hops-pwa as mixin ([2300c03](https://github.com/xing/hops/commit/2300c03))
* **react:** add configureFetch and fetch hooks ([43528bb](https://github.com/xing/hops/commit/43528bb))
* **react:** add server data HOC ([15609e8](https://github.com/xing/hops/commit/15609e8))
* **react:** implement server components ([53f3cfb](https://github.com/xing/hops/commit/53f3cfb))
* **react:** make getServerData available to mixins ([90d23e9](https://github.com/xing/hops/commit/90d23e9))
* **react:** pass CLI arguments to runtime mixins / React HoC ([e9ed1df](https://github.com/xing/hops/commit/e9ed1df))
* **react:** pass environment variables to React HoC ([8d7e14a](https://github.com/xing/hops/commit/8d7e14a))
* **react:** remove fetch hooks ([cd09dc7](https://github.com/xing/hops/commit/cd09dc7))
* **react:** remove withCLIArguments ([4b4aea2](https://github.com/xing/hops/commit/4b4aea2))
* **react:** set res.locals.shouldPrefetchOnServer based on config ([d4f76e4](https://github.com/xing/hops/commit/d4f76e4))
* **redux:** add action creator dispatcher mixin ([e3beb52](https://github.com/xing/hops/commit/e3beb52))
* **redux:** add config as argument to thunk ([c84cfb0](https://github.com/xing/hops/commit/c84cfb0))
* **redux:** add fetch to thunks ([fa9d8f9](https://github.com/xing/hops/commit/fa9d8f9))
* **redux:** add overridable getReduxMiddlewares hook ([7370d3d](https://github.com/xing/hops/commit/7370d3d))
* **redux:** expose getReduxStore hook ([e847c9e](https://github.com/xing/hops/commit/e847c9e))
* **redux:** implement "shouldPrefetchOnServer" hook/preset option ([b8b2e45](https://github.com/xing/hops/commit/b8b2e45))
* **redux:** remove configureFetch hook ([a222c49](https://github.com/xing/hops/commit/a222c49))
* **redux:** remove fetch from thunks ([4dd5c37](https://github.com/xing/hops/commit/4dd5c37))
* **redux:** use shouldPrefetchOnServer instead of _hopsStatic ([4f7361e](https://github.com/xing/hops/commit/4f7361e))
* **spec:** execute integration test in copied fixture folder ([fe7a132](https://github.com/xing/hops/commit/fe7a132))
* **spec:** execute integration test in copied fixture folder ([3b014a1](https://github.com/xing/hops/commit/3b014a1))
* **styled-components:** introduce package ([d79c69a](https://github.com/xing/hops/commit/d79c69a))
* **template-redux:** introduce react/redux template ([79de06f](https://github.com/xing/hops/commit/79de06f))
* **typescript:** introduce package ([0261e70](https://github.com/xing/hops/commit/0261e70))
* **typescript:** provide minimal default tsconfig.json ([515daa1](https://github.com/xing/hops/commit/515daa1))
* **webpack:** print compilation stats and watch runs ([318afcf](https://github.com/xing/hops/commit/318afcf))


### BREAKING CHANGES

* **redux:** redux specific options are now namespaced
If you want to pass options to the hops-redux package you need to pass
them to the render function inside a `redux` key:
**Before:**
```javascript
render(<MyApp />, { reducers: {...} });
```
**After:**
```javascript
render(<MyApp />, { redux: { reducers: {...}  } });
```
* **graphql:** graphql specific options are now namespaced
If you want to pass options to the hops-graphql package you need to pass
them to the render function inside a `graphql` key:
**Before:**
```javascript
render(<MyApp />, { link: new Link() });
```
**After:**
```javascript
render(<MyApp />, { graphql: { link: new Link() } });
```
* Increase minimum required Node.js version from 6 to 8
This commit specifies Node.js 8.10 as minimum required version in all
packages.




<a name="11.0.0-rc.25"></a>
# [11.0.0-rc.25](https://github.com/xing/hops/compare/v10.4.6...v11.0.0-rc.25) (2018-07-31)


### Bug Fixes

* **config:** add missing browser.js to package ([29f7297](https://github.com/xing/hops/commit/29f7297))
* **config:** environmentalize config ([86f9418](https://github.com/xing/hops/commit/86f9418))
* **config:** replace env placeholders with environment variables ([fbe0cda](https://github.com/xing/hops/commit/fbe0cda))
* **config:** use aliased config when building for browser env ([2e9251c](https://github.com/xing/hops/commit/2e9251c))
* **express:** also detect ipv6 bind-all and loopback as localhost ([fce2f75](https://github.com/xing/hops/commit/fce2f75))
* **express:** resolve circular dependency ([88b30aa](https://github.com/xing/hops/commit/88b30aa))
* **express:** return app in configureServer hook ([8ab939a](https://github.com/xing/hops/commit/8ab939a))
* **graphql:** pass apollo state to getTemplateData.globals ([9cf55a3](https://github.com/xing/hops/commit/9cf55a3))
* **lambda:** include missing preset.js in released package ([5c302ae](https://github.com/xing/hops/commit/5c302ae))
* **postcss:**  fix prefixes in dev and prod being different ([8f06882](https://github.com/xing/hops/commit/8f06882))
* **postcss:** add missing postcss features that were supported before ([0bc47a0](https://github.com/xing/hops/commit/0bc47a0))
* **pwa:** include babel polyfill and use config from [@untool](https://github.com/untool)/config ([1da3d08](https://github.com/xing/hops/commit/1da3d08))
* **pwa:** worker function receives both config and assets as arguments ([7c2fb24](https://github.com/xing/hops/commit/7c2fb24))
* **react:** add missing fetch folder to files ([514cebe](https://github.com/xing/hops/commit/514cebe))
* **react:** add missing files to package.json ([5436625](https://github.com/xing/hops/commit/5436625))
* **react:** do not fail if _hopsEnvironmentVariables is not defined ([136f464](https://github.com/xing/hops/commit/136f464))
* **react:** do not set shouldPrefetchOnServer from config ([25db2cd](https://github.com/xing/hops/commit/25db2cd))
* **react:** try to acess env var on `process.env` first ([0f5ff29](https://github.com/xing/hops/commit/0f5ff29))
* **redux:** add missing actionCreatorDispatcher files to package ([160e8df](https://github.com/xing/hops/commit/160e8df))
* **redux:** fix typo when accessing config ([b564831](https://github.com/xing/hops/commit/b564831))
* **redux:** specify esnext field to transpile code ([3ddd057](https://github.com/xing/hops/commit/3ddd057))
* **spec:** ignore case of stdout output ([68a0c81](https://github.com/xing/hops/commit/68a0c81))
* **template-minimal:** adapt to new render method signature ([4c1c8a8](https://github.com/xing/hops/commit/4c1c8a8))
* add serve command to scripts ([b6a822a](https://github.com/xing/hops/commit/b6a822a))
* do not use nested css as it is not supported anymore ([dda2115](https://github.com/xing/hops/commit/dda2115))
* upgrade dependencies ([b61e8eb](https://github.com/xing/hops/commit/b61e8eb))
* upgrade untool packages ([39fd3e1](https://github.com/xing/hops/commit/39fd3e1))
* **template-react:** remove env variable access to fix tests ([bad05df](https://github.com/xing/hops/commit/bad05df))
* use renamed getTemplateData hook in favor of enhanceData ([3577cf7](https://github.com/xing/hops/commit/3577cf7))
* Use renamed untool getConfigAndMixins function ([0304f8e](https://github.com/xing/hops/commit/0304f8e))


### Chores

* specify engines as >=8.10 in all packages ([1b7a1d2](https://github.com/xing/hops/commit/1b7a1d2))


### Code Refactoring

* **graphql:** namespace render options ([cb92adb](https://github.com/xing/hops/commit/cb92adb))
* **redux:** namespace render options ([17f3e3c](https://github.com/xing/hops/commit/17f3e3c))


### Features

* **apollo:** introduce configureFetch hook ([26a5f9f](https://github.com/xing/hops/commit/26a5f9f))
* **cli:** add dotenv support ([32d717e](https://github.com/xing/hops/commit/32d717e))
* **cli:** remove dotenv again as it is now part of untool ([92f6417](https://github.com/xing/hops/commit/92f6417))
* **config:** export config through "hops-config" ([6d23fc7](https://github.com/xing/hops/commit/6d23fc7))
* **development-proxy:** add development proxy ([7ee5ec3](https://github.com/xing/hops/commit/7ee5ec3))
* **express:** enable gzip compression when serving in production mode ([d2ab160](https://github.com/xing/hops/commit/d2ab160))
* **express:** implement hops-express package to customize server ([bf757e3](https://github.com/xing/hops/commit/bf757e3))
* **graphql:** add overridable getApolloLink hook ([e0b204a](https://github.com/xing/hops/commit/e0b204a))
* **graphql:** implement "shouldPrefetchOnServer" hook/preset option ([5a3cad5](https://github.com/xing/hops/commit/5a3cad5))
* **graphql:** remove configureFetch hook ([7bf732d](https://github.com/xing/hops/commit/7bf732d))
* **graphql:** use shouldPrefetchOnServer to enable prefetching of data ([be550ac](https://github.com/xing/hops/commit/be550ac))
* **hops-mixin:** add package ([26c2a90](https://github.com/xing/hops/commit/26c2a90))
* **jest-preset:** add typescript support ([b021437](https://github.com/xing/hops/commit/b021437))
* **postcss:** implement postcss package ([6091ed7](https://github.com/xing/hops/commit/6091ed7))
* **preset-defaults:** move default presets into separate package ([722f67c](https://github.com/xing/hops/commit/722f67c))
* **pwa:** allow service worker registration on all local interfaces ([b7c17fa](https://github.com/xing/hops/commit/b7c17fa))
* **pwa:** implement hops-pwa as mixin ([2300c03](https://github.com/xing/hops/commit/2300c03))
* **react:** add configureFetch and fetch hooks ([43528bb](https://github.com/xing/hops/commit/43528bb))
* **react:** add server data HOC ([15609e8](https://github.com/xing/hops/commit/15609e8))
* **react:** implement server components ([53f3cfb](https://github.com/xing/hops/commit/53f3cfb))
* **react:** make getServerData available to mixins ([90d23e9](https://github.com/xing/hops/commit/90d23e9))
* **react:** pass CLI arguments to runtime mixins / React HoC ([e9ed1df](https://github.com/xing/hops/commit/e9ed1df))
* **react:** pass environment variables to React HoC ([8d7e14a](https://github.com/xing/hops/commit/8d7e14a))
* **react:** remove withCLIArguments ([4b4aea2](https://github.com/xing/hops/commit/4b4aea2))
* **react:** set res.locals.shouldPrefetchOnServer based on config ([d4f76e4](https://github.com/xing/hops/commit/d4f76e4))
* **redux:** add action creator dispatcher mixin ([e3beb52](https://github.com/xing/hops/commit/e3beb52))
* **redux:** add fetch to thunks ([fa9d8f9](https://github.com/xing/hops/commit/fa9d8f9))
* **redux:** add overridable getReduxMiddlewares hook ([7370d3d](https://github.com/xing/hops/commit/7370d3d))
* **redux:** expose getReduxStore hook ([e847c9e](https://github.com/xing/hops/commit/e847c9e))
* **redux:** implement "shouldPrefetchOnServer" hook/preset option ([b8b2e45](https://github.com/xing/hops/commit/b8b2e45))
* **redux:** remove configureFetch hook ([a222c49](https://github.com/xing/hops/commit/a222c49))
* **redux:** use shouldPrefetchOnServer instead of _hopsStatic ([4f7361e](https://github.com/xing/hops/commit/4f7361e))
* **spec:** execute integration test in copied fixture folder ([fe7a132](https://github.com/xing/hops/commit/fe7a132))
* **spec:** execute integration test in copied fixture folder ([3b014a1](https://github.com/xing/hops/commit/3b014a1))
* **styled-components:** introduce package ([d79c69a](https://github.com/xing/hops/commit/d79c69a))
* **template-redux:** introduce react/redux template ([79de06f](https://github.com/xing/hops/commit/79de06f))
* **typescript:** introduce package ([0261e70](https://github.com/xing/hops/commit/0261e70))
* **typescript:** provide minimal default tsconfig.json ([515daa1](https://github.com/xing/hops/commit/515daa1))
* **webpack:** print compilation stats and watch runs ([318afcf](https://github.com/xing/hops/commit/318afcf))


### BREAKING CHANGES

* **redux:** redux specific options are now namespaced
If you want to pass options to the hops-redux package you need to pass
them to the render function inside a `redux` key:
**Before:**
```javascript
render(<MyApp />, { reducers: {...} });
```
**After:**
```javascript
render(<MyApp />, { redux: { reducers: {...}  } });
```
* **graphql:** graphql specific options are now namespaced
If you want to pass options to the hops-graphql package you need to pass
them to the render function inside a `graphql` key:
**Before:**
```javascript
render(<MyApp />, { link: new Link() });
```
**After:**
```javascript
render(<MyApp />, { graphql: { link: new Link() } });
```
* Increase minimum required Node.js version from 6 to 8
This commit specifies Node.js 8.10 as minimum required version in all
packages.




<a name="11.0.0-rc.24"></a>
# [11.0.0-rc.24](https://github.com/xing/hops/compare/v11.0.0-rc.23...v11.0.0-rc.24) (2018-07-26)


### Bug Fixes

* **react:** add missing fetch folder to files ([db166b0](https://github.com/xing/hops/commit/db166b0))




<a name="11.0.0-rc.23"></a>
# [11.0.0-rc.23](https://github.com/xing/hops/compare/v11.0.0-rc.22...v11.0.0-rc.23) (2018-07-26)


### Bug Fixes

* upgrade untool packages ([1bd0829](https://github.com/xing/hops/commit/1bd0829))


### Features

* **development-proxy:** add development proxy ([49a328f](https://github.com/xing/hops/commit/49a328f))
* **graphql:** implement "shouldPrefetchOnServer" hook/preset option ([dd06697](https://github.com/xing/hops/commit/dd06697))
* **graphql:** remove configureFetch hook ([73119c6](https://github.com/xing/hops/commit/73119c6))
* **react:** add configureFetch and fetch hooks ([ef07294](https://github.com/xing/hops/commit/ef07294))
* **redux:** implement "shouldPrefetchOnServer" hook/preset option ([960c8e9](https://github.com/xing/hops/commit/960c8e9))
* **redux:** remove configureFetch hook ([79262c4](https://github.com/xing/hops/commit/79262c4))
* **spec:** execute integration test in copied fixture folder ([ac6ab05](https://github.com/xing/hops/commit/ac6ab05))




<a name="11.0.0-rc.22"></a>
# [11.0.0-rc.22](https://github.com/xing/hops/compare/v11.0.0-rc.21...v11.0.0-rc.22) (2018-07-25)


### Bug Fixes

* upgrade dependencies ([e92e305](https://github.com/xing/hops/commit/e92e305))


### Features

* **jest-preset:** add typescript support ([152a936](https://github.com/xing/hops/commit/152a936))
* **react:** make getServerData available to mixins ([1769199](https://github.com/xing/hops/commit/1769199))
* **spec:** execute integration test in copied fixture folder ([5b7690e](https://github.com/xing/hops/commit/5b7690e))




<a name="11.0.0-rc.21"></a>
# [11.0.0-rc.21](https://github.com/xing/hops/compare/v11.0.0-rc.20...v11.0.0-rc.21) (2018-07-20)


### Features

* **apollo:** introduce configureFetch hook ([ebe9f9b](https://github.com/xing/hops/commit/ebe9f9b))




<a name="11.0.0-rc.20"></a>
# [11.0.0-rc.20](https://github.com/xing/hops/compare/v11.0.0-rc.19...v11.0.0-rc.20) (2018-07-19)


### Features

* **redux:** add fetch to thunks ([3d6a5f2](https://github.com/xing/hops/commit/3d6a5f2))




<a name="11.0.0-rc.19"></a>
# [11.0.0-rc.19](https://github.com/xing/hops/compare/v10.4.6...v11.0.0-rc.19) (2018-07-19)


### Bug Fixes

* **config:** add missing browser.js to package ([7796873](https://github.com/xing/hops/commit/7796873))
* **config:** environmentalize config ([787f9cc](https://github.com/xing/hops/commit/787f9cc))
* **config:** replace env placeholders with environment variables ([e79c40b](https://github.com/xing/hops/commit/e79c40b))
* **config:** use aliased config when building for browser env ([9fab161](https://github.com/xing/hops/commit/9fab161))
* **express:** also detect ipv6 bind-all and loopback as localhost ([3890c9b](https://github.com/xing/hops/commit/3890c9b))
* **express:** resolve circular dependency ([01b48ef](https://github.com/xing/hops/commit/01b48ef))
* **express:** return app in configureServer hook ([64fbd80](https://github.com/xing/hops/commit/64fbd80))
* **graphql:** pass apollo state to getTemplateData.globals ([ed64cef](https://github.com/xing/hops/commit/ed64cef))
* **lambda:** include missing preset.js in released package ([fcada97](https://github.com/xing/hops/commit/fcada97))
* **postcss:**  fix prefixes in dev and prod being different ([7bc95d7](https://github.com/xing/hops/commit/7bc95d7))
* **postcss:** add missing postcss features that were supported before ([c65a1f4](https://github.com/xing/hops/commit/c65a1f4))
* **pwa:** include babel polyfill and use config from [@untool](https://github.com/untool)/config ([c540dd8](https://github.com/xing/hops/commit/c540dd8))
* **pwa:** worker function receives both config and assets as arguments ([b1f3276](https://github.com/xing/hops/commit/b1f3276))
* **react:** add missing files to package.json ([34a4208](https://github.com/xing/hops/commit/34a4208))
* **react:** do not fail if _hopsEnvironmentVariables is not defined ([6b0fae4](https://github.com/xing/hops/commit/6b0fae4))
* **react:** do not set shouldPrefetchOnServer from config ([b519993](https://github.com/xing/hops/commit/b519993))
* **react:** try to acess env var on `process.env` first ([7ae00ac](https://github.com/xing/hops/commit/7ae00ac))
* **redux:** add missing actionCreatorDispatcher files to package ([b1ebe2d](https://github.com/xing/hops/commit/b1ebe2d))
* **redux:** specify esnext field to transpile code ([58a6b09](https://github.com/xing/hops/commit/58a6b09))
* **spec:** ignore case of stdout output ([7c63206](https://github.com/xing/hops/commit/7c63206))
* **template-minimal:** adapt to new render method signature ([4193c72](https://github.com/xing/hops/commit/4193c72))
* **template-react:** remove env variable access to fix tests ([6892dc8](https://github.com/xing/hops/commit/6892dc8))
* do not use nested css as it is not supported anymore ([f85dc75](https://github.com/xing/hops/commit/f85dc75))
* use renamed getTemplateData hook in favor of enhanceData ([31ecf4f](https://github.com/xing/hops/commit/31ecf4f))
* Use renamed untool getConfigAndMixins function ([0d16963](https://github.com/xing/hops/commit/0d16963))


### Chores

* specify engines as >=8.10 in all packages ([bb20aa6](https://github.com/xing/hops/commit/bb20aa6))


### Code Refactoring

* **graphql:** namespace render options ([80847df](https://github.com/xing/hops/commit/80847df))
* **redux:** namespace render options ([c83d9aa](https://github.com/xing/hops/commit/c83d9aa))


### Features

* **cli:** add dotenv support ([2f68e19](https://github.com/xing/hops/commit/2f68e19))
* **cli:** remove dotenv again as it is now part of untool ([cd6936c](https://github.com/xing/hops/commit/cd6936c))
* **config:** export config through "hops-config" ([7929964](https://github.com/xing/hops/commit/7929964))
* **express:** enable gzip compression when serving in production mode ([812e588](https://github.com/xing/hops/commit/812e588))
* **express:** implement hops-express package to customize server ([7c17fe7](https://github.com/xing/hops/commit/7c17fe7))
* **graphql:** add overridable getApolloLink hook ([0bc798e](https://github.com/xing/hops/commit/0bc798e))
* **graphql:** use shouldPrefetchOnServer to enable prefetching of data ([86345e3](https://github.com/xing/hops/commit/86345e3))
* **postcss:** implement postcss package ([46ec09e](https://github.com/xing/hops/commit/46ec09e))
* **preset-defaults:** move default presets into separate package ([f8a095a](https://github.com/xing/hops/commit/f8a095a))
* **pwa:** allow service worker registration on all local interfaces ([878011e](https://github.com/xing/hops/commit/878011e))
* **pwa:** implement hops-pwa as mixin ([28eb3e0](https://github.com/xing/hops/commit/28eb3e0))
* **react:** add server data HOC ([0d8dbb4](https://github.com/xing/hops/commit/0d8dbb4))
* **react:** implement server components ([8249d90](https://github.com/xing/hops/commit/8249d90))
* **react:** pass CLI arguments to runtime mixins / React HoC ([5e455c2](https://github.com/xing/hops/commit/5e455c2))
* **react:** pass environment variables to React HoC ([5224979](https://github.com/xing/hops/commit/5224979))
* **react:** remove withCLIArguments ([64700bb](https://github.com/xing/hops/commit/64700bb))
* **react:** set res.locals.shouldPrefetchOnServer based on config ([e9a3821](https://github.com/xing/hops/commit/e9a3821))
* **redux:** add action creator dispatcher mixin ([78a848c](https://github.com/xing/hops/commit/78a848c))
* **redux:** add overridable getReduxMiddlewares hook ([ccaefa7](https://github.com/xing/hops/commit/ccaefa7))
* **redux:** expose getReduxStore hook ([9ada268](https://github.com/xing/hops/commit/9ada268))
* **redux:** use shouldPrefetchOnServer instead of _hopsStatic ([e601483](https://github.com/xing/hops/commit/e601483))
* **styled-components:** introduce package ([2a4cb98](https://github.com/xing/hops/commit/2a4cb98))
* **template-redux:** introduce react/redux template ([a6511a2](https://github.com/xing/hops/commit/a6511a2))
* **typescript:** introduce package ([d52d3ae](https://github.com/xing/hops/commit/d52d3ae))
* **typescript:** provide minimal default tsconfig.json ([1ac77d0](https://github.com/xing/hops/commit/1ac77d0))
* **webpack:** print compilation stats and watch runs ([fbe902b](https://github.com/xing/hops/commit/fbe902b))


### BREAKING CHANGES

* **redux:** redux specific options are now namespaced
If you want to pass options to the hops-redux package you need to pass
them to the render function inside a `redux` key:
**Before:**
```javascript
render(<MyApp />, { reducers: {...} });
```
**After:**
```javascript
render(<MyApp />, { redux: { reducers: {...}  } });
```
* **graphql:** graphql specific options are now namespaced
If you want to pass options to the hops-graphql package you need to pass
them to the render function inside a `graphql` key:
**Before:**
```javascript
render(<MyApp />, { link: new Link() });
```
**After:**
```javascript
render(<MyApp />, { graphql: { link: new Link() } });
```
* Increase minimum required Node.js version from 6 to 8
This commit specifies Node.js 8.10 as minimum required version in all
packages.




<a name="11.0.0-rc.18"></a>
# [11.0.0-rc.18](https://github.com/xing/hops/compare/v11.0.0-rc.17...v11.0.0-rc.18) (2018-07-09)


### Bug Fixes

* **config:** replace env placeholders with environment variables ([1225753](https://github.com/xing/hops/commit/1225753))




<a name="11.0.0-rc.17"></a>
# [11.0.0-rc.17](https://github.com/xing/hops/compare/v11.0.0-rc.16...v11.0.0-rc.17) (2018-07-09)


### Features

* **cli:** remove dotenv again as it is now part of untool ([1044735](https://github.com/xing/hops/commit/1044735))




<a name="11.0.0-rc.16"></a>
# [11.0.0-rc.16](https://github.com/xing/hops/compare/v11.0.0-rc.15...v11.0.0-rc.16) (2018-07-09)




**Note:** Version bump only for package hops-lerna-root

<a name="11.0.0-rc.15"></a>
# [11.0.0-rc.15](https://github.com/xing/hops/compare/v11.0.0-rc.14...v11.0.0-rc.15) (2018-07-05)


### Bug Fixes

* **config:** environmentalize config ([752e4f5](https://github.com/xing/hops/commit/752e4f5))




<a name="11.0.0-rc.14"></a>
# [11.0.0-rc.14](https://github.com/xing/hops/compare/v11.0.0-rc.13...v11.0.0-rc.14) (2018-07-04)


### Bug Fixes

* Use renamed untool getConfigAndMixins function ([a891183](https://github.com/xing/hops/commit/a891183))
* **react:** do not set shouldPrefetchOnServer from config ([815337a](https://github.com/xing/hops/commit/815337a))




<a name="11.0.0-rc.13"></a>
# [11.0.0-rc.13](https://github.com/xing/hops/compare/v11.0.0-rc.12...v11.0.0-rc.13) (2018-07-04)


### Bug Fixes

* **express:** return app in configureServer hook ([ca07331](https://github.com/xing/hops/commit/ca07331))


### Features

* **express:** enable gzip compression when serving in production mode ([c7be81e](https://github.com/xing/hops/commit/c7be81e))




<a name="11.0.0-rc.12"></a>
# [11.0.0-rc.12](https://github.com/xing/hops/compare/v11.0.0-rc.11...v11.0.0-rc.12) (2018-06-28)


### Code Refactoring

* **graphql:** namespace render options ([9da5664](https://github.com/xing/hops/commit/9da5664))
* **redux:** namespace render options ([34653f0](https://github.com/xing/hops/commit/34653f0))


### Features

* **cli:** add dotenv support ([7b7a683](https://github.com/xing/hops/commit/7b7a683))
* **styled-components:** introduce package ([ffe093a](https://github.com/xing/hops/commit/ffe093a))
* **typescript:** introduce package ([9e13794](https://github.com/xing/hops/commit/9e13794))


### BREAKING CHANGES

* **redux:** redux specific options are now namespaced
If you want to pass options to the hops-redux package you need to pass
them to the render function inside a `redux` key:
**Before:**
```javascript
render(<MyApp />, { reducers: {...} });
```
**After:**
```javascript
render(<MyApp />, { redux: { reducers: {...}  } });
```
* **graphql:** graphql specific options are now namespaced
If you want to pass options to the hops-graphql package you need to pass
them to the render function inside a `graphql` key:
**Before:**
```javascript
render(<MyApp />, { link: new Link() });
```
**After:**
```javascript
render(<MyApp />, { graphql: { link: new Link() } });
```




<a name="11.0.0-rc.11"></a>
# [11.0.0-rc.11](https://github.com/xing/hops/compare/v11.0.0-rc.10...v11.0.0-rc.11) (2018-06-27)


### Bug Fixes

* **react:** add missing files to package.json ([755f2e5](https://github.com/xing/hops/commit/755f2e5))




<a name="11.0.0-rc.10"></a>
# [11.0.0-rc.10](https://github.com/xing/hops/compare/v11.0.0-rc.9...v11.0.0-rc.10) (2018-06-27)


### Bug Fixes

* **graphql:** pass apollo state to getTemplateData.globals ([c8843bd](https://github.com/xing/hops/commit/c8843bd))


### Features

* **graphql:** use shouldPrefetchOnServer to enable prefetching of data ([fceeeab](https://github.com/xing/hops/commit/fceeeab))
* **react:** add server data HOC ([70ef7ad](https://github.com/xing/hops/commit/70ef7ad))
* **react:** remove withCLIArguments ([92770dd](https://github.com/xing/hops/commit/92770dd))




<a name="11.0.0-rc.9"></a>
# [11.0.0-rc.9](https://github.com/xing/hops/compare/v11.0.0-rc.8...v11.0.0-rc.9) (2018-06-27)


### Bug Fixes

* use renamed getTemplateData hook in favor of enhanceData ([79f939b](https://github.com/xing/hops/commit/79f939b))
* **express:** resolve circular dependency ([3de76ba](https://github.com/xing/hops/commit/3de76ba))
* **lambda:** include missing preset.js in released package ([f26fbfb](https://github.com/xing/hops/commit/f26fbfb))
* **pwa:** include babel polyfill and use config from [@untool](https://github.com/untool)/config ([8647e9c](https://github.com/xing/hops/commit/8647e9c))




<a name="11.0.0-rc.8"></a>
# [11.0.0-rc.8](https://github.com/xing/hops/compare/v11.0.0-rc.7...v11.0.0-rc.8) (2018-06-26)


### Features

* **pwa:** implement hops-pwa as mixin ([bb1edb5](https://github.com/xing/hops/commit/bb1edb5))




<a name="11.0.0-rc.7"></a>
# [11.0.0-rc.7](https://github.com/xing/hops/compare/v11.0.0-rc.6...v11.0.0-rc.7) (2018-06-25)


### Bug Fixes

* **postcss:** add missing postcss features that were supported before ([454666f](https://github.com/xing/hops/commit/454666f))
* **redux:** specify esnext field to transpile code ([888dc09](https://github.com/xing/hops/commit/888dc09))




<a name="11.0.0-rc.6"></a>
# [11.0.0-rc.6](https://github.com/xing/hops/compare/v11.0.0-rc.5...v11.0.0-rc.6) (2018-06-25)


### Bug Fixes

* **redux:** add missing actionCreatorDispatcher files to package ([84170d8](https://github.com/xing/hops/commit/84170d8))




<a name="11.0.0-rc.5"></a>
# [11.0.0-rc.5](https://github.com/xing/hops/compare/v11.0.0-rc.4...v11.0.0-rc.5) (2018-06-25)


### Bug Fixes

* **react:** do not fail if _hopsEnvironmentVariables is not defined ([6bceb66](https://github.com/xing/hops/commit/6bceb66))
* **react:** try to acess env var on `process.env` first ([9d32e7b](https://github.com/xing/hops/commit/9d32e7b))
* **spec:** ignore case of stdout output ([8155e7d](https://github.com/xing/hops/commit/8155e7d))
* **template-react:** remove env variable access to fix tests ([07b6b5b](https://github.com/xing/hops/commit/07b6b5b))


### Features

* **express:** implement hops-express package to customize server ([1f7b991](https://github.com/xing/hops/commit/1f7b991))
* **postcss:** implement postcss package ([7e79abd](https://github.com/xing/hops/commit/7e79abd))
* **react:** implement server components ([95d329f](https://github.com/xing/hops/commit/95d329f))
* **react:** pass CLI arguments to runtime mixins / React HoC ([ef4219f](https://github.com/xing/hops/commit/ef4219f))
* **react:** pass environment variables to React HoC ([ce78057](https://github.com/xing/hops/commit/ce78057))
* **react:** set res.locals.shouldPrefetchOnServer based on config ([8dddb25](https://github.com/xing/hops/commit/8dddb25))
* **redux:** add action creator dispatcher mixin ([2f0e24d](https://github.com/xing/hops/commit/2f0e24d))
* **redux:** use shouldPrefetchOnServer instead of _hopsStatic ([5ca5843](https://github.com/xing/hops/commit/5ca5843))
* **webpack:** print compilation stats and watch runs ([a31b66c](https://github.com/xing/hops/commit/a31b66c))




<a name="11.0.0-rc.4"></a>
# [11.0.0-rc.4](https://github.com/xing/hops/compare/v11.0.0-rc.3...v11.0.0-rc.4) (2018-06-05)


### Bug Fixes

* do not use nested css as it is not supported anymore ([cf3d802](https://github.com/xing/hops/commit/cf3d802))


### Features

* **redux:** expose getReduxStore hook ([d63e2d4](https://github.com/xing/hops/commit/d63e2d4))




<a name="11.0.0-rc.3"></a>
# [11.0.0-rc.3](https://github.com/xing/hops/compare/v10.4.3...v11.0.0-rc.3) (2018-05-25)


### Bug Fixes

* **build-config:** Do not use optimizations that assume concatenation ([57fd846](https://github.com/xing/hops/commit/57fd846))
* **config:** add missing browser.js to package ([16e4d66](https://github.com/xing/hops/commit/16e4d66))
* **config:** use aliased config when building for browser env ([b006a67](https://github.com/xing/hops/commit/b006a67))
* **template-minimal:** adapt to new render method signature ([de9fd46](https://github.com/xing/hops/commit/de9fd46))
* **template-minimal:** remove manifest, use assets from res.locals ([21a5a60](https://github.com/xing/hops/commit/21a5a60))


### Chores

* specify engines as >=8.10 in all packages ([335fd84](https://github.com/xing/hops/commit/335fd84))
* specify engines as >=8.10 in all packages ([9228cb1](https://github.com/xing/hops/commit/9228cb1))


### Features

* support node 8 on AWS Lambda ([fb87ac1](https://github.com/xing/hops/commit/fb87ac1))
* **config:** export config through "hops-config" ([0da18fe](https://github.com/xing/hops/commit/0da18fe))
* **preset-defaults:** move default presets into separate package ([4d726bf](https://github.com/xing/hops/commit/4d726bf))
* **template-redux:** introduce react/redux template ([bf979e0](https://github.com/xing/hops/commit/bf979e0))


### BREAKING CHANGES

* Increase minimum required Node.js version from 6 to 8
This commit specifies Node.js 8.10 as minimum required version in all
packages.
* Increase minimum required Node.js version from 6 to 8
This commit specifies Node.js 8.10 as minimum required version in all
packages.




<a name="11.0.0-rc.2"></a>
# [11.0.0-rc.2](https://github.com/xing/hops/compare/v11.0.0-rc.1...v11.0.0-rc.2) (2018-05-23)


### Bug Fixes

* **config:** use aliased config when building for browser env ([75342ee](https://github.com/xing/hops/commit/75342ee))




<a name="11.0.0-rc.1"></a>
# [11.0.0-rc.1](https://github.com/xing/hops/compare/v11.0.0-rc.0...v11.0.0-rc.1) (2018-05-23)




**Note:** Version bump only for package hops-lerna-root

<a name="11.0.0-rc.0"></a>
# [11.0.0-rc.0](https://github.com/xing/hops/compare/v10.4.3...v11.0.0-rc.0) (2018-05-22)


### Bug Fixes

* **build-config:** Do not use optimizations that assume concatenation ([57fd846](https://github.com/xing/hops/commit/57fd846))
* **template-minimal:** adapt to new render method signature ([4d02eea](https://github.com/xing/hops/commit/4d02eea))
* **template-minimal:** remove manifest, use assets from res.locals ([21a5a60](https://github.com/xing/hops/commit/21a5a60))


### Chores

* specify engines as >=8.10 in all packages ([bc24dca](https://github.com/xing/hops/commit/bc24dca))
* specify engines as >=8.10 in all packages ([9228cb1](https://github.com/xing/hops/commit/9228cb1))


### Features

* support node 8 on AWS Lambda ([fb87ac1](https://github.com/xing/hops/commit/fb87ac1))
* **config:** export config through "hops-config" ([71b319e](https://github.com/xing/hops/commit/71b319e))
* **preset-defaults:** move default presets into separate package ([9000cb0](https://github.com/xing/hops/commit/9000cb0))
* **template-redux:** introduce react/redux template ([4342ee4](https://github.com/xing/hops/commit/4342ee4))


### BREAKING CHANGES

* Increase minimum required Node.js version from 6 to 8
This commit specifies Node.js 8.10 as minimum required version in all
packages.
* Increase minimum required Node.js version from 6 to 8
This commit specifies Node.js 8.10 as minimum required version in all
packages.




<a name="10.3.0"></a>
# [10.3.0](https://github.com/xing/hops/compare/v10.3.0-rc.3...v10.3.0) (2018-04-09)



<a name="10.3.0-rc.3"></a>
# [10.3.0-rc.3](https://github.com/xing/hops/compare/v10.3.0-rc.2...v10.3.0-rc.3) (2018-04-05)


### Bug Fixes

* **build-config:** make service worker plugin async via tapAsync ([f230ffc](https://github.com/xing/hops/commit/f230ffc))
* **build-config:** make webmanifest loader webpack 4 compatible ([1c398ee](https://github.com/xing/hops/commit/1c398ee))
* **react:** do not throw error when no options are passed ([e5bffdd](https://github.com/xing/hops/commit/e5bffdd))


### Features

* **build-config:** add CSS optimizer plugin to minify assets ([236e127](https://github.com/xing/hops/commit/236e127))
* **config:** port defaults to `PORT` environment variable ([4a079b8](https://github.com/xing/hops/commit/4a079b8))
* **express:** choose next free port when hops-config.port is falsy ([62b9b77](https://github.com/xing/hops/commit/62b9b77))



<a name="10.3.0-rc.2"></a>
# [10.3.0-rc.2](https://github.com/xing/hops/compare/v10.3.0-rc.1...v10.3.0-rc.2) (2018-03-27)


### Bug Fixes

* **build:** raise node-mocks-http version to ensure res.locals being set ([e5ae186](https://github.com/xing/hops/commit/e5ae186))


### Features

* **build-config:** switch to mini-css-extract-plugin ([37d5b8f](https://github.com/xing/hops/commit/37d5b8f)), closes [/github.com/webpack-contrib/extract-text-webpack-plugin/issues/731#issuecomment-374548865](https://github.com//github.com/webpack-contrib/extract-text-webpack-plugin/issues/731/issues/issuecomment-374548865)



<a name="10.3.0-rc.1"></a>
# [10.3.0-rc.1](https://github.com/xing/hops/compare/v10.3.0-rc.0...v10.3.0-rc.1) (2018-03-27)


### Bug Fixes

* **build:** do not break build on webpack warnings ([0c1518f](https://github.com/xing/hops/commit/0c1518f))



<a name="10.3.0-rc.0"></a>
# [10.3.0-rc.0](https://github.com/xing/hops/compare/v10.2.0...v10.3.0-rc.0) (2018-03-26)


### Bug Fixes

* **build-config:** use [name]-[chunkhash] as chunk names ([83021d4](https://github.com/xing/hops/commit/83021d4))
* **spec:** re-enable CSS build test ([832cf04](https://github.com/xing/hops/commit/832cf04))


### Features

* **build-config:** get rid of manifest plugin, simplify config loader ([70aa374](https://github.com/xing/hops/commit/70aa374))
* **build-config:** introduce global css mode ([4d9b36f](https://github.com/xing/hops/commit/4d9b36f))
* **build-config:** tweak Webpack configs for v4 ([b28a787](https://github.com/xing/hops/commit/b28a787))
* **build-config:** update to latest alpha of extract text plugin ([823b562](https://github.com/xing/hops/commit/823b562))
* **build-config:** update webpack to v4 ([eafe4f2](https://github.com/xing/hops/commit/eafe4f2))
* **graphql:** add "--header/-H" CLI option to introspect command ([671193d](https://github.com/xing/hops/commit/671193d))
* **graphql:** Generate fragment types from schema file ([5d86841](https://github.com/xing/hops/commit/5d86841))



<a name="10.2.0"></a>
# [10.2.0](https://github.com/xing/hops/compare/v10.2.0-rc.5...v10.2.0) (2018-03-26)


### Bug Fixes

* **build:** exit with exitCode 1 when build fails ([83b9bf6](https://github.com/xing/hops/commit/83b9bf6))



<a name="10.2.0-rc.5"></a>
# [10.2.0-rc.5](https://github.com/xing/hops/compare/v10.2.0-rc.4...v10.2.0-rc.5) (2018-03-16)


### Bug Fixes

* **lambda:** warn about misconfiguration instead of exiting ([4fd8f21](https://github.com/xing/hops/commit/4fd8f21))
* avoid sw.js being loaded from wrong path ([14ec44b](https://github.com/xing/hops/commit/14ec44b))
* **react:** always respect headers, even on a miss ([0022a1c](https://github.com/xing/hops/commit/0022a1c))
* **renderer:** fix static build not working due to missing res.locals.timing ([9bb1b35](https://github.com/xing/hops/commit/9bb1b35))


### Features

* **express:** enable gzip compression ([38779f0](https://github.com/xing/hops/commit/38779f0))
* allow to track server timings ([31ee6ad](https://github.com/xing/hops/commit/31ee6ad))


### Performance Improvements

* track context lifecycle hooks ([a4d7dec](https://github.com/xing/hops/commit/a4d7dec))



<a name="10.2.0-rc.4"></a>
# [10.2.0-rc.4](https://github.com/xing/hops/compare/v10.2.0-rc.3...v10.2.0-rc.4) (2018-02-20)


### Bug Fixes

* check against correct protocol notion for sw registration ([9f006a3](https://github.com/xing/hops/commit/9f006a3))



<a name="10.2.0-rc.3"></a>
# [10.2.0-rc.3](https://github.com/xing/hops/compare/v10.2.0-rc.2...v10.2.0-rc.3) (2018-02-20)


### Bug Fixes

* **express:** don't cache sw.js ([a085bf3](https://github.com/xing/hops/commit/a085bf3))
* **hops-express:** fix ssl file location references ([f7a94ea](https://github.com/xing/hops/commit/f7a94ea))



<a name="10.2.0-rc.2"></a>
# [10.2.0-rc.2](https://github.com/xing/hops/compare/v10.2.0-rc.1...v10.2.0-rc.2) (2018-02-19)



<a name="10.2.0-rc.1"></a>
# [10.2.0-rc.1](https://github.com/xing/hops/compare/v10.2.0-rc.0...v10.2.0-rc.1) (2018-02-19)


### Bug Fixes

* **build-config:** add plugins to package ([a84e20e](https://github.com/xing/hops/commit/a84e20e))



<a name="10.2.0-rc.0"></a>
# [10.2.0-rc.0](https://github.com/xing/hops/compare/v10.1.0...v10.2.0-rc.0) (2018-02-19)


### Features

* **build:** enable SSR mode in webpack dev middleware ([6be493a](https://github.com/xing/hops/commit/6be493a))
* **build-config:** get rid of manifest plugin, simplify config loader ([1484d10](https://github.com/xing/hops/commit/1484d10))
* **build-config:** introduce build, develop, node exports ([f4a6516](https://github.com/xing/hops/commit/f4a6516))
* **config:** add service worker configuration options ([ec7f016](https://github.com/xing/hops/commit/ec7f016))
* **express:** expose stats/asset paths using express ([74c8173](https://github.com/xing/hops/commit/74c8173))
* **express:** implement SSL support ([ec0026c](https://github.com/xing/hops/commit/ec0026c))
* **pwa:** initial ServiceWorker and Web App Manifest support ([6fe9ddb](https://github.com/xing/hops/commit/6fe9ddb))



<a name="10.1.0"></a>
# [10.1.0](https://github.com/xing/hops/compare/v10.0.2...v10.1.0) (2018-02-19)


### Features

* **lambda:** hide aws configuration from browser by prefixing with _ ([9dbf5e1](https://github.com/xing/hops/commit/9dbf5e1)), closes [#319](https://github.com/xing/hops/issues/319)



<a name="10.0.2"></a>
## [10.0.2](https://github.com/xing/hops/compare/v10.0.1...v10.0.2) (2018-02-15)


### Bug Fixes

* **build:** log errors without "stack" instead of swallowing them ([1950723](https://github.com/xing/hops/commit/1950723))
* **cli:** fix variable scoping issues, improve error messages ([e29552c](https://github.com/xing/hops/commit/e29552c))
* **lambda:** correct typo "UrlSuffix" => "URLSuffix" ([a8f6b4f](https://github.com/xing/hops/commit/a8f6b4f)), closes [#382](https://github.com/xing/hops/issues/382)



<a name="10.0.1"></a>
## [10.0.1](https://github.com/xing/hops/compare/v10.0.0...v10.0.1) (2018-02-09)


### Bug Fixes

* **config:** deep-merge objects instead of overwriting them ([35c7325](https://github.com/xing/hops/commit/35c7325))




<a name="10.0.0"></a>
# [10.0.0](https://github.com/xing/hops/compare/v10.0.0-rc.4...v10.0.0) (2018-02-07)


### Features

* **config:** apply placeholders to plain objects, too ([b84b60c](https://github.com/xing/hops/commit/b84b60c))




<a name="10.0.0-rc.4"></a>
# [10.0.0-rc.4](https://github.com/xing/hops/compare/v10.0.0-rc.3...v10.0.0-rc.4) (2018-02-05)


### Bug Fixes

* **config:** deep-merge config without array concatenation ([3a464e8](https://github.com/xing/hops/commit/3a464e8))


### Performance Improvements

* **build-config:** enable caching and parallelism in uglify plugin ([0530c24](https://github.com/xing/hops/commit/0530c24))




<a name="10.0.0-rc.3"></a>
# [10.0.0-rc.3](https://github.com/xing/hops/compare/v10.0.0-rc.2...v10.0.0-rc.3) (2018-02-05)


### Bug Fixes

* **config:** fix config extension mechanism ([fcc1a74](https://github.com/xing/hops/commit/fcc1a74))
* **redux:** missing options no longer crash ([6ba75a7](https://github.com/xing/hops/commit/6ba75a7))


### Features

* **redux:** making redux configration scoped ([7813213](https://github.com/xing/hops/commit/7813213))




<a name="10.0.0-rc.2"></a>
# [10.0.0-rc.2](https://github.com/xing/hops/compare/v10.0.0-rc.1...v10.0.0-rc.2) (2018-02-02)


### Features

* **config:** support placeholders everywhere ([d0e47a0](https://github.com/xing/hops/commit/d0e47a0))
* **react:** render variant hiding contexts from users ([610381d](https://github.com/xing/hops/commit/610381d))




<a name="10.0.0-rc.1"></a>
# [10.0.0-rc.1](https://github.com/xing/hops/compare/v10.0.0-rc.0...v10.0.0-rc.1) (2018-01-31)


### Bug Fixes

* **hops-config:** fix extends overriding previous values instead of extending ([93b8945](https://github.com/xing/hops/commit/93b8945))




<a name="10.0.0-rc.0"></a>
# [10.0.0-rc.0](https://github.com/xing/hops/compare/v9.8.0...v10.0.0-rc.0) (2018-01-25)


### Features

* **build-config:** hide _configs from browser ([e087a49](https://github.com/xing/hops/commit/e087a49))
* **config:** add env support ([404d262](https://github.com/xing/hops/commit/404d262))
* **config:** add support for config keys starting with '_' ([42272e5](https://github.com/xing/hops/commit/42272e5))
* **config:** deeply merge configs ([b9519cd](https://github.com/xing/hops/commit/b9519cd))
* **config:** improve config "inheritance" ([7ba54ae](https://github.com/xing/hops/commit/7ba54ae))
* **config:** introduce cosmiconfig ([d9f8c15](https://github.com/xing/hops/commit/d9f8c15))
* **config:** simplify, add fs placeholders ([f5ccc11](https://github.com/xing/hops/commit/f5ccc11))
* **config:** use cosmiconfig for inheritance ([db2d39d](https://github.com/xing/hops/commit/db2d39d))
* **graphql:** disable data fetching in static ssr ([4e5e28a](https://github.com/xing/hops/commit/4e5e28a)), closes [#324](https://github.com/xing/hops/issues/324)


### BREAKING CHANGES

* **config:** configs are now being deeply merged (instead of shallowly)
* **config:** hops-config no longer supports the previous, npm based
config mechanism. hops now needs to be configured using a `hops` field
in `package.json` instead of `config.hops`. Local config overrides
(using npm) are no longer supported.
* **config:** function config values are no longer treated as getters, but rather returned directly
* **graphql:** In static mode, during server side rendering, GraphQL
data is no longer being prefetched. That appears to be the sane default.
The old behaviour can be restored by extending `GraphQLContext` and
overriding its 'prefetchData' method.




<a name="9.8.0"></a>
# [9.8.0](https://github.com/xing/hops/compare/v9.7.0...v9.8.0) (2018-01-25)


### Features

* **hops-react:** add header component to allow setting http headers declaratively ([f6dfc34](https://github.com/xing/hops/commit/f6dfc34))




<a name="9.7.0"></a>
# [9.7.0](https://github.com/xing/hops/compare/v9.6.1...v9.7.0) (2018-01-22)


### Bug Fixes

* **build-config:** fix dependency asset imports ([4cd4b1d](https://github.com/xing/hops/commit/4cd4b1d)), closes [#342](https://github.com/xing/hops/issues/342)
* **graphql:** fix console output ([85556fb](https://github.com/xing/hops/commit/85556fb))


### Features

* **build-config:** add .node files to exclusion regex ([f59f733](https://github.com/xing/hops/commit/f59f733))
* **build-config:** optimize exclusion heuristic ([b9bddbb](https://github.com/xing/hops/commit/b9bddbb))
* **cli:** execute build to prod start command ([8565081](https://github.com/xing/hops/commit/8565081))




<a name="9.6.1"></a>
## [9.6.1](https://github.com/xing/hops/compare/v9.6.0...v9.6.1) (2018-01-12)


### Bug Fixes

* **hops-cli:** allow to add .npmrc in templates ([3a47f3d](https://github.com/xing/hops/commit/3a47f3d))




<a name="9.6.0"></a>
# [9.6.0](https://github.com/xing/hops/compare/v9.5.0...v9.6.0) (2018-01-09)


### Bug Fixes

* **cli:** use pkg-dir instead of hops-config to figure out app root ([34bd28f](https://github.com/xing/hops/commit/34bd28f))
* **lambda:** specify peerDependencies also in devDependencies ([6411dc1](https://github.com/xing/hops/commit/6411dc1))


### Features

* **server:** print basePath (if configured) in server callback ([af589fc](https://github.com/xing/hops/commit/af589fc))




<a name="9.5.0"></a>
# [9.5.0](https://github.com/xing/hops/compare/v9.4.3...v9.5.0) (2018-01-09)


### Bug Fixes

* **graphql:** get rid of webpack warning ([f0aba04](https://github.com/xing/hops/commit/f0aba04))


### Features

* **build-config:** move manifest getters into the config loader ([d7e5aa0](https://github.com/xing/hops/commit/d7e5aa0))
* **build-config:** re-add config to node build ([ebbd930](https://github.com/xing/hops/commit/ebbd930))
* **jest-preset-hops:** add jest 22 to peerDependency range ([bf58d61](https://github.com/xing/hops/commit/bf58d61))




<a name="9.4.3"></a>
## [9.4.3](https://github.com/xing/hops/compare/v9.4.2...v9.4.3) (2018-01-08)


### Bug Fixes

* **cli:** do not require local packages in global context ([42002a3](https://github.com/xing/hops/commit/42002a3))




<a name="9.4.2"></a>
## [9.4.2](https://github.com/xing/hops/compare/v9.4.1...v9.4.2) (2018-01-08)




**Note:** Version bump only for package hops

<a name="9.4.1"></a>
## [9.4.1](https://github.com/xing/hops/compare/v9.4.0...v9.4.1) (2018-01-08)




**Note:** Version bump only for package hops

<a name="9.4.0"></a>
# [9.4.0](https://github.com/xing/hops/compare/v9.3.2...v9.4.0) (2018-01-08)


### Features

* **build:** make CLI commands compatible with hops-local-cli & hops ([7a203ba](https://github.com/xing/hops/commit/7a203ba))
* **express:** make CLI commands compatible with hops-local-cli & hops ([2128951](https://github.com/xing/hops/commit/2128951))
* **graphql:** make CLI commands compatible with hops-local-cli & hops ([a278d1d](https://github.com/xing/hops/commit/a278d1d))
* **lambda:** make CLI commands compatible with hops-local-cli & hops ([0e57a35](https://github.com/xing/hops/commit/0e57a35))




<a name="9.3.2"></a>
## [9.3.2](https://github.com/xing/hops/compare/v9.3.1...v9.3.2) (2018-01-08)


### Bug Fixes

* **hops-build-config:** exclude manifest.js.map as well ([29a5f61](https://github.com/xing/hops/commit/29a5f61))
* **hops-build-config:** move StatsWriterPlugin down so it does not include removed manifest chunk ([ce2d68d](https://github.com/xing/hops/commit/ce2d68d))




<a name="9.3.1"></a>
## [9.3.1](https://github.com/xing/hops/compare/v9.3.0...v9.3.1) (2017-12-15)


### Bug Fixes

* **build:** add missing hops-renderer dependency ([7420e0b](https://github.com/xing/hops/commit/7420e0b))
* **lambda:** pass required options hash to hops-express ([f413703](https://github.com/xing/hops/commit/f413703))




<a name="9.3.0"></a>
# [9.3.0](https://github.com/xing/hops/compare/v9.2.0...v9.3.0) (2017-12-14)


### Bug Fixes

* **server:** only rewrite path if run in static mode ([0bf7073](https://github.com/xing/hops/commit/0bf7073))


### Features

* **build-config:** make environment variables configurable ([27de5fe](https://github.com/xing/hops/commit/27de5fe))
* **config:** add envVars config ([a619eb4](https://github.com/xing/hops/commit/a619eb4))
* **template-graphql:** Add grapqhl example template ([0a65138](https://github.com/xing/hops/commit/0a65138))




<a name="9.2.0"></a>
# [9.2.0](https://github.com/xing/hops/compare/v9.1.1...v9.2.0) (2017-12-11)


### Bug Fixes

* **lambda:** wait until newly created bucket exists ([8e1f05c](https://github.com/xing/hops/commit/8e1f05c))


### Features

* **lambda:** include entire project dir in zip file (minus dev deps) ([c88f668](https://github.com/xing/hops/commit/c88f668))
* **lambda:** introduce "lambda" command to deploy app to AWS lambda ([7533e71](https://github.com/xing/hops/commit/7533e71))
* **lambda:** try to keep function warm by continuously polling it ([315c90b](https://github.com/xing/hops/commit/315c90b))
* **react:** make ReactRouter configurable ([48988d0](https://github.com/xing/hops/commit/48988d0)), closes [#292](https://github.com/xing/hops/issues/292)




<a name="9.1.1"></a>
## [9.1.1](https://github.com/xing/hops/compare/v9.1.0...v9.1.1) (2017-12-05)


### Performance Improvements

* lazy-require command implementations ([bac93fa](https://github.com/xing/hops/commit/bac93fa))




<a name="9.1.0"></a>
# [9.1.0](https://github.com/xing/hops/compare/v9.0.1...v9.1.0) (2017-11-29)


### Features

* **hops-redux:** allow to specify middlewares as option ([c7b8fcd](https://github.com/xing/hops/commit/c7b8fcd))




<a name="9.0.0"></a>
# [9.0.0](https://github.com/xing/hops/compare/v8.0.0...v9.0.0) (2017-11-27)


### Bug Fixes

* **graphql:** make getTemplateData order-agnostic ([6d5e0c3](https://github.com/xing/hops/commit/6d5e0c3))
* **react:** fix context mixin execution order ([506b6dc](https://github.com/xing/hops/commit/506b6dc))
* **react:** re-enable Miss/Status components ([c6c9c9e](https://github.com/xing/hops/commit/c6c9c9e))
* **redux:** make getTemplateData order-agnostic ([f60b169](https://github.com/xing/hops/commit/f60b169))


### Features

* **graphql:** implement constructor based mixins ([e99ec75](https://github.com/xing/hops/commit/e99ec75))
* **react:** implement constructor based mixins ([d828883](https://github.com/xing/hops/commit/d828883))
* **redux:** implement constructor based mixins ([19ef2fc](https://github.com/xing/hops/commit/19ef2fc))


### BREAKING CHANGES

* **graphql:** export.contextDefinition is now a constructor function (used to be an object literal)
* **redux:** export.contextDefinition is now a constructor function (used to be an object literal)
* **react:** export.contextDefinition is now a constructor function (used to be an object literal)




<a name="8.0.0"></a>
# [8.0.0](https://github.com/xing/hops/compare/v7.4.1...v8.0.0) (2017-11-22)


### Bug Fixes

* **build-config:** exclude absolute paths from bundled config ([4ecc41f](https://github.com/xing/hops/commit/4ecc41f))
* **build-config:** inline core-js polyfills in bundled Node.js code ([37e0feb](https://github.com/xing/hops/commit/37e0feb))
* **build-config:** replace babel-minify with uglify-es ([f1be32c](https://github.com/xing/hops/commit/f1be32c))
* **local-cli:** if _gitignore exists, rename it to .gitignore ([520a6da](https://github.com/xing/hops/commit/520a6da))
* **react:** make sure to only hydrate on first pass ([561cb89](https://github.com/xing/hops/commit/561cb89))
* **template-minimal:** keep gitignore after publish by renaming it ([d9e7e2d](https://github.com/xing/hops/commit/d9e7e2d))
* **template-react:** add missing prop-types dependency ([5fb80f2](https://github.com/xing/hops/commit/5fb80f2))
* **template-react:** keep gitignore after publish by renaming it ([afb28ae](https://github.com/xing/hops/commit/afb28ae))


### Code Refactoring

* **build-config:** remove propTypes in production builds ([50c9d6c](https://github.com/xing/hops/commit/50c9d6c))
* **graphql:** make main export a context mixin ([d097d2d](https://github.com/xing/hops/commit/d097d2d))
* **graphql:** rename mixin definition export ([dfd1d4b](https://github.com/xing/hops/commit/dfd1d4b))
* **plugin:** switch to options hash ([64e0f24](https://github.com/xing/hops/commit/64e0f24))
* **redux:** make main export a context mixin ([f5edae6](https://github.com/xing/hops/commit/f5edae6))
* **redux:** rename mixin definition export ([321e733](https://github.com/xing/hops/commit/321e733))
* **template-react:** remove flow type annotations ([4f7bba9](https://github.com/xing/hops/commit/4f7bba9))
* **template-react:** remove graphql from default template ([4533445](https://github.com/xing/hops/commit/4533445))


### Features

* **config:** allow targeting specific Node version in babel preset ([4437c6b](https://github.com/xing/hops/commit/4437c6b))
* **graphql:** implement simplified mixin support ([509c1b5](https://github.com/xing/hops/commit/509c1b5))
* **graphql:** introduce mixin support ([813196f](https://github.com/xing/hops/commit/813196f))
* **hops-build-config:** add source maps to production build output ([9cfde51](https://github.com/xing/hops/commit/9cfde51))
* **hops-build-config:** add webpack-stats-plugin to build ([a752635](https://github.com/xing/hops/commit/a752635))
* **react:** add combineContexts, refactor exports ([8bd2955](https://github.com/xing/hops/commit/8bd2955))
* **react:** implement simplified mixin support ([6f8bf5c](https://github.com/xing/hops/commit/6f8bf5c))
* **react:** introduce mixin support ([3a575b1](https://github.com/xing/hops/commit/3a575b1))
* **redux:** implement simplified mixin support ([dfed624](https://github.com/xing/hops/commit/dfed624))
* **redux:** introduce mixin support ([c0da538](https://github.com/xing/hops/commit/c0da538))
* **renderer:** add support for an options hash ([8206ad1](https://github.com/xing/hops/commit/8206ad1))
* **renderer:** make renderer use bootstrapServer config ([ce2298d](https://github.com/xing/hops/commit/ce2298d))


### Performance Improvements

* **graphql:** remove fs.existsSync() check from context ([1441d20](https://github.com/xing/hops/commit/1441d20))


### BREAKING CHANGES

* **graphql:** export naming changed
* **renderer:** createRenderer signature changed to options hash instead of discrete args
* **react:** some exports have been renamed
* **graphql:** exports changed
* **redux:** exports changed
* **react:** a context arguments is now required for render()
* **graphql:** main export changed
* **redux:** main export changed
* **redux:** export naming changed
* **redux:** Context.extends is removed, Context.mixin is added
* **react:** Context.extends is removed, Context.mixin is added
* **build-config:** Hops now no longer has built-in support for converting flow type
annotations into react prop-type definitions.
It still supports flow out of the box, via the babel-react preset,
but now it only removes flow type annotations from the build instead
of converting them to prop-types.
* **template-react:** The template `hops-template-react` now no longer contains flow type
annotations.

Closes: #277
* **template-react:** `hops-template-react` (default template) now no longer supports graphql
out of the box. You can add the support yourself again or use a
different template (we will provide a new `hops-template-graphql`
shortly).

Closes: #276
* **plugin:** Constructor signature changed to options hash instead of discrete args.
* **graphql:** Context.extends is removed, Context.mixin is added




<a name="7.4.1"></a>
## [7.4.1](https://github.com/xing/hops/compare/v7.4.0...v7.4.1) (2017-11-08)




**Note:** Version bump only for package hops
