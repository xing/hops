# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [13.2.0](https://github.com/xing/hops/compare/v13.1.0...v13.2.0) (2020-11-06)


### Features

* add support for Node v15 ([3ea8714](https://github.com/xing/hops/commit/3ea8714702960d0408cb6eae4bf336cb637eea9d))





# [13.1.0](https://github.com/xing/hops/compare/v13.0.0...v13.1.0) (2020-10-09)

**Note:** Version bump only for package hops-spec





# [13.0.0](https://github.com/xing/hops/compare/v13.0.0-rc.0...v13.0.0) (2020-09-28)

**Note:** Version bump only for package hops-spec





# [13.0.0-rc.0](https://github.com/xing/hops/compare/v13.0.0-alpha.2...v13.0.0-rc.0) (2020-09-07)

**Note:** Version bump only for package hops-spec





# [13.0.0-alpha.2](https://github.com/xing/hops/compare/v13.0.0-alpha.1...v13.0.0-alpha.2) (2020-08-17)

**Note:** Version bump only for package hops-spec





# [13.0.0-alpha.1](https://github.com/xing/hops/compare/v13.0.0-alpha.0...v13.0.0-alpha.1) (2020-07-31)

**Note:** Version bump only for package hops-spec





# [13.0.0-alpha.0](https://github.com/xing/hops/compare/v12.0.0-rc99...v13.0.0-alpha.0) (2020-07-23)


### Bug Fixes

* **lambda:** remove support for the "nodejs10.x"-runtime ([8f9d2ac](https://github.com/xing/hops/commit/8f9d2acf070fcf894df3d1a44524dac1a0cc1f19))
* remove support for Node versions 10 & 13 ([00e7f2f](https://github.com/xing/hops/commit/00e7f2fb2ec92b859805b65bfeee697a78bf8147))
* upgrade jest to v26 ([dfaf499](https://github.com/xing/hops/commit/dfaf49999704096859b63ed94c90a00a8727c75e))


### Features

* **webpack:** allow to run webpack builds in parallel ([30ad91c](https://github.com/xing/hops/commit/30ad91c2eccfbd103ca40290cdc0f8a655651da6))
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
