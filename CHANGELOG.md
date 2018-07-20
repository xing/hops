# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="11.0.0-rc.21"></a>
# [11.0.0-rc.21](https://github.com/xing/hops/compare/v11.0.0-rc.20...v11.0.0-rc.21) (2018-07-20)


### Features

* **apollo:** introduce configureFetch hook ([ebe9f9b](https://github.com/xing/hops/commit/ebe9f9b))




<a name="11.0.0-rc.20"></a>
# [11.0.0-rc.20](https://github.com/xing/hops/compare/v11.0.0-rc.19...v11.0.0-rc.20) (2018-07-19)


### Features

* **redux:** add fetch to thunks ([3d6a5f2](https://github.com/xing/hops/commit/3d6a5f2))




<a name="11.0.0-rc.19"></a>
# [11.0.0-rc.19](https://github.com/xing/hops/compare/v10.4.6...v11.0.0-rc.19) (2018-07-19)


### Bug Fixes

* **config:** add missing browser.js to package ([7796873](https://github.com/xing/hops/commit/7796873))
* **config:** environmentalize config ([787f9cc](https://github.com/xing/hops/commit/787f9cc))
* **config:** replace env placeholders with environment variables ([e79c40b](https://github.com/xing/hops/commit/e79c40b))
* **config:** use aliased config when building for browser env ([9fab161](https://github.com/xing/hops/commit/9fab161))
* **express:** also detect ipv6 bind-all and loopback as localhost ([3890c9b](https://github.com/xing/hops/commit/3890c9b))
* **express:** resolve circular dependency ([01b48ef](https://github.com/xing/hops/commit/01b48ef))
* **express:** return app in configureServer hook ([64fbd80](https://github.com/xing/hops/commit/64fbd80))
* **graphql:** pass apollo state to getTemplateData.globals ([ed64cef](https://github.com/xing/hops/commit/ed64cef))
* **lambda:** include missing preset.js in released package ([fcada97](https://github.com/xing/hops/commit/fcada97))
* **postcss:**  fix prefixes in dev and prod being different ([7bc95d7](https://github.com/xing/hops/commit/7bc95d7))
* **postcss:** add missing postcss features that were supported before ([c65a1f4](https://github.com/xing/hops/commit/c65a1f4))
* **pwa:** include babel polyfill and use config from [@untool](https://github.com/untool)/config ([c540dd8](https://github.com/xing/hops/commit/c540dd8))
* **pwa:** worker function receives both config and assets as arguments ([b1f3276](https://github.com/xing/hops/commit/b1f3276))
* **react:** add missing files to package.json ([34a4208](https://github.com/xing/hops/commit/34a4208))
* **react:** do not fail if _hopsEnvironmentVariables is not defined ([6b0fae4](https://github.com/xing/hops/commit/6b0fae4))
* **react:** do not set shouldPrefetchOnServer from config ([b519993](https://github.com/xing/hops/commit/b519993))
* **react:** try to acess env var on `process.env` first ([7ae00ac](https://github.com/xing/hops/commit/7ae00ac))
* **redux:** add missing actionCreatorDispatcher files to package ([b1ebe2d](https://github.com/xing/hops/commit/b1ebe2d))
* **redux:** specify esnext field to transpile code ([58a6b09](https://github.com/xing/hops/commit/58a6b09))
* **spec:** ignore case of stdout output ([7c63206](https://github.com/xing/hops/commit/7c63206))
* **template-minimal:** adapt to new render method signature ([4193c72](https://github.com/xing/hops/commit/4193c72))
* **template-react:** remove env variable access to fix tests ([6892dc8](https://github.com/xing/hops/commit/6892dc8))
* do not use nested css as it is not supported anymore ([f85dc75](https://github.com/xing/hops/commit/f85dc75))
* use renamed getTemplateData hook in favor of enhanceData ([31ecf4f](https://github.com/xing/hops/commit/31ecf4f))
* Use renamed untool getConfigAndMixins function ([0d16963](https://github.com/xing/hops/commit/0d16963))


### Chores

* specify engines as >=8.10 in all packages ([bb20aa6](https://github.com/xing/hops/commit/bb20aa6))


### Code Refactoring

* **graphql:** namespace render options ([80847df](https://github.com/xing/hops/commit/80847df))
* **redux:** namespace render options ([c83d9aa](https://github.com/xing/hops/commit/c83d9aa))


### Features

* **cli:** add dotenv support ([2f68e19](https://github.com/xing/hops/commit/2f68e19))
* **cli:** remove dotenv again as it is now part of untool ([cd6936c](https://github.com/xing/hops/commit/cd6936c))
* **config:** export config through "hops-config" ([7929964](https://github.com/xing/hops/commit/7929964))
* **express:** enable gzip compression when serving in production mode ([812e588](https://github.com/xing/hops/commit/812e588))
* **express:** implement hops-express package to customize server ([7c17fe7](https://github.com/xing/hops/commit/7c17fe7))
* **graphql:** add overridable getApolloLink hook ([0bc798e](https://github.com/xing/hops/commit/0bc798e))
* **graphql:** use shouldPrefetchOnServer to enable prefetching of data ([86345e3](https://github.com/xing/hops/commit/86345e3))
* **postcss:** implement postcss package ([46ec09e](https://github.com/xing/hops/commit/46ec09e))
* **preset-defaults:** move default presets into separate package ([f8a095a](https://github.com/xing/hops/commit/f8a095a))
* **pwa:** allow service worker registration on all local interfaces ([878011e](https://github.com/xing/hops/commit/878011e))
* **pwa:** implement hops-pwa as mixin ([28eb3e0](https://github.com/xing/hops/commit/28eb3e0))
* **react:** add server data HOC ([0d8dbb4](https://github.com/xing/hops/commit/0d8dbb4))
* **react:** implement server components ([8249d90](https://github.com/xing/hops/commit/8249d90))
* **react:** pass CLI arguments to runtime mixins / React HoC ([5e455c2](https://github.com/xing/hops/commit/5e455c2))
* **react:** pass environment variables to React HoC ([5224979](https://github.com/xing/hops/commit/5224979))
* **react:** remove withCLIArguments ([64700bb](https://github.com/xing/hops/commit/64700bb))
* **react:** set res.locals.shouldPrefetchOnServer based on config ([e9a3821](https://github.com/xing/hops/commit/e9a3821))
* **redux:** add action creator dispatcher mixin ([78a848c](https://github.com/xing/hops/commit/78a848c))
* **redux:** add overridable getReduxMiddlewares hook ([ccaefa7](https://github.com/xing/hops/commit/ccaefa7))
* **redux:** expose getReduxStore hook ([9ada268](https://github.com/xing/hops/commit/9ada268))
* **redux:** use shouldPrefetchOnServer instead of _hopsStatic ([e601483](https://github.com/xing/hops/commit/e601483))
* **styled-components:** introduce package ([2a4cb98](https://github.com/xing/hops/commit/2a4cb98))
* **template-redux:** introduce react/redux template ([a6511a2](https://github.com/xing/hops/commit/a6511a2))
* **typescript:** introduce package ([d52d3ae](https://github.com/xing/hops/commit/d52d3ae))
* **typescript:** provide minimal default tsconfig.json ([1ac77d0](https://github.com/xing/hops/commit/1ac77d0))
* **webpack:** print compilation stats and watch runs ([fbe902b](https://github.com/xing/hops/commit/fbe902b))


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




<a name="11.0.0-rc.18"></a>
# [11.0.0-rc.18](https://github.com/xing/hops/compare/v11.0.0-rc.17...v11.0.0-rc.18) (2018-07-09)


### Bug Fixes

* **config:** replace env placeholders with environment variables ([1225753](https://github.com/xing/hops/commit/1225753))




<a name="11.0.0-rc.17"></a>
# [11.0.0-rc.17](https://github.com/xing/hops/compare/v11.0.0-rc.16...v11.0.0-rc.17) (2018-07-09)


### Features

* **cli:** remove dotenv again as it is now part of untool ([1044735](https://github.com/xing/hops/commit/1044735))




<a name="11.0.0-rc.16"></a>
# [11.0.0-rc.16](https://github.com/xing/hops/compare/v11.0.0-rc.15...v11.0.0-rc.16) (2018-07-09)




**Note:** Version bump only for package hops-lerna-root

<a name="11.0.0-rc.15"></a>
# [11.0.0-rc.15](https://github.com/xing/hops/compare/v11.0.0-rc.14...v11.0.0-rc.15) (2018-07-05)


### Bug Fixes

* **config:** environmentalize config ([752e4f5](https://github.com/xing/hops/commit/752e4f5))




<a name="11.0.0-rc.14"></a>
# [11.0.0-rc.14](https://github.com/xing/hops/compare/v11.0.0-rc.13...v11.0.0-rc.14) (2018-07-04)


### Bug Fixes

* Use renamed untool getConfigAndMixins function ([a891183](https://github.com/xing/hops/commit/a891183))
* **react:** do not set shouldPrefetchOnServer from config ([815337a](https://github.com/xing/hops/commit/815337a))




<a name="11.0.0-rc.13"></a>
# [11.0.0-rc.13](https://github.com/xing/hops/compare/v11.0.0-rc.12...v11.0.0-rc.13) (2018-07-04)


### Bug Fixes

* **express:** return app in configureServer hook ([ca07331](https://github.com/xing/hops/commit/ca07331))


### Features

* **express:** enable gzip compression when serving in production mode ([c7be81e](https://github.com/xing/hops/commit/c7be81e))




<a name="11.0.0-rc.12"></a>
# [11.0.0-rc.12](https://github.com/xing/hops/compare/v11.0.0-rc.11...v11.0.0-rc.12) (2018-06-28)


### Code Refactoring

* **graphql:** namespace render options ([9da5664](https://github.com/xing/hops/commit/9da5664))
* **redux:** namespace render options ([34653f0](https://github.com/xing/hops/commit/34653f0))


### Features

* **cli:** add dotenv support ([7b7a683](https://github.com/xing/hops/commit/7b7a683))
* **styled-components:** introduce package ([ffe093a](https://github.com/xing/hops/commit/ffe093a))
* **typescript:** introduce package ([9e13794](https://github.com/xing/hops/commit/9e13794))


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


### Bug Fixes

* **react:** add missing files to package.json ([755f2e5](https://github.com/xing/hops/commit/755f2e5))




<a name="11.0.0-rc.10"></a>
# [11.0.0-rc.10](https://github.com/xing/hops/compare/v11.0.0-rc.9...v11.0.0-rc.10) (2018-06-27)


### Bug Fixes

* **graphql:** pass apollo state to getTemplateData.globals ([c8843bd](https://github.com/xing/hops/commit/c8843bd))


### Features

* **graphql:** use shouldPrefetchOnServer to enable prefetching of data ([fceeeab](https://github.com/xing/hops/commit/fceeeab))
* **react:** add server data HOC ([70ef7ad](https://github.com/xing/hops/commit/70ef7ad))
* **react:** remove withCLIArguments ([92770dd](https://github.com/xing/hops/commit/92770dd))




<a name="11.0.0-rc.9"></a>
# [11.0.0-rc.9](https://github.com/xing/hops/compare/v11.0.0-rc.8...v11.0.0-rc.9) (2018-06-27)


### Bug Fixes

* use renamed getTemplateData hook in favor of enhanceData ([79f939b](https://github.com/xing/hops/commit/79f939b))
* **express:** resolve circular dependency ([3de76ba](https://github.com/xing/hops/commit/3de76ba))
* **lambda:** include missing preset.js in released package ([f26fbfb](https://github.com/xing/hops/commit/f26fbfb))
* **pwa:** include babel polyfill and use config from [@untool](https://github.com/untool)/config ([8647e9c](https://github.com/xing/hops/commit/8647e9c))




<a name="11.0.0-rc.8"></a>
# [11.0.0-rc.8](https://github.com/xing/hops/compare/v11.0.0-rc.7...v11.0.0-rc.8) (2018-06-26)


### Features

* **pwa:** implement hops-pwa as mixin ([bb1edb5](https://github.com/xing/hops/commit/bb1edb5))




<a name="11.0.0-rc.7"></a>
# [11.0.0-rc.7](https://github.com/xing/hops/compare/v11.0.0-rc.6...v11.0.0-rc.7) (2018-06-25)


### Bug Fixes

* **postcss:** add missing postcss features that were supported before ([454666f](https://github.com/xing/hops/commit/454666f))
* **redux:** specify esnext field to transpile code ([888dc09](https://github.com/xing/hops/commit/888dc09))




<a name="11.0.0-rc.6"></a>
# [11.0.0-rc.6](https://github.com/xing/hops/compare/v11.0.0-rc.5...v11.0.0-rc.6) (2018-06-25)


### Bug Fixes

* **redux:** add missing actionCreatorDispatcher files to package ([84170d8](https://github.com/xing/hops/commit/84170d8))




<a name="11.0.0-rc.5"></a>
# [11.0.0-rc.5](https://github.com/xing/hops/compare/v11.0.0-rc.4...v11.0.0-rc.5) (2018-06-25)


### Bug Fixes

* **react:** do not fail if _hopsEnvironmentVariables is not defined ([6bceb66](https://github.com/xing/hops/commit/6bceb66))
* **react:** try to acess env var on `process.env` first ([9d32e7b](https://github.com/xing/hops/commit/9d32e7b))
* **spec:** ignore case of stdout output ([8155e7d](https://github.com/xing/hops/commit/8155e7d))
* **template-react:** remove env variable access to fix tests ([07b6b5b](https://github.com/xing/hops/commit/07b6b5b))


### Features

* **express:** implement hops-express package to customize server ([1f7b991](https://github.com/xing/hops/commit/1f7b991))
* **postcss:** implement postcss package ([7e79abd](https://github.com/xing/hops/commit/7e79abd))
* **react:** implement server components ([95d329f](https://github.com/xing/hops/commit/95d329f))
* **react:** pass CLI arguments to runtime mixins / React HoC ([ef4219f](https://github.com/xing/hops/commit/ef4219f))
* **react:** pass environment variables to React HoC ([ce78057](https://github.com/xing/hops/commit/ce78057))
* **react:** set res.locals.shouldPrefetchOnServer based on config ([8dddb25](https://github.com/xing/hops/commit/8dddb25))
* **redux:** add action creator dispatcher mixin ([2f0e24d](https://github.com/xing/hops/commit/2f0e24d))
* **redux:** use shouldPrefetchOnServer instead of _hopsStatic ([5ca5843](https://github.com/xing/hops/commit/5ca5843))
* **webpack:** print compilation stats and watch runs ([a31b66c](https://github.com/xing/hops/commit/a31b66c))




<a name="11.0.0-rc.4"></a>
# [11.0.0-rc.4](https://github.com/xing/hops/compare/v11.0.0-rc.3...v11.0.0-rc.4) (2018-06-05)


### Bug Fixes

* do not use nested css as it is not supported anymore ([cf3d802](https://github.com/xing/hops/commit/cf3d802))


### Features

* **redux:** expose getReduxStore hook ([d63e2d4](https://github.com/xing/hops/commit/d63e2d4))




<a name="11.0.0-rc.3"></a>
# [11.0.0-rc.3](https://github.com/xing/hops/compare/v10.4.3...v11.0.0-rc.3) (2018-05-25)


### Bug Fixes

* **build-config:** Do not use optimizations that assume concatenation ([57fd846](https://github.com/xing/hops/commit/57fd846))
* **config:** add missing browser.js to package ([16e4d66](https://github.com/xing/hops/commit/16e4d66))
* **config:** use aliased config when building for browser env ([b006a67](https://github.com/xing/hops/commit/b006a67))
* **template-minimal:** adapt to new render method signature ([de9fd46](https://github.com/xing/hops/commit/de9fd46))
* **template-minimal:** remove manifest, use assets from res.locals ([21a5a60](https://github.com/xing/hops/commit/21a5a60))


### Chores

* specify engines as >=8.10 in all packages ([335fd84](https://github.com/xing/hops/commit/335fd84))
* specify engines as >=8.10 in all packages ([9228cb1](https://github.com/xing/hops/commit/9228cb1))


### Features

* support node 8 on AWS Lambda ([fb87ac1](https://github.com/xing/hops/commit/fb87ac1))
* **config:** export config through "hops-config" ([0da18fe](https://github.com/xing/hops/commit/0da18fe))
* **preset-defaults:** move default presets into separate package ([4d726bf](https://github.com/xing/hops/commit/4d726bf))
* **template-redux:** introduce react/redux template ([bf979e0](https://github.com/xing/hops/commit/bf979e0))


### BREAKING CHANGES

* Increase minimum required Node.js version from 6 to 8
This commit specifies Node.js 8.10 as minimum required version in all
packages.
* Increase minimum required Node.js version from 6 to 8
This commit specifies Node.js 8.10 as minimum required version in all
packages.




<a name="11.0.0-rc.2"></a>
# [11.0.0-rc.2](https://github.com/xing/hops/compare/v11.0.0-rc.1...v11.0.0-rc.2) (2018-05-23)


### Bug Fixes

* **config:** use aliased config when building for browser env ([75342ee](https://github.com/xing/hops/commit/75342ee))




<a name="11.0.0-rc.1"></a>
# [11.0.0-rc.1](https://github.com/xing/hops/compare/v11.0.0-rc.0...v11.0.0-rc.1) (2018-05-23)




**Note:** Version bump only for package hops-lerna-root

<a name="11.0.0-rc.0"></a>
# [11.0.0-rc.0](https://github.com/xing/hops/compare/v10.4.3...v11.0.0-rc.0) (2018-05-22)


### Bug Fixes

* **build-config:** Do not use optimizations that assume concatenation ([57fd846](https://github.com/xing/hops/commit/57fd846))
* **template-minimal:** adapt to new render method signature ([4d02eea](https://github.com/xing/hops/commit/4d02eea))
* **template-minimal:** remove manifest, use assets from res.locals ([21a5a60](https://github.com/xing/hops/commit/21a5a60))


### Chores

* specify engines as >=8.10 in all packages ([bc24dca](https://github.com/xing/hops/commit/bc24dca))
* specify engines as >=8.10 in all packages ([9228cb1](https://github.com/xing/hops/commit/9228cb1))


### Features

* support node 8 on AWS Lambda ([fb87ac1](https://github.com/xing/hops/commit/fb87ac1))
* **config:** export config through "hops-config" ([71b319e](https://github.com/xing/hops/commit/71b319e))
* **preset-defaults:** move default presets into separate package ([9000cb0](https://github.com/xing/hops/commit/9000cb0))
* **template-redux:** introduce react/redux template ([4342ee4](https://github.com/xing/hops/commit/4342ee4))


### BREAKING CHANGES

* Increase minimum required Node.js version from 6 to 8
This commit specifies Node.js 8.10 as minimum required version in all
packages.
* Increase minimum required Node.js version from 6 to 8
This commit specifies Node.js 8.10 as minimum required version in all
packages.




<a name="10.3.0"></a>
# [10.3.0](https://github.com/xing/hops/compare/v10.3.0-rc.3...v10.3.0) (2018-04-09)



<a name="10.3.0-rc.3"></a>
# [10.3.0-rc.3](https://github.com/xing/hops/compare/v10.3.0-rc.2...v10.3.0-rc.3) (2018-04-05)


### Bug Fixes

* **build-config:** make service worker plugin async via tapAsync ([f230ffc](https://github.com/xing/hops/commit/f230ffc))
* **build-config:** make webmanifest loader webpack 4 compatible ([1c398ee](https://github.com/xing/hops/commit/1c398ee))
* **react:** do not throw error when no options are passed ([e5bffdd](https://github.com/xing/hops/commit/e5bffdd))


### Features

* **build-config:** add CSS optimizer plugin to minify assets ([236e127](https://github.com/xing/hops/commit/236e127))
* **config:** port defaults to `PORT` environment variable ([4a079b8](https://github.com/xing/hops/commit/4a079b8))
* **express:** choose next free port when hops-config.port is falsy ([62b9b77](https://github.com/xing/hops/commit/62b9b77))



<a name="10.3.0-rc.2"></a>
# [10.3.0-rc.2](https://github.com/xing/hops/compare/v10.3.0-rc.1...v10.3.0-rc.2) (2018-03-27)


### Bug Fixes

* **build:** raise node-mocks-http version to ensure res.locals being set ([e5ae186](https://github.com/xing/hops/commit/e5ae186))


### Features

* **build-config:** switch to mini-css-extract-plugin ([37d5b8f](https://github.com/xing/hops/commit/37d5b8f)), closes [/github.com/webpack-contrib/extract-text-webpack-plugin/issues/731#issuecomment-374548865](https://github.com//github.com/webpack-contrib/extract-text-webpack-plugin/issues/731/issues/issuecomment-374548865)



<a name="10.3.0-rc.1"></a>
# [10.3.0-rc.1](https://github.com/xing/hops/compare/v10.3.0-rc.0...v10.3.0-rc.1) (2018-03-27)


### Bug Fixes

* **build:** do not break build on webpack warnings ([0c1518f](https://github.com/xing/hops/commit/0c1518f))



<a name="10.3.0-rc.0"></a>
# [10.3.0-rc.0](https://github.com/xing/hops/compare/v10.2.0...v10.3.0-rc.0) (2018-03-26)


### Bug Fixes

* **build-config:** use [name]-[chunkhash] as chunk names ([83021d4](https://github.com/xing/hops/commit/83021d4))
* **spec:** re-enable CSS build test ([832cf04](https://github.com/xing/hops/commit/832cf04))


### Features

* **build-config:** get rid of manifest plugin, simplify config loader ([70aa374](https://github.com/xing/hops/commit/70aa374))
* **build-config:** introduce global css mode ([4d9b36f](https://github.com/xing/hops/commit/4d9b36f))
* **build-config:** tweak Webpack configs for v4 ([b28a787](https://github.com/xing/hops/commit/b28a787))
* **build-config:** update to latest alpha of extract text plugin ([823b562](https://github.com/xing/hops/commit/823b562))
* **build-config:** update webpack to v4 ([eafe4f2](https://github.com/xing/hops/commit/eafe4f2))
* **graphql:** add "--header/-H" CLI option to introspect command ([671193d](https://github.com/xing/hops/commit/671193d))
* **graphql:** Generate fragment types from schema file ([5d86841](https://github.com/xing/hops/commit/5d86841))



<a name="10.2.0"></a>
# [10.2.0](https://github.com/xing/hops/compare/v10.2.0-rc.5...v10.2.0) (2018-03-26)


### Bug Fixes

* **build:** exit with exitCode 1 when build fails ([83b9bf6](https://github.com/xing/hops/commit/83b9bf6))



<a name="10.2.0-rc.5"></a>
# [10.2.0-rc.5](https://github.com/xing/hops/compare/v10.2.0-rc.4...v10.2.0-rc.5) (2018-03-16)


### Bug Fixes

* **lambda:** warn about misconfiguration instead of exiting ([4fd8f21](https://github.com/xing/hops/commit/4fd8f21))
* avoid sw.js being loaded from wrong path ([14ec44b](https://github.com/xing/hops/commit/14ec44b))
* **react:** always respect headers, even on a miss ([0022a1c](https://github.com/xing/hops/commit/0022a1c))
* **renderer:** fix static build not working due to missing res.locals.timing ([9bb1b35](https://github.com/xing/hops/commit/9bb1b35))


### Features

* **express:** enable gzip compression ([38779f0](https://github.com/xing/hops/commit/38779f0))
* allow to track server timings ([31ee6ad](https://github.com/xing/hops/commit/31ee6ad))


### Performance Improvements

* track context lifecycle hooks ([a4d7dec](https://github.com/xing/hops/commit/a4d7dec))



<a name="10.2.0-rc.4"></a>
# [10.2.0-rc.4](https://github.com/xing/hops/compare/v10.2.0-rc.3...v10.2.0-rc.4) (2018-02-20)


### Bug Fixes

* check against correct protocol notion for sw registration ([9f006a3](https://github.com/xing/hops/commit/9f006a3))



<a name="10.2.0-rc.3"></a>
# [10.2.0-rc.3](https://github.com/xing/hops/compare/v10.2.0-rc.2...v10.2.0-rc.3) (2018-02-20)


### Bug Fixes

* **express:** don't cache sw.js ([a085bf3](https://github.com/xing/hops/commit/a085bf3))
* **hops-express:** fix ssl file location references ([f7a94ea](https://github.com/xing/hops/commit/f7a94ea))



<a name="10.2.0-rc.2"></a>
# [10.2.0-rc.2](https://github.com/xing/hops/compare/v10.2.0-rc.1...v10.2.0-rc.2) (2018-02-19)



<a name="10.2.0-rc.1"></a>
# [10.2.0-rc.1](https://github.com/xing/hops/compare/v10.2.0-rc.0...v10.2.0-rc.1) (2018-02-19)


### Bug Fixes

* **build-config:** add plugins to package ([a84e20e](https://github.com/xing/hops/commit/a84e20e))



<a name="10.2.0-rc.0"></a>
# [10.2.0-rc.0](https://github.com/xing/hops/compare/v10.1.0...v10.2.0-rc.0) (2018-02-19)


### Features

* **build:** enable SSR mode in webpack dev middleware ([6be493a](https://github.com/xing/hops/commit/6be493a))
* **build-config:** get rid of manifest plugin, simplify config loader ([1484d10](https://github.com/xing/hops/commit/1484d10))
* **build-config:** introduce build, develop, node exports ([f4a6516](https://github.com/xing/hops/commit/f4a6516))
* **config:** add service worker configuration options ([ec7f016](https://github.com/xing/hops/commit/ec7f016))
* **express:** expose stats/asset paths using express ([74c8173](https://github.com/xing/hops/commit/74c8173))
* **express:** implement SSL support ([ec0026c](https://github.com/xing/hops/commit/ec0026c))
* **pwa:** initial ServiceWorker and Web App Manifest support ([6fe9ddb](https://github.com/xing/hops/commit/6fe9ddb))



<a name="10.1.0"></a>
# [10.1.0](https://github.com/xing/hops/compare/v10.0.2...v10.1.0) (2018-02-19)


### Features

* **lambda:** hide aws configuration from browser by prefixing with _ ([9dbf5e1](https://github.com/xing/hops/commit/9dbf5e1)), closes [#319](https://github.com/xing/hops/issues/319)



<a name="10.0.2"></a>
## [10.0.2](https://github.com/xing/hops/compare/v10.0.1...v10.0.2) (2018-02-15)


### Bug Fixes

* **build:** log errors without "stack" instead of swallowing them ([1950723](https://github.com/xing/hops/commit/1950723))
* **cli:** fix variable scoping issues, improve error messages ([e29552c](https://github.com/xing/hops/commit/e29552c))
* **lambda:** correct typo "UrlSuffix" => "URLSuffix" ([a8f6b4f](https://github.com/xing/hops/commit/a8f6b4f)), closes [#382](https://github.com/xing/hops/issues/382)



<a name="10.0.1"></a>
## [10.0.1](https://github.com/xing/hops/compare/v10.0.0...v10.0.1) (2018-02-09)


### Bug Fixes

* **config:** deep-merge objects instead of overwriting them ([35c7325](https://github.com/xing/hops/commit/35c7325))




<a name="10.0.0"></a>
# [10.0.0](https://github.com/xing/hops/compare/v10.0.0-rc.4...v10.0.0) (2018-02-07)


### Features

* **config:** apply placeholders to plain objects, too ([b84b60c](https://github.com/xing/hops/commit/b84b60c))




<a name="10.0.0-rc.4"></a>
# [10.0.0-rc.4](https://github.com/xing/hops/compare/v10.0.0-rc.3...v10.0.0-rc.4) (2018-02-05)


### Bug Fixes

* **config:** deep-merge config without array concatenation ([3a464e8](https://github.com/xing/hops/commit/3a464e8))


### Performance Improvements

* **build-config:** enable caching and parallelism in uglify plugin ([0530c24](https://github.com/xing/hops/commit/0530c24))




<a name="10.0.0-rc.3"></a>
# [10.0.0-rc.3](https://github.com/xing/hops/compare/v10.0.0-rc.2...v10.0.0-rc.3) (2018-02-05)


### Bug Fixes

* **config:** fix config extension mechanism ([fcc1a74](https://github.com/xing/hops/commit/fcc1a74))
* **redux:** missing options no longer crash ([6ba75a7](https://github.com/xing/hops/commit/6ba75a7))


### Features

* **redux:** making redux configration scoped ([7813213](https://github.com/xing/hops/commit/7813213))




<a name="10.0.0-rc.2"></a>
# [10.0.0-rc.2](https://github.com/xing/hops/compare/v10.0.0-rc.1...v10.0.0-rc.2) (2018-02-02)


### Features

* **config:** support placeholders everywhere ([d0e47a0](https://github.com/xing/hops/commit/d0e47a0))
* **react:** render variant hiding contexts from users ([610381d](https://github.com/xing/hops/commit/610381d))




<a name="10.0.0-rc.1"></a>
# [10.0.0-rc.1](https://github.com/xing/hops/compare/v10.0.0-rc.0...v10.0.0-rc.1) (2018-01-31)


### Bug Fixes

* **hops-config:** fix extends overriding previous values instead of extending ([93b8945](https://github.com/xing/hops/commit/93b8945))




<a name="10.0.0-rc.0"></a>
# [10.0.0-rc.0](https://github.com/xing/hops/compare/v9.8.0...v10.0.0-rc.0) (2018-01-25)


### Features

* **build-config:** hide _configs from browser ([e087a49](https://github.com/xing/hops/commit/e087a49))
* **config:** add env support ([404d262](https://github.com/xing/hops/commit/404d262))
* **config:** add support for config keys starting with '_' ([42272e5](https://github.com/xing/hops/commit/42272e5))
* **config:** deeply merge configs ([b9519cd](https://github.com/xing/hops/commit/b9519cd))
* **config:** improve config "inheritance" ([7ba54ae](https://github.com/xing/hops/commit/7ba54ae))
* **config:** introduce cosmiconfig ([d9f8c15](https://github.com/xing/hops/commit/d9f8c15))
* **config:** simplify, add fs placeholders ([f5ccc11](https://github.com/xing/hops/commit/f5ccc11))
* **config:** use cosmiconfig for inheritance ([db2d39d](https://github.com/xing/hops/commit/db2d39d))
* **graphql:** disable data fetching in static ssr ([4e5e28a](https://github.com/xing/hops/commit/4e5e28a)), closes [#324](https://github.com/xing/hops/issues/324)


### BREAKING CHANGES

* **config:** configs are now being deeply merged (instead of shallowly)
* **config:** hops-config no longer supports the previous, npm based
config mechanism. hops now needs to be configured using a `hops` field
in `package.json` instead of `config.hops`. Local config overrides
(using npm) are no longer supported.
* **config:** function config values are no longer treated as getters, but rather returned directly
* **graphql:** In static mode, during server side rendering, GraphQL
data is no longer being prefetched. That appears to be the sane default.
The old behaviour can be restored by extending `GraphQLContext` and
overriding its 'prefetchData' method.




<a name="9.8.0"></a>
# [9.8.0](https://github.com/xing/hops/compare/v9.7.0...v9.8.0) (2018-01-25)


### Features

* **hops-react:** add header component to allow setting http headers declaratively ([f6dfc34](https://github.com/xing/hops/commit/f6dfc34))




<a name="9.7.0"></a>
# [9.7.0](https://github.com/xing/hops/compare/v9.6.1...v9.7.0) (2018-01-22)


### Bug Fixes

* **build-config:** fix dependency asset imports ([4cd4b1d](https://github.com/xing/hops/commit/4cd4b1d)), closes [#342](https://github.com/xing/hops/issues/342)
* **graphql:** fix console output ([85556fb](https://github.com/xing/hops/commit/85556fb))


### Features

* **build-config:** add .node files to exclusion regex ([f59f733](https://github.com/xing/hops/commit/f59f733))
* **build-config:** optimize exclusion heuristic ([b9bddbb](https://github.com/xing/hops/commit/b9bddbb))
* **cli:** execute build to prod start command ([8565081](https://github.com/xing/hops/commit/8565081))




<a name="9.6.1"></a>
## [9.6.1](https://github.com/xing/hops/compare/v9.6.0...v9.6.1) (2018-01-12)


### Bug Fixes

* **hops-cli:** allow to add .npmrc in templates ([3a47f3d](https://github.com/xing/hops/commit/3a47f3d))




<a name="9.6.0"></a>
# [9.6.0](https://github.com/xing/hops/compare/v9.5.0...v9.6.0) (2018-01-09)


### Bug Fixes

* **cli:** use pkg-dir instead of hops-config to figure out app root ([34bd28f](https://github.com/xing/hops/commit/34bd28f))
* **lambda:** specify peerDependencies also in devDependencies ([6411dc1](https://github.com/xing/hops/commit/6411dc1))


### Features

* **server:** print basePath (if configured) in server callback ([af589fc](https://github.com/xing/hops/commit/af589fc))




<a name="9.5.0"></a>
# [9.5.0](https://github.com/xing/hops/compare/v9.4.3...v9.5.0) (2018-01-09)


### Bug Fixes

* **graphql:** get rid of webpack warning ([f0aba04](https://github.com/xing/hops/commit/f0aba04))


### Features

* **build-config:** move manifest getters into the config loader ([d7e5aa0](https://github.com/xing/hops/commit/d7e5aa0))
* **build-config:** re-add config to node build ([ebbd930](https://github.com/xing/hops/commit/ebbd930))
* **jest-preset-hops:** add jest 22 to peerDependency range ([bf58d61](https://github.com/xing/hops/commit/bf58d61))




<a name="9.4.3"></a>
## [9.4.3](https://github.com/xing/hops/compare/v9.4.2...v9.4.3) (2018-01-08)


### Bug Fixes

* **cli:** do not require local packages in global context ([42002a3](https://github.com/xing/hops/commit/42002a3))




<a name="9.4.2"></a>
## [9.4.2](https://github.com/xing/hops/compare/v9.4.1...v9.4.2) (2018-01-08)




**Note:** Version bump only for package hops

<a name="9.4.1"></a>
## [9.4.1](https://github.com/xing/hops/compare/v9.4.0...v9.4.1) (2018-01-08)




**Note:** Version bump only for package hops

<a name="9.4.0"></a>
# [9.4.0](https://github.com/xing/hops/compare/v9.3.2...v9.4.0) (2018-01-08)


### Features

* **build:** make CLI commands compatible with hops-local-cli & hops ([7a203ba](https://github.com/xing/hops/commit/7a203ba))
* **express:** make CLI commands compatible with hops-local-cli & hops ([2128951](https://github.com/xing/hops/commit/2128951))
* **graphql:** make CLI commands compatible with hops-local-cli & hops ([a278d1d](https://github.com/xing/hops/commit/a278d1d))
* **lambda:** make CLI commands compatible with hops-local-cli & hops ([0e57a35](https://github.com/xing/hops/commit/0e57a35))




<a name="9.3.2"></a>
## [9.3.2](https://github.com/xing/hops/compare/v9.3.1...v9.3.2) (2018-01-08)


### Bug Fixes

* **hops-build-config:** exclude manifest.js.map as well ([29a5f61](https://github.com/xing/hops/commit/29a5f61))
* **hops-build-config:** move StatsWriterPlugin down so it does not include removed manifest chunk ([ce2d68d](https://github.com/xing/hops/commit/ce2d68d))




<a name="9.3.1"></a>
## [9.3.1](https://github.com/xing/hops/compare/v9.3.0...v9.3.1) (2017-12-15)


### Bug Fixes

* **build:** add missing hops-renderer dependency ([7420e0b](https://github.com/xing/hops/commit/7420e0b))
* **lambda:** pass required options hash to hops-express ([f413703](https://github.com/xing/hops/commit/f413703))




<a name="9.3.0"></a>
# [9.3.0](https://github.com/xing/hops/compare/v9.2.0...v9.3.0) (2017-12-14)


### Bug Fixes

* **server:** only rewrite path if run in static mode ([0bf7073](https://github.com/xing/hops/commit/0bf7073))


### Features

* **build-config:** make environment variables configurable ([27de5fe](https://github.com/xing/hops/commit/27de5fe))
* **config:** add envVars config ([a619eb4](https://github.com/xing/hops/commit/a619eb4))
* **template-graphql:** Add grapqhl example template ([0a65138](https://github.com/xing/hops/commit/0a65138))




<a name="9.2.0"></a>
# [9.2.0](https://github.com/xing/hops/compare/v9.1.1...v9.2.0) (2017-12-11)


### Bug Fixes

* **lambda:** wait until newly created bucket exists ([8e1f05c](https://github.com/xing/hops/commit/8e1f05c))


### Features

* **lambda:** include entire project dir in zip file (minus dev deps) ([c88f668](https://github.com/xing/hops/commit/c88f668))
* **lambda:** introduce "lambda" command to deploy app to AWS lambda ([7533e71](https://github.com/xing/hops/commit/7533e71))
* **lambda:** try to keep function warm by continuously polling it ([315c90b](https://github.com/xing/hops/commit/315c90b))
* **react:** make ReactRouter configurable ([48988d0](https://github.com/xing/hops/commit/48988d0)), closes [#292](https://github.com/xing/hops/issues/292)




<a name="9.1.1"></a>
## [9.1.1](https://github.com/xing/hops/compare/v9.1.0...v9.1.1) (2017-12-05)


### Performance Improvements

* lazy-require command implementations ([bac93fa](https://github.com/xing/hops/commit/bac93fa))




<a name="9.1.0"></a>
# [9.1.0](https://github.com/xing/hops/compare/v9.0.1...v9.1.0) (2017-11-29)


### Features

* **hops-redux:** allow to specify middlewares as option ([c7b8fcd](https://github.com/xing/hops/commit/c7b8fcd))




<a name="9.0.0"></a>
# [9.0.0](https://github.com/xing/hops/compare/v8.0.0...v9.0.0) (2017-11-27)


### Bug Fixes

* **graphql:** make getTemplateData order-agnostic ([6d5e0c3](https://github.com/xing/hops/commit/6d5e0c3))
* **react:** fix context mixin execution order ([506b6dc](https://github.com/xing/hops/commit/506b6dc))
* **react:** re-enable Miss/Status components ([c6c9c9e](https://github.com/xing/hops/commit/c6c9c9e))
* **redux:** make getTemplateData order-agnostic ([f60b169](https://github.com/xing/hops/commit/f60b169))


### Features

* **graphql:** implement constructor based mixins ([e99ec75](https://github.com/xing/hops/commit/e99ec75))
* **react:** implement constructor based mixins ([d828883](https://github.com/xing/hops/commit/d828883))
* **redux:** implement constructor based mixins ([19ef2fc](https://github.com/xing/hops/commit/19ef2fc))


### BREAKING CHANGES

* **graphql:** export.contextDefinition is now a constructor function (used to be an object literal)
* **redux:** export.contextDefinition is now a constructor function (used to be an object literal)
* **react:** export.contextDefinition is now a constructor function (used to be an object literal)




<a name="8.0.0"></a>
# [8.0.0](https://github.com/xing/hops/compare/v7.4.1...v8.0.0) (2017-11-22)


### Bug Fixes

* **build-config:** exclude absolute paths from bundled config ([4ecc41f](https://github.com/xing/hops/commit/4ecc41f))
* **build-config:** inline core-js polyfills in bundled Node.js code ([37e0feb](https://github.com/xing/hops/commit/37e0feb))
* **build-config:** replace babel-minify with uglify-es ([f1be32c](https://github.com/xing/hops/commit/f1be32c))
* **local-cli:** if _gitignore exists, rename it to .gitignore ([520a6da](https://github.com/xing/hops/commit/520a6da))
* **react:** make sure to only hydrate on first pass ([561cb89](https://github.com/xing/hops/commit/561cb89))
* **template-minimal:** keep gitignore after publish by renaming it ([d9e7e2d](https://github.com/xing/hops/commit/d9e7e2d))
* **template-react:** add missing prop-types dependency ([5fb80f2](https://github.com/xing/hops/commit/5fb80f2))
* **template-react:** keep gitignore after publish by renaming it ([afb28ae](https://github.com/xing/hops/commit/afb28ae))


### Code Refactoring

* **build-config:** remove propTypes in production builds ([50c9d6c](https://github.com/xing/hops/commit/50c9d6c))
* **graphql:** make main export a context mixin ([d097d2d](https://github.com/xing/hops/commit/d097d2d))
* **graphql:** rename mixin definition export ([dfd1d4b](https://github.com/xing/hops/commit/dfd1d4b))
* **plugin:** switch to options hash ([64e0f24](https://github.com/xing/hops/commit/64e0f24))
* **redux:** make main export a context mixin ([f5edae6](https://github.com/xing/hops/commit/f5edae6))
* **redux:** rename mixin definition export ([321e733](https://github.com/xing/hops/commit/321e733))
* **template-react:** remove flow type annotations ([4f7bba9](https://github.com/xing/hops/commit/4f7bba9))
* **template-react:** remove graphql from default template ([4533445](https://github.com/xing/hops/commit/4533445))


### Features

* **config:** allow targeting specific Node version in babel preset ([4437c6b](https://github.com/xing/hops/commit/4437c6b))
* **graphql:** implement simplified mixin support ([509c1b5](https://github.com/xing/hops/commit/509c1b5))
* **graphql:** introduce mixin support ([813196f](https://github.com/xing/hops/commit/813196f))
* **hops-build-config:** add source maps to production build output ([9cfde51](https://github.com/xing/hops/commit/9cfde51))
* **hops-build-config:** add webpack-stats-plugin to build ([a752635](https://github.com/xing/hops/commit/a752635))
* **react:** add combineContexts, refactor exports ([8bd2955](https://github.com/xing/hops/commit/8bd2955))
* **react:** implement simplified mixin support ([6f8bf5c](https://github.com/xing/hops/commit/6f8bf5c))
* **react:** introduce mixin support ([3a575b1](https://github.com/xing/hops/commit/3a575b1))
* **redux:** implement simplified mixin support ([dfed624](https://github.com/xing/hops/commit/dfed624))
* **redux:** introduce mixin support ([c0da538](https://github.com/xing/hops/commit/c0da538))
* **renderer:** add support for an options hash ([8206ad1](https://github.com/xing/hops/commit/8206ad1))
* **renderer:** make renderer use bootstrapServer config ([ce2298d](https://github.com/xing/hops/commit/ce2298d))


### Performance Improvements

* **graphql:** remove fs.existsSync() check from context ([1441d20](https://github.com/xing/hops/commit/1441d20))


### BREAKING CHANGES

* **graphql:** export naming changed
* **renderer:** createRenderer signature changed to options hash instead of discrete args
* **react:** some exports have been renamed
* **graphql:** exports changed
* **redux:** exports changed
* **react:** a context arguments is now required for render()
* **graphql:** main export changed
* **redux:** main export changed
* **redux:** export naming changed
* **redux:** Context.extends is removed, Context.mixin is added
* **react:** Context.extends is removed, Context.mixin is added
* **build-config:** Hops now no longer has built-in support for converting flow type
annotations into react prop-type definitions.
It still supports flow out of the box, via the babel-react preset,
but now it only removes flow type annotations from the build instead
of converting them to prop-types.
* **template-react:** The template `hops-template-react` now no longer contains flow type
annotations.

Closes: #277
* **template-react:** `hops-template-react` (default template) now no longer supports graphql
out of the box. You can add the support yourself again or use a
different template (we will provide a new `hops-template-graphql`
shortly).

Closes: #276
* **plugin:** Constructor signature changed to options hash instead of discrete args.
* **graphql:** Context.extends is removed, Context.mixin is added




<a name="7.4.1"></a>
## [7.4.1](https://github.com/xing/hops/compare/v7.4.0...v7.4.1) (2017-11-08)




**Note:** Version bump only for package hops
