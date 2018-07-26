# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="11.0.0-rc.24"></a>
# [11.0.0-rc.24](https://github.com/xing/hops/compare/v11.0.0-rc.23...v11.0.0-rc.24) (2018-07-26)




**Note:** Version bump only for package hops-template-redux

<a name="11.0.0-rc.23"></a>
# [11.0.0-rc.23](https://github.com/xing/hops/compare/v11.0.0-rc.22...v11.0.0-rc.23) (2018-07-26)




**Note:** Version bump only for package hops-template-redux

<a name="11.0.0-rc.22"></a>
# [11.0.0-rc.22](https://github.com/xing/hops/compare/v11.0.0-rc.21...v11.0.0-rc.22) (2018-07-25)


### Bug Fixes

* upgrade dependencies ([e92e305](https://github.com/xing/hops/commit/e92e305))




<a name="11.0.0-rc.21"></a>
# [11.0.0-rc.21](https://github.com/xing/hops/compare/v11.0.0-rc.20...v11.0.0-rc.21) (2018-07-20)




**Note:** Version bump only for package hops-template-redux

<a name="11.0.0-rc.20"></a>
# [11.0.0-rc.20](https://github.com/xing/hops/compare/v11.0.0-rc.19...v11.0.0-rc.20) (2018-07-19)




**Note:** Version bump only for package hops-template-redux

<a name="11.0.0-rc.19"></a>
# [11.0.0-rc.19](https://github.com/xing/hops/compare/v10.4.6...v11.0.0-rc.19) (2018-07-19)


### Bug Fixes

* do not use nested css as it is not supported anymore ([f85dc75](https://github.com/xing/hops/commit/f85dc75))


### Code Refactoring

* **redux:** namespace render options ([c83d9aa](https://github.com/xing/hops/commit/c83d9aa))


### Features

* **postcss:** implement postcss package ([46ec09e](https://github.com/xing/hops/commit/46ec09e))
* **redux:** use shouldPrefetchOnServer instead of _hopsStatic ([e601483](https://github.com/xing/hops/commit/e601483))
* **template-redux:** introduce react/redux template ([a6511a2](https://github.com/xing/hops/commit/a6511a2))


### BREAKING CHANGES

* **redux:** redux specific options are now namespaced
If you want to pass options to the hops-redux package you need to pass
them to the render function inside a `redux` key:
**Before:**
```javascript
render(<MyApp />, { reducers: {...} });
```
**After:**
```javascript
render(<MyApp />, { redux: { reducers: {...}  } });
```




<a name="11.0.0-rc.17"></a>
# [11.0.0-rc.17](https://github.com/xing/hops/compare/v11.0.0-rc.16...v11.0.0-rc.17) (2018-07-09)




**Note:** Version bump only for package hops-template-redux

<a name="11.0.0-rc.16"></a>
# [11.0.0-rc.16](https://github.com/xing/hops/compare/v11.0.0-rc.15...v11.0.0-rc.16) (2018-07-09)




**Note:** Version bump only for package hops-template-redux

<a name="11.0.0-rc.14"></a>
# [11.0.0-rc.14](https://github.com/xing/hops/compare/v11.0.0-rc.13...v11.0.0-rc.14) (2018-07-04)




**Note:** Version bump only for package hops-template-redux

<a name="11.0.0-rc.13"></a>
# [11.0.0-rc.13](https://github.com/xing/hops/compare/v11.0.0-rc.12...v11.0.0-rc.13) (2018-07-04)




**Note:** Version bump only for package hops-template-redux

<a name="11.0.0-rc.12"></a>
# [11.0.0-rc.12](https://github.com/xing/hops/compare/v11.0.0-rc.11...v11.0.0-rc.12) (2018-06-28)


### Code Refactoring

* **redux:** namespace render options ([34653f0](https://github.com/xing/hops/commit/34653f0))


### BREAKING CHANGES

* **redux:** redux specific options are now namespaced
If you want to pass options to the hops-redux package you need to pass
them to the render function inside a `redux` key:
**Before:**
```javascript
render(<MyApp />, { reducers: {...} });
```
**After:**
```javascript
render(<MyApp />, { redux: { reducers: {...}  } });
```




<a name="11.0.0-rc.11"></a>
# [11.0.0-rc.11](https://github.com/xing/hops/compare/v11.0.0-rc.10...v11.0.0-rc.11) (2018-06-27)




**Note:** Version bump only for package hops-template-redux

<a name="11.0.0-rc.10"></a>
# [11.0.0-rc.10](https://github.com/xing/hops/compare/v11.0.0-rc.9...v11.0.0-rc.10) (2018-06-27)




**Note:** Version bump only for package hops-template-redux

<a name="11.0.0-rc.9"></a>
# [11.0.0-rc.9](https://github.com/xing/hops/compare/v11.0.0-rc.8...v11.0.0-rc.9) (2018-06-27)




**Note:** Version bump only for package hops-template-redux

<a name="11.0.0-rc.8"></a>
# [11.0.0-rc.8](https://github.com/xing/hops/compare/v11.0.0-rc.7...v11.0.0-rc.8) (2018-06-26)




**Note:** Version bump only for package hops-template-redux

<a name="11.0.0-rc.7"></a>
# [11.0.0-rc.7](https://github.com/xing/hops/compare/v11.0.0-rc.6...v11.0.0-rc.7) (2018-06-25)




**Note:** Version bump only for package hops-template-redux

<a name="11.0.0-rc.6"></a>
# [11.0.0-rc.6](https://github.com/xing/hops/compare/v11.0.0-rc.5...v11.0.0-rc.6) (2018-06-25)




**Note:** Version bump only for package hops-template-redux

<a name="11.0.0-rc.5"></a>
# [11.0.0-rc.5](https://github.com/xing/hops/compare/v11.0.0-rc.4...v11.0.0-rc.5) (2018-06-25)


### Features

* **postcss:** implement postcss package ([7e79abd](https://github.com/xing/hops/commit/7e79abd))
* **redux:** use shouldPrefetchOnServer instead of _hopsStatic ([5ca5843](https://github.com/xing/hops/commit/5ca5843))




<a name="11.0.0-rc.4"></a>
# [11.0.0-rc.4](https://github.com/xing/hops/compare/v11.0.0-rc.3...v11.0.0-rc.4) (2018-06-05)


### Bug Fixes

* do not use nested css as it is not supported anymore ([cf3d802](https://github.com/xing/hops/commit/cf3d802))




<a name="11.0.0-rc.3"></a>
# [11.0.0-rc.3](https://github.com/xing/hops/compare/v10.4.3...v11.0.0-rc.3) (2018-05-25)


### Features

* **template-redux:** introduce react/redux template ([bf979e0](https://github.com/xing/hops/commit/bf979e0))




<a name="11.0.0-rc.1"></a>
# [11.0.0-rc.1](https://github.com/xing/hops/compare/v11.0.0-rc.0...v11.0.0-rc.1) (2018-05-23)




**Note:** Version bump only for package hops-template-redux

<a name="11.0.0-rc.0"></a>
# [11.0.0-rc.0](https://github.com/xing/hops/compare/v10.4.3...v11.0.0-rc.0) (2018-05-22)


### Features

* **template-redux:** introduce react/redux template ([4342ee4](https://github.com/xing/hops/commit/4342ee4))




<a name="10.4.4"></a>
## [10.4.4](https://github.com/xing/hops/compare/v10.4.3...v10.4.4) (2018-04-26)




**Note:** Version bump only for package hops-template-react

<a name="10.4.3"></a>
## [10.4.3](https://github.com/xing/hops/compare/v10.4.2...v10.4.3) (2018-04-24)


### Bug Fixes

* update dependency redux to v4 ([0b6c6d4](https://github.com/xing/hops/commit/0b6c6d4))




<a name="10.4.2"></a>
## [10.4.2](https://github.com/xing/hops/compare/v10.4.1...v10.4.2) (2018-04-18)




**Note:** Version bump only for package hops-template-react

<a name="10.4.1"></a>
## [10.4.1](https://github.com/xing/hops/compare/v10.4.0...v10.4.1) (2018-04-18)




**Note:** Version bump only for package hops-template-react

<a name="10.4.0"></a>
# [10.4.0](https://github.com/xing/hops/compare/v10.2.0-rc.5...v10.4.0) (2018-04-17)




**Note:** Version bump only for package hops-template-react

<a name="10.3.0"></a>
# [10.3.0](https://github.com/xing/hops/compare/v10.3.0-rc.3...v10.3.0) (2018-04-09)




**Note:** Version bump only for package hops-template-react

<a name="10.2.0"></a>
# [10.2.0](https://github.com/xing/hops/compare/v10.2.0-rc.5...v10.2.0) (2018-03-26)




**Note:** Version bump only for package hops-template-react

<a name="10.1.0"></a>
# [10.1.0](https://github.com/xing/hops/compare/v10.0.2...v10.1.0) (2018-02-19)




**Note:** Version bump only for package hops-template-react

<a name="10.0.2"></a>
## [10.0.2](https://github.com/xing/hops/compare/v10.0.1...v10.0.2) (2018-02-15)




**Note:** Version bump only for package hops-template-react

<a name="10.0.1"></a>
## [10.0.1](https://github.com/xing/hops/compare/v10.0.0...v10.0.1) (2018-02-09)




**Note:** Version bump only for package hops-template-react

<a name="10.0.0"></a>
# [10.0.0](https://github.com/xing/hops/compare/v10.0.0-rc.4...v10.0.0) (2018-02-07)




**Note:** Version bump only for package hops-template-react

<a name="9.8.0"></a>
# [9.8.0](https://github.com/xing/hops/compare/v9.7.0...v9.8.0) (2018-01-25)




**Note:** Version bump only for package hops-template-react

<a name="9.7.0"></a>
# [9.7.0](https://github.com/xing/hops/compare/v9.6.1...v9.7.0) (2018-01-22)




**Note:** Version bump only for package hops-template-react

<a name="9.6.1"></a>
## [9.6.1](https://github.com/xing/hops/compare/v9.6.0...v9.6.1) (2018-01-12)




**Note:** Version bump only for package hops-template-react

<a name="9.6.0"></a>
# [9.6.0](https://github.com/xing/hops/compare/v9.5.0...v9.6.0) (2018-01-09)




**Note:** Version bump only for package hops-template-react

<a name="9.5.0"></a>
# [9.5.0](https://github.com/xing/hops/compare/v9.4.3...v9.5.0) (2018-01-09)




**Note:** Version bump only for package hops-template-react

<a name="9.4.3"></a>
## [9.4.3](https://github.com/xing/hops/compare/v9.4.2...v9.4.3) (2018-01-08)




**Note:** Version bump only for package hops-template-react

<a name="9.4.2"></a>
## [9.4.2](https://github.com/xing/hops/compare/v9.4.1...v9.4.2) (2018-01-08)




**Note:** Version bump only for package hops-template-react

<a name="9.4.1"></a>
## [9.4.1](https://github.com/xing/hops/compare/v9.4.0...v9.4.1) (2018-01-08)




**Note:** Version bump only for package hops-template-react

<a name="9.4.0"></a>
# [9.4.0](https://github.com/xing/hops/compare/v9.3.2...v9.4.0) (2018-01-08)




**Note:** Version bump only for package hops-template-react

<a name="9.3.2"></a>
## [9.3.2](https://github.com/xing/hops/compare/v9.3.1...v9.3.2) (2018-01-08)




**Note:** Version bump only for package hops-template-react

<a name="9.3.1"></a>
## [9.3.1](https://github.com/xing/hops/compare/v9.3.0...v9.3.1) (2017-12-15)




**Note:** Version bump only for package hops-template-react

<a name="9.3.0"></a>
# [9.3.0](https://github.com/xing/hops/compare/v9.2.0...v9.3.0) (2017-12-14)




**Note:** Version bump only for package hops-template-react

<a name="9.2.0"></a>
# [9.2.0](https://github.com/xing/hops/compare/v9.1.1...v9.2.0) (2017-12-11)




**Note:** Version bump only for package hops-template-react

<a name="9.1.1"></a>
## [9.1.1](https://github.com/xing/hops/compare/v9.1.0...v9.1.1) (2017-12-05)




**Note:** Version bump only for package hops-template-react

<a name="9.1.0"></a>
# [9.1.0](https://github.com/xing/hops/compare/v9.0.1...v9.1.0) (2017-11-29)




**Note:** Version bump only for package hops-template-react

<a name="9.0.0"></a>
# [9.0.0](https://github.com/xing/hops/compare/v8.0.0...v9.0.0) (2017-11-27)




**Note:** Version bump only for package hops-template-react

<a name="8.0.0"></a>
# [8.0.0](https://github.com/xing/hops/compare/v7.4.1...v8.0.0) (2017-11-22)


### Bug Fixes

* **template-react:** add missing prop-types dependency ([5fb80f2](https://github.com/xing/hops/commit/5fb80f2))
* **template-react:** keep gitignore after publish by renaming it ([afb28ae](https://github.com/xing/hops/commit/afb28ae))


### Code Refactoring

* **template-react:** remove flow type annotations ([4f7bba9](https://github.com/xing/hops/commit/4f7bba9))
* **template-react:** remove graphql from default template ([4533445](https://github.com/xing/hops/commit/4533445))


### BREAKING CHANGES

* **template-react:** The template `hops-template-react` now no longer contains flow type
annotations.

Closes: #277
* **template-react:** `hops-template-react` (default template) now no longer supports graphql
out of the box. You can add the support yourself again or use a
different template (we will provide a new `hops-template-graphql`
shortly).

Closes: #276




<a name="7.4.1"></a>
## [7.4.1](https://github.com/xing/hops/compare/v7.4.0...v7.4.1) (2017-11-08)




**Note:** Version bump only for package hops-template-react

<a name="7.4.0"></a>
# [7.4.0](https://github.com/xing/hops/compare/v7.3.5...v7.4.0) (2017-11-01)




**Note:** Version bump only for package hops-template-react

<a name="7.3.5"></a>
## [7.3.5](https://github.com/xing/hops/compare/v7.3.4...v7.3.5) (2017-10-27)




**Note:** Version bump only for package hops-template-react

<a name="7.3.4"></a>
## [7.3.4](https://github.com/xing/hops/compare/v7.3.3...v7.3.4) (2017-10-27)




**Note:** Version bump only for package hops-template-react

<a name="7.3.3"></a>
## [7.3.3](https://github.com/xing/hops/compare/v7.3.2...v7.3.3) (2017-10-26)




**Note:** Version bump only for package hops-template-react

<a name="7.3.2"></a>
## [7.3.2](https://github.com/xing/hops/compare/v7.3.1...v7.3.2) (2017-10-26)




**Note:** Version bump only for package hops-template-react

<a name="7.3.1"></a>
## [7.3.1](https://github.com/xing/hops/compare/v7.3.0...v7.3.1) (2017-10-26)




**Note:** Version bump only for package hops-template-react

<a name="7.3.0"></a>
# [7.3.0](https://github.com/xing/hops/compare/v7.2.0...v7.3.0) (2017-10-26)


### Features

* **template-react:** add support for current hops-graphql features ([5f3708e](https://github.com/xing/hops/commit/5f3708e))
* **template-react:** add support for hops-graphql ([b070ad5](https://github.com/xing/hops/commit/b070ad5))
* **template-react:** upgrade to latest react-apollo release condidate ([c81ed7e](https://github.com/xing/hops/commit/c81ed7e))




<a name="7.2.0"></a>
# [7.2.0](https://github.com/xing/hops/compare/v7.1.0...v7.2.0) (2017-10-18)




**Note:** Version bump only for package hops-template-react

<a name="7.1.0"></a>
# [7.1.0](https://github.com/xing/hops/compare/v7.0.0...v7.1.0) (2017-10-16)




**Note:** Version bump only for package hops-template-react

<a name="7.0.0"></a>
# [7.0.0](https://github.com/xing/hops/compare/v6.2.8...v7.0.0) (2017-10-13)


### Features

* **template-react:** split hops packages, introduce changelog
