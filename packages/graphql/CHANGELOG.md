# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="9.2.0"></a>
# [9.2.0](https://github.com/xing/hops/compare/v9.1.1...v9.2.0) (2017-12-11)




**Note:** Version bump only for package hops-graphql

<a name="9.1.1"></a>
## [9.1.1](https://github.com/xing/hops/compare/v9.1.0...v9.1.1) (2017-12-05)


### Performance Improvements

* lazy-require command implementations ([bac93fa](https://github.com/xing/hops/commit/bac93fa))




<a name="9.0.0"></a>
# [9.0.0](https://github.com/xing/hops/compare/v8.0.0...v9.0.0) (2017-11-27)


### Bug Fixes

* **graphql:** make getTemplateData order-agnostic ([6d5e0c3](https://github.com/xing/hops/commit/6d5e0c3))


### Features

* **graphql:** implement constructor based mixins ([e99ec75](https://github.com/xing/hops/commit/e99ec75))


### BREAKING CHANGES

* **graphql:** export.contextDefinition is now a constructor function (used to be an object literal)




<a name="8.0.0"></a>
# [8.0.0](https://github.com/xing/hops/compare/v7.4.1...v8.0.0) (2017-11-22)


### Code Refactoring

* **graphql:** make main export a context mixin ([d097d2d](https://github.com/xing/hops/commit/d097d2d))
* **graphql:** rename mixin definition export ([dfd1d4b](https://github.com/xing/hops/commit/dfd1d4b))


### Features

* **graphql:** implement simplified mixin support ([509c1b5](https://github.com/xing/hops/commit/509c1b5))
* **graphql:** introduce mixin support ([813196f](https://github.com/xing/hops/commit/813196f))


### Performance Improvements

* **graphql:** remove fs.existsSync() check from context ([1441d20](https://github.com/xing/hops/commit/1441d20))


### BREAKING CHANGES

* **graphql:** export naming changed
* **graphql:** exports changed
* **graphql:** main export changed
* **graphql:** Context.extends is removed, Context.mixin is added




<a name="7.4.1"></a>
## [7.4.1](https://github.com/xing/hops/compare/v7.4.0...v7.4.1) (2017-11-08)




**Note:** Version bump only for package hops-graphql

<a name="7.4.0"></a>
# [7.4.0](https://github.com/xing/hops/compare/v7.3.5...v7.4.0) (2017-11-01)


### Bug Fixes

* **graphql:** add React as a peer dependency ([a9342d8](https://github.com/xing/hops/commit/a9342d8))




<a name="7.3.5"></a>
## [7.3.5](https://github.com/xing/hops/compare/v7.3.4...v7.3.5) (2017-10-27)




**Note:** Version bump only for package hops-graphql

<a name="7.3.3"></a>
## [7.3.3](https://github.com/xing/hops/compare/v7.3.2...v7.3.3) (2017-10-26)


### Bug Fixes

* **graphql:** add missing folders to package ([99b31c1](https://github.com/xing/hops/commit/99b31c1))




<a name="7.3.2"></a>
## [7.3.2](https://github.com/xing/hops/compare/v7.3.1...v7.3.2) (2017-10-26)




**Note:** Version bump only for package hops-graphql

<a name="7.3.0"></a>
# [7.3.0](https://github.com/xing/hops/compare/v7.2.0...v7.3.0) (2017-10-26)


### Features

* **graphql:** add hops-graphql module ([8eac186](https://github.com/xing/hops/commit/8eac186))
* **graphql:** add introspection support ([aa058ff](https://github.com/xing/hops/commit/aa058ff))
* **graphql:** treat client options as immutable ([77f85cf](https://github.com/xing/hops/commit/77f85cf))
* **graphql:** upgrade to apollo-client 2.0 ([8c3a7fc](https://github.com/xing/hops/commit/8c3a7fc))
