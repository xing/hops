# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [14.3.1](https://github.com/xing/hops/compare/v14.3.0...v14.3.1) (2021-07-28)

**Note:** Version bump only for package hops-react-apollo





# [14.3.0](https://github.com/xing/hops/compare/v14.2.1...v14.3.0) (2021-07-27)


### Features

* **react-apollo:** expose helper functions for unit testing ([7908021](https://github.com/xing/hops/commit/7908021694a0b3822c0b0835bdecf78f992a1827))





## [14.2.1](https://github.com/xing/hops/compare/v14.2.0...v14.2.1) (2021-06-22)

**Note:** Version bump only for package hops-react-apollo





# [14.2.0](https://github.com/xing/hops/compare/v14.1.0...v14.2.0) (2021-06-14)


### Bug Fixes

* allow custom apollo cache ([e1b89af](https://github.com/xing/hops/commit/e1b89af9a869eb0aa843d73afa04edec46bc596d))





# [14.1.0](https://github.com/xing/hops/compare/v14.0.1...v14.1.0) (2021-04-20)

**Note:** Version bump only for package hops-react-apollo





## [14.0.1](https://github.com/xing/hops/compare/v14.0.0...v14.0.1) (2021-03-29)

**Note:** Version bump only for package hops-react-apollo





# [14.0.0](https://github.com/xing/hops/compare/v14.0.0-nightly.11...v14.0.0) (2021-03-29)

**Note:** Version bump only for package hops-react-apollo





# [14.0.0-nightly.11](https://github.com/xing/hops/compare/v14.0.0-nightly.10...v14.0.0-nightly.11) (2021-03-24)

**Note:** Version bump only for package hops-react-apollo





# [14.0.0-nightly.10](https://github.com/xing/hops/compare/v14.0.0-nightly.9...v14.0.0-nightly.10) (2021-03-18)

**Note:** Version bump only for package hops-react-apollo





# [14.0.0-nightly.9](https://github.com/xing/hops/compare/v14.0.0-nightly.7...v14.0.0-nightly.9) (2021-03-15)


### chore

* remove peer dependencies for apollo v2 ([581d406](https://github.com/xing/hops/commit/581d406309703f7fd1ae8c189cb38eb18f9f2806))


### Features

* **react-apollo:** implement support for apollo v3 ([ee5e984](https://github.com/xing/hops/commit/ee5e98400584d01ca62969fbe239ea84eafde1f5))
* rewrite runtime code to ESM to facilitate tree shaking ([3352add](https://github.com/xing/hops/commit/3352adda0476c199275d2162a7c51955ab0990f2))


### BREAKING CHANGES

* Hops no longer has peer dependencies to apollo v2

In detail, this means, that even though you still can use apollo@2,
your package manager will no longer warn when you're missing a
dependency.

Please see the readme of Hops v13 for information on which dependencies
you need with apollo@2.
* Some parts of Hops are rewritten to ES-Modules
This could potentially be a breaking change for some consumers when
using deep-imports.





# [14.0.0-nightly.8](https://github.com/xing/hops/compare/v14.0.0-nightly.7...v14.0.0-nightly.8) (2021-03-09)

**Note:** Version bump only for package hops-react-apollo





# [14.0.0-nightly.7](https://github.com/xing/hops/compare/v14.0.0-nightly.6...v14.0.0-nightly.7) (2021-02-09)

**Note:** Version bump only for package hops-react-apollo





# [14.0.0-nightly.6](https://github.com/xing/hops/compare/v14.0.0-nightly.5...v14.0.0-nightly.6) (2021-01-13)

**Note:** Version bump only for package hops-react-apollo





# [14.0.0-nightly.5](https://github.com/xing/hops/compare/v14.0.0-nightly.4...v14.0.0-nightly.5) (2021-01-11)

**Note:** Version bump only for package hops-react-apollo





# [14.0.0-nightly.4](https://github.com/xing/hops/compare/v14.0.0-nightly.3...v14.0.0-nightly.4) (2020-12-07)

**Note:** Version bump only for package hops-react-apollo





# [14.0.0-nightly.3](https://github.com/xing/hops/compare/v14.0.0-nightly.2...v14.0.0-nightly.3) (2020-11-20)


### Bug Fixes

* upgrade graphql-tools monorepo ([9530be1](https://github.com/xing/hops/commit/9530be135335dd454d44a0a4db8f3ef246279865))
* upgrade react monorepo to v17 ([ccd74f0](https://github.com/xing/hops/commit/ccd74f01923b8b902c64deaa8990b67cfe781bed))





# [14.0.0-nightly.2](https://github.com/xing/hops/compare/v14.0.0-nightly.1...v14.0.0-nightly.2) (2020-11-13)

**Note:** Version bump only for package hops-react-apollo





# [14.0.0-nightly.1](https://github.com/xing/hops/compare/v13.0.0...v14.0.0-nightly.1) (2020-11-06)


### Features

* add support for Node v15 ([75d22c8](https://github.com/xing/hops/commit/75d22c88db5beab3fa4f3edf29ccd5c5fb29fd2f))
