# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [12.5.10](https://github.com/xing/hops/compare/v12.5.9...v12.5.10) (2021-03-15)

**Note:** Version bump only for package hops-webpack





## [12.5.9](https://github.com/xing/hops/compare/v12.5.8...v12.5.9) (2021-02-22)

**Note:** Version bump only for package hops-webpack





## [12.5.8](https://github.com/xing/hops/compare/v12.5.7...v12.5.8) (2021-01-11)


### Bug Fixes

* **webpack:** ensure forked compiler exits when done ([1408223](https://github.com/xing/hops/commit/1408223f96798af01d622b938cf9e5d1dff61781))





## [12.5.7](https://github.com/xing/hops/compare/v12.5.6...v12.5.7) (2020-12-07)


### Bug Fixes

* **webpack:** always transpile optional chaining and nullish coalescing ([0750daf](https://github.com/xing/hops/commit/0750daf97f719f70670a284fcffaab2d259b4d60))
* **webpack:** consider the current node version for babel cache ([a9372a0](https://github.com/xing/hops/commit/a9372a0ebf31237de4750378ff56321ff1367a3d))





## [12.5.6](https://github.com/xing/hops/compare/v12.5.5...v12.5.6) (2020-11-20)


### Bug Fixes

* **webpack:** compile browser bundle for latest chrome only ([3290928](https://github.com/xing/hops/commit/3290928cad3fc6d6720c26b9a743350d85dc7eb4))





## [12.5.5](https://github.com/xing/hops/compare/v12.5.4...v12.5.5) (2020-10-13)


### Bug Fixes

* **webpack:** accept object argument in BuildError ([9e91b96](https://github.com/xing/hops/commit/9e91b963c8fb842a1123e322df7d428e1a9b8609))





## [12.5.4](https://github.com/xing/hops/compare/v12.5.3...v12.5.4) (2020-10-09)


### Bug Fixes

* **webpack:** replace serialize-error with a custom implementation ([32ad089](https://github.com/xing/hops/commit/32ad08970537a76ca6e2a2e6e2b1bf098443e31b))





## [12.5.3](https://github.com/xing/hops/compare/v12.5.2...v12.5.3) (2020-09-21)


### Bug Fixes

* **webpack:** use webpack HMR for node build to fix memory leak ([0c94b54](https://github.com/xing/hops/commit/0c94b545181d217fa3014faf7c8995842b78ff7d))
* update dependency find-up to v5 ([63f4fa9](https://github.com/xing/hops/commit/63f4fa91aa984dba53d8c25e6460d5b8cf4f7e3e))
* update dependency terser-webpack-plugin to v4 ([33324cf](https://github.com/xing/hops/commit/33324cfb80a16d66465b6aa68f4d56d67beeca4d))





## [12.5.2](https://github.com/xing/hops/compare/v12.5.1...v12.5.2) (2020-08-17)

**Note:** Version bump only for package hops-webpack





## [12.5.1](https://github.com/xing/hops/compare/v12.5.0...v12.5.1) (2020-07-29)


### Bug Fixes

* **webpack:** reset stats promise on watch run events ([0fea0ab](https://github.com/xing/hops/commit/0fea0abc46a102428f8d3755460c7a2f41f72624))





# [12.5.0](https://github.com/xing/hops/compare/v12.4.0...v12.5.0) (2020-07-13)


### Bug Fixes

* **webpack:** re-enable the --fast-build CLI flag ([7bdb297](https://github.com/xing/hops/commit/7bdb29743cc27b69da7b7e5f5be47f6d53ad675d))
* update dependency terser-webpack-plugin to v3 ([29e5598](https://github.com/xing/hops/commit/29e55985f2a144b66a7d2570c6cfc693771d5e08))


### Features

* **webpack:** allow to run webpack builds in parallel ([0e30a8b](https://github.com/xing/hops/commit/0e30a8bb084f4b5bc45e8b10ef7eea86508d1bd9))
* **webpack:** enable parallel builds by default ([bf1469c](https://github.com/xing/hops/commit/bf1469cebccfc209bfcc88498eb9df0fcb731843))





# [12.4.0](https://github.com/xing/hops/compare/v12.3.0...v12.4.0) (2020-06-02)


### Bug Fixes

* update duplitect ([a30838b](https://github.com/xing/hops/commit/a30838b54783c684450b060aa14186d79905a9bb))


### Features

* **webpack:** apply optimization to more targets ([90f6688](https://github.com/xing/hops/commit/90f6688a1135fd95ec49eda662aad85f1ff72d3b))
* **webpack:** improve error output for core-js issues ([2832703](https://github.com/xing/hops/commit/283270301a935b058686f424191fd85fb06ef67b))
* **webpack:** improve feedback on conflicting core-js versions ([ce5611c](https://github.com/xing/hops/commit/ce5611ccfc2797f4e64f8fa2ddfdcdf749b242f6))
* **webpack:** introduce experimental fast-build mode ([3b8f3b5](https://github.com/xing/hops/commit/3b8f3b59a2f8c201ae19dc53bafacc5b5db381b3))
* **webpack:** print total bundle size ([e2a431d](https://github.com/xing/hops/commit/e2a431dff5b818c70176f46bc10cea82ca424a4d))
* **webpack:** use an include list instead of exclude ([aeb0f1e](https://github.com/xing/hops/commit/aeb0f1e01461d8b8e79caf84b7ac0c5f7ef34c40))





# [12.3.0](https://github.com/xing/hops/compare/v12.2.2...v12.3.0) (2020-05-18)


### Features

* **webpack:** include entrypoints into stats object ([965c5c0](https://github.com/xing/hops/commit/965c5c024ec99486a086777d3aed35c4f36ee949))





## [12.2.2](https://github.com/xing/hops/compare/v12.2.1...v12.2.2) (2020-05-14)


### Bug Fixes

* update dependency pretty-ms to v7 ([604873a](https://github.com/xing/hops/commit/604873aa64f1d63c41c174cb8fa7e7ec6a900312))
* update dependency serialize-error to v7 ([ec6fe25](https://github.com/xing/hops/commit/ec6fe259cd86a5b5527c1576f69fbf6bbe07ca4f))


### Performance Improvements

* reduce memory footprint by not serializing all stats ([0d7a023](https://github.com/xing/hops/commit/0d7a0237cd79e99eebb6d15031deb0a9f41f933c))





## [12.2.1](https://github.com/xing/hops/compare/v12.2.0...v12.2.1) (2020-04-27)

**Note:** Version bump only for package hops-webpack





# [12.2.0](https://github.com/xing/hops/compare/v12.1.4...v12.2.0) (2020-04-27)


### Bug Fixes

* **webpack:** remove obsolete @babel/plugin-syntax-dynamic-import ([1fbe260](https://github.com/xing/hops/commit/1fbe2606241d8041fd620836d0353dff10e6fd0f))
* mixinable@5.0.0 contains bugs ([26cfa31](https://github.com/xing/hops/commit/26cfa31bdd2109c01e5db391269920b7796b9cad))
* remove unnecessary babel plugin dynamic import node ([7ffa3cc](https://github.com/xing/hops/commit/7ffa3cc7184a5fe9904bd9f000922a8d2551efb4))
* update dependency escape-string-regexp to v4 ([1dc48b1](https://github.com/xing/hops/commit/1dc48b15559426050dc76e6c5c469cceba8bae0f))
* update dependency mixinable to v5 ([2dfcc62](https://github.com/xing/hops/commit/2dfcc6222ee8d0cb2716e50a0dfa190f1068a835))
* upgrade all babel packages to their latest version ([b67af16](https://github.com/xing/hops/commit/b67af16071364ec8478fa323ec50230aff9558e2))


### Features

* add --fast-dev option for faster development builds ([9841fbc](https://github.com/xing/hops/commit/9841fbcc2088cabda8a91fc619ac10f93d54ee3e))
* **webpack:** add profiling mixin to show performance stats ([36f4839](https://github.com/xing/hops/commit/36f483949d122dc2e5fccf85c6b017b9741ec14e))
