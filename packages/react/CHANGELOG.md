# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="9.0.0"></a>
# [9.0.0](https://github.com/xing/hops/compare/v8.0.0...v9.0.0) (2017-11-27)


### Bug Fixes

* **react:** fix context mixin execution order ([506b6dc](https://github.com/xing/hops/commit/506b6dc))
* **react:** re-enable Miss/Status components ([c6c9c9e](https://github.com/xing/hops/commit/c6c9c9e))


### Features

* **react:** implement constructor based mixins ([d828883](https://github.com/xing/hops/commit/d828883))


### BREAKING CHANGES

* **react:** export.contextDefinition is now a constructor function (used to be an object literal)




<a name="8.0.0"></a>
# [8.0.0](https://github.com/xing/hops/compare/v7.4.1...v8.0.0) (2017-11-22)


### Bug Fixes

* **react:** make sure to only hydrate on first pass ([561cb89](https://github.com/xing/hops/commit/561cb89))


### Features

* **react:** add combineContexts, refactor exports ([8bd2955](https://github.com/xing/hops/commit/8bd2955))
* **react:** implement simplified mixin support ([6f8bf5c](https://github.com/xing/hops/commit/6f8bf5c))
* **react:** introduce mixin support ([3a575b1](https://github.com/xing/hops/commit/3a575b1))


### BREAKING CHANGES

* **react:** some exports have been renamed
* **react:** a context arguments is now required for render()
* **react:** Context.extends is removed, Context.mixin is added




<a name="7.4.0"></a>
# [7.4.0](https://github.com/xing/hops/compare/v7.3.5...v7.4.0) (2017-11-01)


### Features

* **react:** add support for React@16 ([46cf056](https://github.com/xing/hops/commit/46cf056))




<a name="7.3.2"></a>
## [7.3.2](https://github.com/xing/hops/compare/v7.3.1...v7.3.2) (2017-10-26)


### Bug Fixes

* **react:** fix render context life cycle ([b725d93](https://github.com/xing/hops/commit/b725d93))




<a name="7.3.0"></a>
# [7.3.0](https://github.com/xing/hops/compare/v7.2.0...v7.3.0) (2017-10-26)


### Features

* **react:** add support for hops-graphql ([7a3a86d](https://github.com/xing/hops/commit/7a3a86d))




<a name="7.2.0"></a>
# [7.2.0](https://github.com/xing/hops/compare/v7.1.0...v7.2.0) (2017-10-18)




**Note:** Version bump only for package hops-react

<a name="7.1.0"></a>
# [7.1.0](https://github.com/xing/hops/compare/v7.0.0...v7.1.0) (2017-10-16)




**Note:** Version bump only for package hops-react

<a name="7.0.0"></a>
# [7.0.0](https://github.com/xing/hops/compare/v6.2.8...v7.0.0) (2017-10-13)


### Features

* **react:** split hops packages, introduce changelog
