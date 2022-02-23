# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [15.1.2](https://github.com/xing/hops/compare/v15.1.1...v15.1.2) (2022-02-23)


### Bug Fixes

* **react:** replace invalid characters in chunk name ([58486fe](https://github.com/xing/hops/commit/58486fea9007b4a03320209653623bf6a8a264f7))
* update dependency mime to v3 ([6d4e500](https://github.com/xing/hops/commit/6d4e500aae6c6466326621221a07614bbf5a628f))
* update dependency minimatch to v5 ([8671e9f](https://github.com/xing/hops/commit/8671e9f51f11313fba6c20bb025442d1f1a6d7c7))
* update dependency puppeteer to v13 ([f4ea28e](https://github.com/xing/hops/commit/f4ea28ec58927f080f8f43bdce1067f325d60d17))





## [15.1.1](https://github.com/xing/hops/compare/v15.1.0...v15.1.1) (2022-02-17)


### Bug Fixes

* **styled-components:** pin babel-plugin-styled-components to v1.12.1 ([1ac6fa9](https://github.com/xing/hops/commit/1ac6fa9d3e03c7d9fae7325d28b0e0be6e09fa03))
* update dependency postcss-preset-env to v7 ([5db06ac](https://github.com/xing/hops/commit/5db06acc89ca93d20968a36c4263b4d8fd40798f))





# [15.1.0](https://github.com/xing/hops/compare/v15.0.2...v15.1.0) (2022-02-16)


### Bug Fixes

* pin @apollo/client to 3.4.17 due to SSR bug in useLazyQuery ([de003f2](https://github.com/xing/hops/commit/de003f2a4a5f6cd0d4143625c267b25e65dfa458))
* reference webpack chunks via chunk name ([3521a78](https://github.com/xing/hops/commit/3521a7868976c855f036ab7b4c6a0e5fd556812d)), closes [#1976](https://github.com/xing/hops/issues/1976)
* wait for webpack builds to finish ([eb6737e](https://github.com/xing/hops/commit/eb6737e3e38a18814dbb906f3b01c016fcbc9162))


### Features

* **jest-environment:** reject hasFinished when build has failed ([bbe6ddc](https://github.com/xing/hops/commit/bbe6ddcd45e6592bf81bd8338c9ae98bd9459be4))





## [15.0.2](https://github.com/xing/hops/compare/v15.0.1...v15.0.2) (2022-01-12)


### Bug Fixes

* **apollo-mock-server:** move playground.png image to mock server folder ([e3afc18](https://github.com/xing/hops/commit/e3afc18bcb1294f7266fcfe4b627a63435bf1a9f))
* fix incorrect argument passing to process ([5508d3d](https://github.com/xing/hops/commit/5508d3d6565da55473a3c152a7c1455111a8bb02))
* **jest-environment:** replace package colors with chalk ([e4f944d](https://github.com/xing/hops/commit/e4f944d5d8bbd2b63b3e7c2eae2af31da93ce0cd))
* **jest-preset:** replace package colors with chalk ([47c1580](https://github.com/xing/hops/commit/47c158057045bba861309bb52d16b87668d070d2))
* **lambda:** replace package prompt with readline ([bb73a59](https://github.com/xing/hops/commit/bb73a59f2d6c53c83ba39ae443570d7a4d387678))
* **react-apollo:** make fragmentTypes available to the client-side ([2551037](https://github.com/xing/hops/commit/255103788206632bb81717f8f0222e18dcc42a87))
* reference the current version, not latest ([0b83fca](https://github.com/xing/hops/commit/0b83fca935fac72150d1f4de25e1b50ff61ea0fa))
* **webpack:** externalize server source-map to prevent RangeError ([1d43d68](https://github.com/xing/hops/commit/1d43d68bac5b028f85a76682936c5d13fb2aa1f4))
* **webpack:** print file name and location in webpack warnings ([94eddc8](https://github.com/xing/hops/commit/94eddc8d22b73f27515b04f3a66b6f29bff9fc6c))





## [15.0.1](https://github.com/xing/hops/compare/v15.0.0...v15.0.1) (2021-10-11)


### Bug Fixes

* fix bors config ([d51bdd3](https://github.com/xing/hops/commit/d51bdd3cf892bf603c99a0ef914654f9fec5f6a3))
* update dependency @pmmmwh/react-refresh-webpack-plugin to ^0.5.0 ([f872348](https://github.com/xing/hops/commit/f87234872bf17bda9b01dd4d1e33109752c5d04e))





# [15.0.0](https://github.com/xing/hops/compare/v15.0.0-nightly.14...v15.0.0) (2021-09-30)


### Bug Fixes

* create same hashes on server and client ([63d90db](https://github.com/xing/hops/commit/63d90dbde4bfd066a19ca3f67f8a9f3b27d884c6))





# [15.0.0-nightly.14](https://github.com/xing/hops/compare/v15.0.0-nightly.13...v15.0.0-nightly.14) (2021-09-27)

**Note:** Version bump only for package hops-lerna-root





# [15.0.0-nightly.13](https://github.com/xing/hops/compare/v15.0.0-nightly.12...v15.0.0-nightly.13) (2021-09-27)

**Note:** Version bump only for package hops-lerna-root





# [15.0.0-nightly.12](https://github.com/xing/hops/compare/v15.0.0-nightly.11...v15.0.0-nightly.12) (2021-09-27)


### Bug Fixes

* always use this.getLogger instead of console.* methods ([d8ea941](https://github.com/xing/hops/commit/d8ea941f5828e5736f2b1ad04c26309585661df0))
* **bootstrap:** fix object whitelisting for environmentalize ([871333f](https://github.com/xing/hops/commit/871333f76e95ec91ab9a7c6e6b112dd5bf80f4f8)), closes [#1156](https://github.com/xing/hops/issues/1156)
* do no exit hops in certain cases ([b47ff82](https://github.com/xing/hops/commit/b47ff82f8f873879fa200014731ec5cde7a3c4b2))
* exit Hops on unrecovrable webpack errors ([2030586](https://github.com/xing/hops/commit/203058633427f38a9902856b8295651207323f30))
* **info:** test if logLocation is writable ([6ba3261](https://github.com/xing/hops/commit/6ba326147e890e0efb9d8d5c722eaeb51ec05f7a))
* **jest-preset:** use require instead of import ([0822ad9](https://github.com/xing/hops/commit/0822ad94bbad9ca42abf2ccb9fc1c628021de32a))
* **msw:** prepend msw service worker path with basePath ([40e786c](https://github.com/xing/hops/commit/40e786c3ba2908eb81e788b586dbfea83955b357))
* **msw:** remove `enableMockServiceWorker` configuration option ([7348164](https://github.com/xing/hops/commit/73481649f85cf3c7bc2956b8ef89755f84164cb0))
* **msw:** remove unusable integration test APIs ([cc822ab](https://github.com/xing/hops/commit/cc822ab3a70527858422629aa6de75dfb4f0703f))
* remove deprecated apollo 2 ([ce21a80](https://github.com/xing/hops/commit/ce21a80a0d37f16aace51eab2f78ce420e86cd0b))
* remove version pinning of webpack 5 ([216ad8d](https://github.com/xing/hops/commit/216ad8d56a8b2209369b8fd1fe145aacfd4d965f))
* solve apollo conflicts in canarist ([a3664fc](https://github.com/xing/hops/commit/a3664fc3a057a782c691894a9caffeffee5717fc))
* **spec:** remove invalid test ([f6ebdf6](https://github.com/xing/hops/commit/f6ebdf6fbb68bbcbaed25f89c70e28c054d82091))
* update dependency css-loader to v6 ([f2cfbd0](https://github.com/xing/hops/commit/f2cfbd06dedd04d520a611fc34a0cdfda051f5ea))
* update dependency msw to ^0.35.0 ([5b8f69b](https://github.com/xing/hops/commit/5b8f69bbcaa738169dc881b15ca00f2237dd7091))
* update dependency postcss-normalize-charset to v5 ([11e3b18](https://github.com/xing/hops/commit/11e3b18c4c6c7190977629aefb7f0a79e1fbe31c))
* update dependency serialize-javascript to v6 ([9b2d934](https://github.com/xing/hops/commit/9b2d934645dff298603db6a0d5a047b2210098c7))
* update dependency webpack to v5.46.0 ([a67cd2c](https://github.com/xing/hops/commit/a67cd2c606f872ae4f80381bba5d1fe5cf2536cd))
* update dependency webpack to v5.51.1 ([bee9400](https://github.com/xing/hops/commit/bee94004cdc29b5073b8e79f2dc1250f5788c3f7))
* update dependency webpack-sources to v3 ([8dca82a](https://github.com/xing/hops/commit/8dca82a850b8c45e4556c7c764e8184d87ce7652))


### chore

* remove node 12 from engines field ([d3d3624](https://github.com/xing/hops/commit/d3d3624cec813bfe4d9ab4abe86e051bd7f9e61e))
* remove node 15 from engines ([f3c08b2](https://github.com/xing/hops/commit/f3c08b28feb6d64ff57f6c34b1f67a023146243d))


### Features

* handle errors in async middlewares ([7923530](https://github.com/xing/hops/commit/7923530db10700030202be9d59409d12acdbf2a9))
* **info:** optionally log into hops-log.txt ([825f44f](https://github.com/xing/hops/commit/825f44f10d3e6a68d2ec6ab659294edbc63ce3ea))


### BREAKING CHANGES

* removes deprecated apollo 2 client
* drops Node 15 support
* drops Node 12 support





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
* **template-graphql:** use msw for development mode ([58ecf47](https://github.com/xing/hops/commit/58ecf47c10c7075f9d6cefca2205c5d57bd25615))





# [15.0.0-nightly.8](https://github.com/xing/hops/compare/v15.0.0-nightly.7...v15.0.0-nightly.8) (2021-07-06)


### Bug Fixes

* **msw:** delay rendering until msw mocks have been registered ([dffafa4](https://github.com/xing/hops/commit/dffafa43f0e6647912843ba14061617128f9893a))





# [15.0.0-nightly.7](https://github.com/xing/hops/compare/v15.0.0-nightly.6...v15.0.0-nightly.7) (2021-07-05)


### Bug Fixes

* **msw:** rename /_mocks/ endpoint to /_msw/ to avoid clashes ([93a446d](https://github.com/xing/hops/commit/93a446df76d6933c945aed79974ed052f2bd0a8e))
* update dependency msw to ^0.30.0 ([1e8e8b7](https://github.com/xing/hops/commit/1e8e8b74d3dc21f3ec57660284b92ff9c82fc41c))





# [15.0.0-nightly.6](https://github.com/xing/hops/compare/v15.0.0-nightly.5...v15.0.0-nightly.6) (2021-06-30)


### Bug Fixes

* update dependency style-loader to v3 ([002b84a](https://github.com/xing/hops/commit/002b84abfd703e698ccb692ea66d62a224e1b519))
* **create-hops-app:** add intermediary support for Node v16 ([87172b0](https://github.com/xing/hops/commit/87172b0d05e981b074636576371f4551c1d6f8ec))
* **template-graphql:** correctly pass data and loading state ([aadadf8](https://github.com/xing/hops/commit/aadadf8749083df6202b69b5d38244e6ea068e6f))


### Features

* **jest-preset:** automatically set-up graphql and msw ([3f092d3](https://github.com/xing/hops/commit/3f092d3493a814b4c073dc2af8b03917973125c4))
* **msw:** introduce new hops-msw package ([8c29169](https://github.com/xing/hops/commit/8c29169b781719e44e5fbec201083fd52c20e991))
* **react-apollo:** expose helper functions for unit testing ([e174900](https://github.com/xing/hops/commit/e174900defe735252e5fa1f63782ad546fd6b9e6))





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

* **pwa:** make compatible with webpack v5 ([961300f](https://github.com/xing/hops/commit/961300fd0f071ccc07ff2c7ba1e1f35d3652e561))
* **webpack:** enable error logging of underlying tooling ([938d12c](https://github.com/xing/hops/commit/938d12cd67061d26239c1d21a49c470c8f54f34e))
* update dependency puppeteer to v10 ([7422f7b](https://github.com/xing/hops/commit/7422f7b0fd1192942b5c805904b9b43c0c71a2cb))


### Features

* update webpack to version 5 ([837420a](https://github.com/xing/hops/commit/837420a27315be1768e1f922aa5f5b3589d8d549))





# [15.0.0-nightly.2](https://github.com/xing/hops/compare/v15.0.0-nightly.1...v15.0.0-nightly.2) (2021-06-08)


### Bug Fixes

* **jest-preset:** use correct import of babel-jest package ([e50c595](https://github.com/xing/hops/commit/e50c5955ab3c54f57cfd08bc4b2689da3b8ddce0))
* allow custom apollo cache ([e3b76eb](https://github.com/xing/hops/commit/e3b76eb026a79e42a49677d06af22b5bc3dc234f))
* correctly initialize import component context ([e9dd60d](https://github.com/xing/hops/commit/e9dd60d0576f026404a174da7e1b529c784ab57c)), closes [#1729](https://github.com/xing/hops/issues/1729)
* update dependency dotenv to v10 ([4ff6ccf](https://github.com/xing/hops/commit/4ff6ccff6b36f3c08923bea6e5f11e2785a20ae9))
* update dependency dotenv to v9 ([12d6268](https://github.com/xing/hops/commit/12d6268d9d77d1500e539e43de98825ca482b75d))
* update dependency fs-extra to v10 ([52e04c8](https://github.com/xing/hops/commit/52e04c842d6cb266f1076288d3b83cc168c7a513))
* update dependency http-proxy-middleware to v2 ([870adda](https://github.com/xing/hops/commit/870addaa8a8945a05111edbcb45a156e04ae7de5))
* update dependency import-from to v4 ([c674e10](https://github.com/xing/hops/commit/c674e10ce243875da4c0e971a94e3c0fda9ddd91))
* update dependency nocache to v3 ([a00615a](https://github.com/xing/hops/commit/a00615a754d2f14c23756b632799eb837d910312))
* update dependency optimize-css-assets-webpack-plugin to v6 ([4e52f69](https://github.com/xing/hops/commit/4e52f69e9e993894a2ac85c460c33f68c5d98bd8))
* update dependency web-vitals to v2 ([d383856](https://github.com/xing/hops/commit/d38385696e86c9b24f1195d9db8c35243bb7ee8c))
* update dependency webpack-dev-middleware to v5 ([ba24511](https://github.com/xing/hops/commit/ba245117444edba7aa3b7edf7ff806370668534e))
* **apollo-mock-server:** update package graphql-tag ([daaab44](https://github.com/xing/hops/commit/daaab4491f71af7a5ccf9f9d1d90f658f3653f56))
* **debug:** provide method extend in the browser ([26d4d9b](https://github.com/xing/hops/commit/26d4d9b87a85ed6da9cdd9c0e0b7d22856904962))
* **jest-preset:** set Jest test environment explicitly ([ab13512](https://github.com/xing/hops/commit/ab13512f5068f3aea10a834d9f5bd4e52a564c38))
* update dependency puppeteer to v9 ([d1b52d8](https://github.com/xing/hops/commit/d1b52d8736758811f21e5927c4d3d10ce8a54a88))
* update dependency yargs to v17 ([30cb2f6](https://github.com/xing/hops/commit/30cb2f6b8285d7010bac0afae7979f0cd590e528))
* **react:** add missing CLI-flag to develop command ([5dc7966](https://github.com/xing/hops/commit/5dc7966f22a1a2b185bb93467157e401da29f96f))
* **webpack:** add missing CLI-flags to develop command ([db0964c](https://github.com/xing/hops/commit/db0964c8011396f36d0637dd4afcef8d2df32000))
* update webpack core ([64c748f](https://github.com/xing/hops/commit/64c748fe3907fa6a440a9b41d1264cb956ac05c2))


### Features

* **jest-preset:** enable ESM support for Typescript ([a9a9bd8](https://github.com/xing/hops/commit/a9a9bd826708b3476f2fcc6d05199ad89511cd4b))
* update Jest to version 27 ([35d373e](https://github.com/xing/hops/commit/35d373eab1a2dc546891ce2f1de3f45a7160f32b)), closes [#1832](https://github.com/xing/hops/issues/1832) [#1831](https://github.com/xing/hops/issues/1831) [#1760](https://github.com/xing/hops/issues/1760)
* **react:** add fast refresh plugin ([90189a2](https://github.com/xing/hops/commit/90189a265f0a461ddd390c4e06533de53461d084))
* **react:** switch to the new JSX transform ([8c9a353](https://github.com/xing/hops/commit/8c9a35382a81c6c0a6751670f2b08233e878e500))





# [15.0.0-nightly.1](https://github.com/xing/hops/compare/v15.0.0-nightly.0...v15.0.0-nightly.1) (2021-04-07)


### Bug Fixes

* **bootstrap:** adapt validator to breaking changes in ajv ([9366a33](https://github.com/xing/hops/commit/9366a33d58eeb76559f310d5b710f299bc0e516e))
* set correct "main" fields for templates ([2815fac](https://github.com/xing/hops/commit/2815fac9ff3cf1caa157a51972f28c9a46226fd3))
* update dependency ajv to v8 ([1259719](https://github.com/xing/hops/commit/125971914e341bf424c7ffbfacd64a1aaacb0b10))
* update dependency ajv-formats to v2 ([bf1f1e0](https://github.com/xing/hops/commit/bf1f1e0a4466460fad4408546d6647fb4cbebcae))


### Features

* add web vitals support ([ac3ad04](https://github.com/xing/hops/commit/ac3ad04b674d94f4fa183914725a25038f415159))





# [15.0.0-nightly.0](https://github.com/xing/hops/compare/v14.0.0...v15.0.0-nightly.0) (2021-03-29)

**Note:** Version bump only for package hops-lerna-root





[Hops v14 changelog](https://github.com/xing/hops/blob/v14.x/CHANGELOG.md)
