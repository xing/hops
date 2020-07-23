# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
