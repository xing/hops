# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="7.1.0"></a>
# [7.1.0](https://github.com/xing/hops/compare/v1.0.0-beta.10...v7.1.0) (2017-10-16)


### Bug Fixes

* make import() work on node as well ([2525c4b](https://github.com/xing/hops/commit/2525c4b))
* **config:** find node_modules directory by resolving hops-config ([a0aa9ae](https://github.com/xing/hops/commit/a0aa9ae))
* **config:** incorrect detection of empty objects as being an array ([5102760](https://github.com/xing/hops/commit/5102760))
* **config:** race-condition: create cache dir just before usage ([baa5bd7](https://github.com/xing/hops/commit/baa5bd7))
* **hops-config:** use hops relative babel plugins packages ([c3e9db9](https://github.com/xing/hops/commit/c3e9db9))
* **hops-config:** use hops relative loader packages to fix issue with packages not being installed in root node_modules ([daf8e4d](https://github.com/xing/hops/commit/daf8e4d))


### Features

* **config:** read hops user config from package.json if not in env ([0d3fdb9](https://github.com/xing/hops/commit/0d3fdb9))
* **hops-config:** allow to use imports() for dynamicaly requiring chunks ([60af037](https://github.com/xing/hops/commit/60af037))
* **hops-config:** disable host check ([89395b8](https://github.com/xing/hops/commit/89395b8))
* **hops-config:** use faster source map strategy ([cdc5ca5](https://github.com/xing/hops/commit/cdc5ca5))




<a name="7.0.0"></a>
# [7.0.0](https://github.com/xing/hops/compare/v6.2.8...v7.0.0) (2017-10-13)


### Features

* **config:** split hops packages, introduce changelog
