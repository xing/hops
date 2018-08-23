# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="11.0.0-rc.30"></a>
# [11.0.0-rc.30](https://github.com/xing/hops/compare/v11.0.0-rc.29...v11.0.0-rc.30) (2018-08-23)


### Bug Fixes

* **graphql:** operation name support for introspection query ([4935b1b](https://github.com/xing/hops/commit/4935b1b))





<a name="11.0.0-rc.29"></a>
# [11.0.0-rc.29](https://github.com/xing/hops/compare/v11.0.0-rc.28...v11.0.0-rc.29) (2018-08-21)

**Note:** Version bump only for package hops-graphql





<a name="11.0.0-rc.28"></a>
# [11.0.0-rc.28](https://github.com/xing/hops/compare/v11.0.0-rc.27...v11.0.0-rc.28) (2018-08-15)

**Note:** Version bump only for package hops-graphql





<a name="11.0.0-rc.27"></a>
# [11.0.0-rc.27](https://github.com/xing/hops/compare/v11.0.0-rc.26...v11.0.0-rc.27) (2018-08-06)




**Note:** Version bump only for package hops-graphql

<a name="11.0.0-rc.26"></a>
# [11.0.0-rc.26](https://github.com/xing/hops/compare/v10.4.6...v11.0.0-rc.26) (2018-08-01)


### Bug Fixes

* **graphql:** pass apollo state to getTemplateData.globals ([9cf55a3](https://github.com/xing/hops/commit/9cf55a3))
* upgrade dependencies ([b61e8eb](https://github.com/xing/hops/commit/b61e8eb))
* upgrade untool packages ([39fd3e1](https://github.com/xing/hops/commit/39fd3e1))
* Use renamed untool getConfigAndMixins function ([0304f8e](https://github.com/xing/hops/commit/0304f8e))


### Chores

* specify engines as >=8.10 in all packages ([1b7a1d2](https://github.com/xing/hops/commit/1b7a1d2))


### Code Refactoring

* **graphql:** namespace render options ([cb92adb](https://github.com/xing/hops/commit/cb92adb))


### Features

* **apollo:** introduce configureFetch hook ([26a5f9f](https://github.com/xing/hops/commit/26a5f9f))
* **graphql:** add overridable getApolloLink hook ([e0b204a](https://github.com/xing/hops/commit/e0b204a))
* **graphql:** implement "shouldPrefetchOnServer" hook/preset option ([5a3cad5](https://github.com/xing/hops/commit/5a3cad5))
* **graphql:** remove configureFetch hook ([7bf732d](https://github.com/xing/hops/commit/7bf732d))
* **graphql:** remove usage of instrumanted fetch ([f20fd19](https://github.com/xing/hops/commit/f20fd19))
* **graphql:** use shouldPrefetchOnServer to enable prefetching of data ([be550ac](https://github.com/xing/hops/commit/be550ac))
* **postcss:** implement postcss package ([6091ed7](https://github.com/xing/hops/commit/6091ed7))
* **preset-defaults:** move default presets into separate package ([722f67c](https://github.com/xing/hops/commit/722f67c))


### BREAKING CHANGES

* **graphql:** graphql specific options are now namespaced
If you want to pass options to the hops-graphql package you need to pass
them to the render function inside a `graphql` key:
**Before:**
```javascript
render(<MyApp />, { link: new Link() });
```
**After:**
```javascript
render(<MyApp />, { graphql: { link: new Link() } });
```
* Increase minimum required Node.js version from 6 to 8
This commit specifies Node.js 8.10 as minimum required version in all
packages.




<a name="11.0.0-rc.25"></a>
# [11.0.0-rc.25](https://github.com/xing/hops/compare/v10.4.6...v11.0.0-rc.25) (2018-07-31)


### Bug Fixes

* **graphql:** pass apollo state to getTemplateData.globals ([9cf55a3](https://github.com/xing/hops/commit/9cf55a3))
* upgrade dependencies ([b61e8eb](https://github.com/xing/hops/commit/b61e8eb))
* upgrade untool packages ([39fd3e1](https://github.com/xing/hops/commit/39fd3e1))
* Use renamed untool getConfigAndMixins function ([0304f8e](https://github.com/xing/hops/commit/0304f8e))


### Chores

* specify engines as >=8.10 in all packages ([1b7a1d2](https://github.com/xing/hops/commit/1b7a1d2))


### Code Refactoring

* **graphql:** namespace render options ([cb92adb](https://github.com/xing/hops/commit/cb92adb))


### Features

* **apollo:** introduce configureFetch hook ([26a5f9f](https://github.com/xing/hops/commit/26a5f9f))
* **graphql:** add overridable getApolloLink hook ([e0b204a](https://github.com/xing/hops/commit/e0b204a))
* **graphql:** implement "shouldPrefetchOnServer" hook/preset option ([5a3cad5](https://github.com/xing/hops/commit/5a3cad5))
* **graphql:** remove configureFetch hook ([7bf732d](https://github.com/xing/hops/commit/7bf732d))
* **graphql:** use shouldPrefetchOnServer to enable prefetching of data ([be550ac](https://github.com/xing/hops/commit/be550ac))
* **postcss:** implement postcss package ([6091ed7](https://github.com/xing/hops/commit/6091ed7))
* **preset-defaults:** move default presets into separate package ([722f67c](https://github.com/xing/hops/commit/722f67c))


### BREAKING CHANGES

* **graphql:** graphql specific options are now namespaced
If you want to pass options to the hops-graphql package you need to pass
them to the render function inside a `graphql` key:
**Before:**
```javascript
render(<MyApp />, { link: new Link() });
```
**After:**
```javascript
render(<MyApp />, { graphql: { link: new Link() } });
```
* Increase minimum required Node.js version from 6 to 8
This commit specifies Node.js 8.10 as minimum required version in all
packages.




<a name="11.0.0-rc.23"></a>
# [11.0.0-rc.23](https://github.com/xing/hops/compare/v11.0.0-rc.22...v11.0.0-rc.23) (2018-07-26)


### Bug Fixes

* upgrade untool packages ([1bd0829](https://github.com/xing/hops/commit/1bd0829))


### Features

* **graphql:** implement "shouldPrefetchOnServer" hook/preset option ([dd06697](https://github.com/xing/hops/commit/dd06697))
* **graphql:** remove configureFetch hook ([73119c6](https://github.com/xing/hops/commit/73119c6))




<a name="11.0.0-rc.22"></a>
# [11.0.0-rc.22](https://github.com/xing/hops/compare/v11.0.0-rc.21...v11.0.0-rc.22) (2018-07-25)


### Bug Fixes

* upgrade dependencies ([e92e305](https://github.com/xing/hops/commit/e92e305))




<a name="11.0.0-rc.21"></a>
# [11.0.0-rc.21](https://github.com/xing/hops/compare/v11.0.0-rc.20...v11.0.0-rc.21) (2018-07-20)


### Features

* **apollo:** introduce configureFetch hook ([ebe9f9b](https://github.com/xing/hops/commit/ebe9f9b))




<a name="11.0.0-rc.19"></a>
# [11.0.0-rc.19](https://github.com/xing/hops/compare/v10.4.6...v11.0.0-rc.19) (2018-07-19)


### Bug Fixes

* **graphql:** pass apollo state to getTemplateData.globals ([ed64cef](https://github.com/xing/hops/commit/ed64cef))
* Use renamed untool getConfigAndMixins function ([0d16963](https://github.com/xing/hops/commit/0d16963))


### Chores

* specify engines as >=8.10 in all packages ([bb20aa6](https://github.com/xing/hops/commit/bb20aa6))


### Code Refactoring

* **graphql:** namespace render options ([80847df](https://github.com/xing/hops/commit/80847df))


### Features

* **graphql:** add overridable getApolloLink hook ([0bc798e](https://github.com/xing/hops/commit/0bc798e))
* **graphql:** use shouldPrefetchOnServer to enable prefetching of data ([86345e3](https://github.com/xing/hops/commit/86345e3))
* **postcss:** implement postcss package ([46ec09e](https://github.com/xing/hops/commit/46ec09e))
* **preset-defaults:** move default presets into separate package ([f8a095a](https://github.com/xing/hops/commit/f8a095a))


### BREAKING CHANGES

* **graphql:** graphql specific options are now namespaced
If you want to pass options to the hops-graphql package you need to pass
them to the render function inside a `graphql` key:
**Before:**
```javascript
render(<MyApp />, { link: new Link() });
```
**After:**
```javascript
render(<MyApp />, { graphql: { link: new Link() } });
```
* Increase minimum required Node.js version from 6 to 8
This commit specifies Node.js 8.10 as minimum required version in all
packages.




<a name="11.0.0-rc.17"></a>
# [11.0.0-rc.17](https://github.com/xing/hops/compare/v11.0.0-rc.16...v11.0.0-rc.17) (2018-07-09)




**Note:** Version bump only for package hops-graphql

<a name="11.0.0-rc.16"></a>
# [11.0.0-rc.16](https://github.com/xing/hops/compare/v11.0.0-rc.15...v11.0.0-rc.16) (2018-07-09)




**Note:** Version bump only for package hops-graphql

<a name="11.0.0-rc.14"></a>
# [11.0.0-rc.14](https://github.com/xing/hops/compare/v11.0.0-rc.13...v11.0.0-rc.14) (2018-07-04)


### Bug Fixes

* Use renamed untool getConfigAndMixins function ([a891183](https://github.com/xing/hops/commit/a891183))




<a name="11.0.0-rc.13"></a>
# [11.0.0-rc.13](https://github.com/xing/hops/compare/v11.0.0-rc.12...v11.0.0-rc.13) (2018-07-04)




**Note:** Version bump only for package hops-graphql

<a name="11.0.0-rc.12"></a>
# [11.0.0-rc.12](https://github.com/xing/hops/compare/v11.0.0-rc.11...v11.0.0-rc.12) (2018-06-28)


### Code Refactoring

* **graphql:** namespace render options ([9da5664](https://github.com/xing/hops/commit/9da5664))


### BREAKING CHANGES

* **graphql:** graphql specific options are now namespaced
If you want to pass options to the hops-graphql package you need to pass
them to the render function inside a `graphql` key:
**Before:**
```javascript
render(<MyApp />, { link: new Link() });
```
**After:**
```javascript
render(<MyApp />, { graphql: { link: new Link() } });
```




<a name="11.0.0-rc.11"></a>
# [11.0.0-rc.11](https://github.com/xing/hops/compare/v11.0.0-rc.10...v11.0.0-rc.11) (2018-06-27)




**Note:** Version bump only for package hops-graphql

<a name="11.0.0-rc.10"></a>
# [11.0.0-rc.10](https://github.com/xing/hops/compare/v11.0.0-rc.9...v11.0.0-rc.10) (2018-06-27)


### Bug Fixes

* **graphql:** pass apollo state to getTemplateData.globals ([c8843bd](https://github.com/xing/hops/commit/c8843bd))


### Features

* **graphql:** use shouldPrefetchOnServer to enable prefetching of data ([fceeeab](https://github.com/xing/hops/commit/fceeeab))




<a name="11.0.0-rc.9"></a>
# [11.0.0-rc.9](https://github.com/xing/hops/compare/v11.0.0-rc.8...v11.0.0-rc.9) (2018-06-27)




**Note:** Version bump only for package hops-graphql

<a name="11.0.0-rc.8"></a>
# [11.0.0-rc.8](https://github.com/xing/hops/compare/v11.0.0-rc.7...v11.0.0-rc.8) (2018-06-26)




**Note:** Version bump only for package hops-graphql

<a name="11.0.0-rc.5"></a>
# [11.0.0-rc.5](https://github.com/xing/hops/compare/v11.0.0-rc.4...v11.0.0-rc.5) (2018-06-25)


### Features

* **postcss:** implement postcss package ([7e79abd](https://github.com/xing/hops/commit/7e79abd))




<a name="11.0.0-rc.4"></a>
# [11.0.0-rc.4](https://github.com/xing/hops/compare/v11.0.0-rc.3...v11.0.0-rc.4) (2018-06-05)




**Note:** Version bump only for package hops-graphql

<a name="11.0.0-rc.3"></a>
# [11.0.0-rc.3](https://github.com/xing/hops/compare/v10.4.3...v11.0.0-rc.3) (2018-05-25)


### Chores

* specify engines as >=8.10 in all packages ([335fd84](https://github.com/xing/hops/commit/335fd84))
* specify engines as >=8.10 in all packages ([9228cb1](https://github.com/xing/hops/commit/9228cb1))


### Features

* **preset-defaults:** move default presets into separate package ([4d726bf](https://github.com/xing/hops/commit/4d726bf))


### BREAKING CHANGES

* Increase minimum required Node.js version from 6 to 8
This commit specifies Node.js 8.10 as minimum required version in all
packages.
* Increase minimum required Node.js version from 6 to 8
This commit specifies Node.js 8.10 as minimum required version in all
packages.




<a name="11.0.0-rc.1"></a>
# [11.0.0-rc.1](https://github.com/xing/hops/compare/v11.0.0-rc.0...v11.0.0-rc.1) (2018-05-23)




**Note:** Version bump only for package hops-graphql

<a name="11.0.0-rc.0"></a>
# [11.0.0-rc.0](https://github.com/xing/hops/compare/v10.4.3...v11.0.0-rc.0) (2018-05-22)


### Chores

* specify engines as >=8.10 in all packages ([bc24dca](https://github.com/xing/hops/commit/bc24dca))
* specify engines as >=8.10 in all packages ([9228cb1](https://github.com/xing/hops/commit/9228cb1))


### Features

* **preset-defaults:** move default presets into separate package ([9000cb0](https://github.com/xing/hops/commit/9000cb0))


### BREAKING CHANGES

* Increase minimum required Node.js version from 6 to 8
This commit specifies Node.js 8.10 as minimum required version in all
packages.
* Increase minimum required Node.js version from 6 to 8
This commit specifies Node.js 8.10 as minimum required version in all
packages.




<a name="10.4.3"></a>
## [10.4.3](https://github.com/xing/hops/compare/v10.4.2...v10.4.3) (2018-04-24)




**Note:** Version bump only for package hops-graphql

<a name="10.4.0"></a>
# [10.4.0](https://github.com/xing/hops/compare/v10.2.0-rc.5...v10.4.0) (2018-04-17)


### Features

* **graphql:** add "--header/-H" CLI option to introspect command ([671193d](https://github.com/xing/hops/commit/671193d))
* **graphql:** Generate fragment types from schema file ([5d86841](https://github.com/xing/hops/commit/5d86841))




<a name="10.3.0"></a>
# [10.3.0](https://github.com/xing/hops/compare/v10.3.0-rc.3...v10.3.0) (2018-04-09)




**Note:** Version bump only for package hops-graphql

<a name="10.2.0"></a>
# [10.2.0](https://github.com/xing/hops/compare/v10.2.0-rc.5...v10.2.0) (2018-03-26)




**Note:** Version bump only for package hops-graphql

<a name="10.0.0"></a>
# [10.0.0](https://github.com/xing/hops/compare/v10.0.0-rc.4...v10.0.0) (2018-02-07)




**Note:** Version bump only for package hops-graphql

<a name="9.7.0"></a>
# [9.7.0](https://github.com/xing/hops/compare/v9.6.1...v9.7.0) (2018-01-22)


### Bug Fixes

* **graphql:** fix console output ([85556fb](https://github.com/xing/hops/commit/85556fb))




<a name="9.5.0"></a>
# [9.5.0](https://github.com/xing/hops/compare/v9.4.3...v9.5.0) (2018-01-09)


### Bug Fixes

* **graphql:** get rid of webpack warning ([f0aba04](https://github.com/xing/hops/commit/f0aba04))




<a name="9.4.0"></a>
# [9.4.0](https://github.com/xing/hops/compare/v9.3.2...v9.4.0) (2018-01-08)


### Features

* **graphql:** make CLI commands compatible with hops-local-cli & hops ([a278d1d](https://github.com/xing/hops/commit/a278d1d))




<a name="9.3.0"></a>
# [9.3.0](https://github.com/xing/hops/compare/v9.2.0...v9.3.0) (2017-12-14)




**Note:** Version bump only for package hops-graphql

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
