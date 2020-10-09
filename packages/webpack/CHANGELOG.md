# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [13.1.0](https://github.com/xing/hops/compare/v13.0.0...v13.1.0) (2020-10-09)


### Bug Fixes

* **webpack:** accept object argument in BuildError ([33e378f](https://github.com/xing/hops/commit/33e378f7e1b4a65b816bafa8da0fd88caf563fdc))





# [13.0.0](https://github.com/xing/hops/compare/v13.0.0-rc.0...v13.0.0) (2020-09-28)


### Bug Fixes

* **webpack:** replace serialize-error with a custom implementation ([65931fc](https://github.com/xing/hops/commit/65931fcb319198b61f20baf07bfbd8d7d3d750dd))
* update dependency enhanced-resolve to v5 ([4842d30](https://github.com/xing/hops/commit/4842d307931699b3d5aef656a8b0900e038be768))
* update dependency webpack-sources to v2 ([12134a4](https://github.com/xing/hops/commit/12134a40aec57c8b2cbdedbbcfd15bd3883e224e))
* **webpack:** use webpack HMR for node build to fix memory leak ([2826fdf](https://github.com/xing/hops/commit/2826fdfa64084507fdd07be7a34cee66763ee73a))





# [13.0.0-rc.0](https://github.com/xing/hops/compare/v13.0.0-alpha.2...v13.0.0-rc.0) (2020-09-07)


### Bug Fixes

* update dependency find-up to v5 ([ce11652](https://github.com/xing/hops/commit/ce1165227b2a0782f6e945e0a1c8de8adb1a4ea9))
* update dependency terser-webpack-plugin to v4 ([b0c5132](https://github.com/xing/hops/commit/b0c51320984d42bce065718cf8626080a75928a4))





# [13.0.0-alpha.2](https://github.com/xing/hops/compare/v13.0.0-alpha.1...v13.0.0-alpha.2) (2020-08-17)

**Note:** Version bump only for package hops-webpack





# [13.0.0-alpha.1](https://github.com/xing/hops/compare/v13.0.0-alpha.0...v13.0.0-alpha.1) (2020-07-31)


### Bug Fixes

* **webpack:** reset stats promise on watch run events ([0cd654d](https://github.com/xing/hops/commit/0cd654d33c56f068fdf5412e6e45901312948b0d))





# [13.0.0-alpha.0](https://github.com/xing/hops/compare/v12.0.0-rc99...v13.0.0-alpha.0) (2020-07-23)


### Bug Fixes

* remove support for Node versions 10 & 13 ([00e7f2f](https://github.com/xing/hops/commit/00e7f2fb2ec92b859805b65bfeee697a78bf8147))


### BREAKING CHANGES

* Hops does not support the outdated Node versions 10
and 13 anymore. In case you're using one of these, please update your
Node version to the current version 14 or the LTS version 12.
