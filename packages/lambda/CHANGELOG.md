# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [13.4.3](https://github.com/xing/hops/compare/v13.4.2...v13.4.3) (2021-06-14)

**Note:** Version bump only for package hops-lambda





## [13.4.2](https://github.com/xing/hops/compare/v13.4.1...v13.4.2) (2021-04-20)

**Note:** Version bump only for package hops-lambda





## [13.4.1](https://github.com/xing/hops/compare/v13.4.0...v13.4.1) (2021-03-23)

**Note:** Version bump only for package hops-lambda





# [13.4.0](https://github.com/xing/hops/compare/v13.3.5...v13.4.0) (2021-03-15)

**Note:** Version bump only for package hops-lambda





## [13.3.5](https://github.com/xing/hops/compare/v13.3.4...v13.3.5) (2021-02-26)

**Note:** Version bump only for package hops-lambda





## [13.3.4](https://github.com/xing/hops/compare/v13.3.3...v13.3.4) (2021-02-25)


### Reverts

* Revert "chore: release v13.3.4" ([1665286](https://github.com/xing/hops/commit/1665286e4efb4316ce33bcc789b8ae6839ded3f9))
* Revert "chore: release v13.3.4" ([328c4a4](https://github.com/xing/hops/commit/328c4a494de318b7a893ac99165bf1fb1304b729))





## [13.3.3](https://github.com/xing/hops/compare/v13.3.2...v13.3.3) (2021-02-23)

**Note:** Version bump only for package hops-lambda





## [13.3.2](https://github.com/xing/hops/compare/v13.3.1...v13.3.2) (2021-02-03)

**Note:** Version bump only for package hops-lambda





## [13.3.1](https://github.com/xing/hops/compare/v13.3.0...v13.3.1) (2021-01-13)

**Note:** Version bump only for package hops-lambda





# [13.3.0](https://github.com/xing/hops/compare/v13.2.2...v13.3.0) (2021-01-11)

**Note:** Version bump only for package hops-lambda





## [13.2.2](https://github.com/xing/hops/compare/v13.2.1...v13.2.2) (2020-12-07)

**Note:** Version bump only for package hops-lambda





## [13.2.1](https://github.com/xing/hops/compare/v13.2.0...v13.2.1) (2020-11-20)

**Note:** Version bump only for package hops-lambda





# [13.2.0](https://github.com/xing/hops/compare/v13.1.0...v13.2.0) (2020-11-06)


### Features

* add support for Node v15 ([3ea8714](https://github.com/xing/hops/commit/3ea8714702960d0408cb6eae4bf336cb637eea9d))





# [13.1.0](https://github.com/xing/hops/compare/v13.0.0...v13.1.0) (2020-10-09)

**Note:** Version bump only for package hops-lambda





# [13.0.0](https://github.com/xing/hops/compare/v13.0.0-rc.0...v13.0.0) (2020-09-28)


### Bug Fixes

* **lambda:** correct condition ([71a55e1](https://github.com/xing/hops/commit/71a55e12742d8d4dd5685b2480ee3844ead6a04b))
* **lambda:** ensure warnings are printed ([92cdeb4](https://github.com/xing/hops/commit/92cdeb4f828b3ad07c443a9dc31a0319df6f9a2f))





# [13.0.0-rc.0](https://github.com/xing/hops/compare/v13.0.0-alpha.2...v13.0.0-rc.0) (2020-09-07)

**Note:** Version bump only for package hops-lambda





# [13.0.0-alpha.2](https://github.com/xing/hops/compare/v13.0.0-alpha.1...v13.0.0-alpha.2) (2020-08-17)

**Note:** Version bump only for package hops-lambda





# [13.0.0-alpha.1](https://github.com/xing/hops/compare/v13.0.0-alpha.0...v13.0.0-alpha.1) (2020-07-31)


### Bug Fixes

* update dependency archiver to v5 ([30740dc](https://github.com/xing/hops/commit/30740dc6bc34310254052cb2393bf4e900c42ba5))





# [13.0.0-alpha.0](https://github.com/xing/hops/compare/v12.0.0-rc99...v13.0.0-alpha.0) (2020-07-23)


### Bug Fixes

* **lambda:** remove support for the "nodejs10.x"-runtime ([8f9d2ac](https://github.com/xing/hops/commit/8f9d2acf070fcf894df3d1a44524dac1a0cc1f19))
* remove support for Node versions 10 & 13 ([00e7f2f](https://github.com/xing/hops/commit/00e7f2fb2ec92b859805b65bfeee697a78bf8147))


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
