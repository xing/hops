# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
