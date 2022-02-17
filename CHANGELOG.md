# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [16.0.0-nightly.3](https://github.com/xing/hops/compare/v16.0.0-nightly.2...v16.0.0-nightly.3) (2022-02-17)


### Bug Fixes

* start server for version 3 ([687ca03](https://github.com/xing/hops/commit/687ca03ba3e7902a57b513cd4a98f8a10686f9ce))
* **styled-components:** pin babel-plugin-styled-components to v1.12.1 ([a243ba3](https://github.com/xing/hops/commit/a243ba38fe2cbda26a2bf6b4d947d6dbf069c8ff))
* update dependency apollo-server-express to v3 ([2e7ef2d](https://github.com/xing/hops/commit/2e7ef2d7b8620dfbbf3db81cea42e60218f194d1))
* update dependency loader-utils to v3 ([69a79d4](https://github.com/xing/hops/commit/69a79d483a3a238122267b751a927d20f5dc9bf9))
* update dependency postcss-preset-env to v7 ([fac4a09](https://github.com/xing/hops/commit/fac4a09aff969ca23f37fcdc1ab6456604d2e3f9))





# [16.0.0-nightly.2](https://github.com/xing/hops/compare/v16.0.0-nightly.1...v16.0.0-nightly.2) (2022-02-16)


### Bug Fixes

* pin @apollo/client to 3.4.17 due to SSR bug in useLazyQuery ([9f97080](https://github.com/xing/hops/commit/9f97080f8d6a32db72427c5b2974d2a8ad2ba264))
* reference webpack chunks via chunk name ([4d9db89](https://github.com/xing/hops/commit/4d9db895be547a0577cd336e29676a5cb836d284)), closes [#1976](https://github.com/xing/hops/issues/1976)
* wait for webpack builds to finish ([dbf793b](https://github.com/xing/hops/commit/dbf793b74ecb88374a1f6b71f5119bb19744682d))


### Features

* **jest-environment:** reject hasFinished when build has failed ([5b5fd4d](https://github.com/xing/hops/commit/5b5fd4d6f84c17ac6fb917f5fe20ad683de79484))





# [16.0.0-nightly.1](https://github.com/xing/hops/compare/v16.0.0-nightly.0...v16.0.0-nightly.1) (2022-01-12)


### Bug Fixes

* **apollo-mock-server:** move playground.png image to mock server folder ([f527c33](https://github.com/xing/hops/commit/f527c33c69c21f6aa979f3811441a91622bd0f5f))
* fix bors config ([170c953](https://github.com/xing/hops/commit/170c9530547cf1dba0eba0fc993ed769679198a4))
* fix incorrect argument passing to process ([ea4cb8b](https://github.com/xing/hops/commit/ea4cb8b8a070f9fd7428f1991cfe0703d35d5039))
* **jest-environment:** replace package colors with chalk ([bd77d85](https://github.com/xing/hops/commit/bd77d8572e08ca4f372bed683c90b74aae766eba))
* **jest-preset:** replace package colors with chalk ([d06751e](https://github.com/xing/hops/commit/d06751e8ac1c86139d76a7fc30abe45e8cc62f0e))
* **lambda:** replace package prompt with readline ([bf85c6b](https://github.com/xing/hops/commit/bf85c6bd7cce9cc9c8f6969a71d1f70735005523))
* **react-apollo:** make fragmentTypes available to the client-side ([b26f406](https://github.com/xing/hops/commit/b26f406f4790b8aa03c8e14ee7916ebcccff9925))
* reference the current version, not latest ([188fbd1](https://github.com/xing/hops/commit/188fbd197538ff7261d854a30a89f58e2cccd252))
* support both 14 and 16 ([ddd19e2](https://github.com/xing/hops/commit/ddd19e25d9e94d70ee245e69cda396d776894055))
* **webpack:** externalize server source-map to prevent RangeError ([79e4290](https://github.com/xing/hops/commit/79e4290febe6316adf7ef4c17ecbd26fefc133fd))
* **webpack:** print file name and location in webpack warnings ([0e4a05c](https://github.com/xing/hops/commit/0e4a05c3c19e815cd5d40e49c19ef7a1d79ac0ac))





# [16.0.0-nightly.0](https://github.com/xing/hops/compare/v15.0.0...v16.0.0-nightly.0) (2021-09-30)


### Reverts

* Revert "chore: rename bin to create-hops-app for stable version" ([86ea2f3](https://github.com/xing/hops/commit/86ea2f3f012656da5b9d913e4fdd6a6564bbbcec))





[Hops v15 changelog](https://github.com/xing/hops/blob/v15.x/CHANGELOG.md)
