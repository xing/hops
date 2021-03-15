# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [13.4.0](https://github.com/xing/hops/compare/v13.3.5...v13.4.0) (2021-03-15)

**Note:** Version bump only for package hops-react-apollo





## [13.3.5](https://github.com/xing/hops/compare/v13.3.4...v13.3.5) (2021-02-26)

**Note:** Version bump only for package hops-react-apollo





## [13.3.4](https://github.com/xing/hops/compare/v13.3.3...v13.3.4) (2021-02-25)


### Reverts

* Revert "chore: release v13.3.4" ([1665286](https://github.com/xing/hops/commit/1665286e4efb4316ce33bcc789b8ae6839ded3f9))
* Revert "chore: release v13.3.4" ([328c4a4](https://github.com/xing/hops/commit/328c4a494de318b7a893ac99165bf1fb1304b729))





## [13.3.3](https://github.com/xing/hops/compare/v13.3.2...v13.3.3) (2021-02-23)

**Note:** Version bump only for package hops-react-apollo





## [13.3.2](https://github.com/xing/hops/compare/v13.3.1...v13.3.2) (2021-02-03)

**Note:** Version bump only for package hops-react-apollo





## [13.3.1](https://github.com/xing/hops/compare/v13.3.0...v13.3.1) (2021-01-13)

**Note:** Version bump only for package hops-react-apollo





# [13.3.0](https://github.com/xing/hops/compare/v13.2.2...v13.3.0) (2021-01-11)

**Note:** Version bump only for package hops-react-apollo





## [13.2.2](https://github.com/xing/hops/compare/v13.2.1...v13.2.2) (2020-12-07)

**Note:** Version bump only for package hops-react-apollo





## [13.2.1](https://github.com/xing/hops/compare/v13.2.0...v13.2.1) (2020-11-20)


### Bug Fixes

* allow react v17 and upgrade to v17 ([97b7385](https://github.com/xing/hops/commit/97b7385334e37af6c1e437d0572d36023eefb65f))
* upgrade graphql-tools packages to v7 ([9dbfc5e](https://github.com/xing/hops/commit/9dbfc5e2d1ac86bb9d787873289964ce2bc9be4d))





# [13.2.0](https://github.com/xing/hops/compare/v13.1.0...v13.2.0) (2020-11-06)


### Features

* add support for Node v15 ([3ea8714](https://github.com/xing/hops/commit/3ea8714702960d0408cb6eae4bf336cb637eea9d))





# [13.1.0](https://github.com/xing/hops/compare/v13.0.0...v13.1.0) (2020-10-09)

**Note:** Version bump only for package hops-react-apollo





# [13.0.0](https://github.com/xing/hops/compare/v13.0.0-rc.0...v13.0.0) (2020-09-28)

**Note:** Version bump only for package hops-react-apollo





# [13.0.0-rc.0](https://github.com/xing/hops/compare/v13.0.0-alpha.2...v13.0.0-rc.0) (2020-09-07)

**Note:** Version bump only for package hops-react-apollo





# [13.0.0-alpha.2](https://github.com/xing/hops/compare/v13.0.0-alpha.1...v13.0.0-alpha.2) (2020-08-17)


### Bug Fixes

* **react-apollo:** prevent requests on server when SSR is turned off ([6e2cdf9](https://github.com/xing/hops/commit/6e2cdf97fdf6bb0b15212920d9f05ec956af0093))





# [13.0.0-alpha.1](https://github.com/xing/hops/compare/v13.0.0-alpha.0...v13.0.0-alpha.1) (2020-07-31)


### Bug Fixes

* **react-apollo:** remove support for shouldPrefetchOnServer ([e52a467](https://github.com/xing/hops/commit/e52a467749f95d4fefacf023198166d967000f49))


### BREAKING CHANGES

* **react-apollo:** Replace the outdated `shouldPrefetchOnServer` in your Hops
configuration with the new config value `allowServerSideDataFetching`.





# [13.0.0-alpha.0](https://github.com/xing/hops/compare/v12.0.0-rc99...v13.0.0-alpha.0) (2020-07-23)


### Bug Fixes

* **react-apollo:** import from graphql-tools monorepo package ([d31d1b0](https://github.com/xing/hops/commit/d31d1b0b73de305fbac4e858747a7f1897d0a51d))
* remove support for Node versions 10 & 13 ([00e7f2f](https://github.com/xing/hops/commit/00e7f2fb2ec92b859805b65bfeee697a78bf8147))
* update dependency graphql to v15 ([ca157e8](https://github.com/xing/hops/commit/ca157e87dc8664d77d9a39e65d4eeb098dd3bccc))
* update dependency graphql-tools to v6 ([5a4fc78](https://github.com/xing/hops/commit/5a4fc7867f91474f204e2222eb492a29111f01b2))


### Features

* support latest Node.js (v13) ([30ca9a4](https://github.com/xing/hops/commit/30ca9a4ebc3a43706eb07158259035349ce2d269))


### BREAKING CHANGES

* Hops does not support the outdated Node versions 10
and 13 anymore. In case you're using one of these, please update your
Node version to the current version 14 or the LTS version 12.
