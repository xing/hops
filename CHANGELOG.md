# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
