# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.


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
