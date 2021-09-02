# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [14.4.0](https://github.com/xing/hops/compare/v14.3.2...v14.4.0) (2021-09-02)


### Bug Fixes

* **msw:** prepend msw service worker path with basePath ([7833b55](https://github.com/xing/hops/commit/7833b55a3decd468de1eff910d3c6e04dd640ba5))
* **msw:** remove `enableMockServiceWorker` configuration option ([e8ac8af](https://github.com/xing/hops/commit/e8ac8af3a23bec265a02e0c47ffa777ef9fb268f))
* update dependency msw to ^0.35.0 ([cd104ae](https://github.com/xing/hops/commit/cd104ae8cecbbdd53da6fa504a37d006a874bca4))





## [14.3.2](https://github.com/xing/hops/compare/v14.3.1...v14.3.2) (2021-08-02)


### Bug Fixes

* **msw:** remove unusable integration test APIs ([89c1b24](https://github.com/xing/hops/commit/89c1b24f0238df36c638e91bc6091ecc0323e3d9))





## [14.3.1](https://github.com/xing/hops/compare/v14.3.0...v14.3.1) (2021-07-28)


### Bug Fixes

* **msw:** rename /_mocks/ endpoint to /_msw/ to avoid clashes ([713d3d2](https://github.com/xing/hops/commit/713d3d24408ee031b1ab1290d0b42ee2b5d313e6))





# [14.3.0](https://github.com/xing/hops/compare/v14.2.1...v14.3.0) (2021-07-27)


### Bug Fixes

* **msw:** correct type definition for main export ([17a2d25](https://github.com/xing/hops/commit/17a2d25875534e2974b769d901b76c34c23b49a7))
* **msw:** do not install msw if browser does not support service workers ([faa82b3](https://github.com/xing/hops/commit/faa82b321fc46efbaa3c0f852b818869780a4833))
* update dependency msw to ^0.31.0 ([d8d4984](https://github.com/xing/hops/commit/d8d4984202a2e6f566f59ee1d66b85a3deac77d5))
* update dependency msw to ^0.33.0 ([3833165](https://github.com/xing/hops/commit/3833165f73246e8870b7920fd44242e841fe2230))
* **msw:** provide empty hops-msw/handlers file to fix webpack errors ([50f66d5](https://github.com/xing/hops/commit/50f66d5e449f87cbd8f2dc3d6039354f33e95736))


### Features

* **msw:** allow to skip waiting for browser mocks ([78ecff9](https://github.com/xing/hops/commit/78ecff9846edc5b61cc2955ee6e4b1eaeda39894))
* **msw:** allow to specify a handlers file to use during development ([f83409a](https://github.com/xing/hops/commit/f83409aca4303c5024eddfa52f4b8359087bbd87))
* **msw:** introduce new hops-msw package ([c01c062](https://github.com/xing/hops/commit/c01c06268f67b349bc9f249b09b438f3007f8e7e))
* **msw:** only wait for browser mocks in integration tests ([a4318f0](https://github.com/xing/hops/commit/a4318f0b2752bda91a93c0f041e50fc24068143e))
* **msw:** print debug information from the mixins ([de2d02c](https://github.com/xing/hops/commit/de2d02c72d41a75cc1ed925f5a421abdf2b2f13f))
