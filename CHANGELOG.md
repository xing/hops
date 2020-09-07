# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [13.0.0-rc.0](https://github.com/xing/hops/compare/v13.0.0-alpha.2...v13.0.0-rc.0) (2020-09-07)


### Bug Fixes

* remove superfluous dependencies ([afb2de0](https://github.com/xing/hops/commit/afb2de0063c3031b215cb8d989c3babe2aa81231))
* **express:** disable helmet csp option for now ([1683035](https://github.com/xing/hops/commit/16830354363b7f1faae88b65304eed3f71e34699))
* update dependency cosmiconfig to v7 ([44e0f84](https://github.com/xing/hops/commit/44e0f84dfb464e2e9df776f4636185fbaf126c04))
* update dependency find-up to v5 ([ce11652](https://github.com/xing/hops/commit/ce1165227b2a0782f6e945e0a1c8de8adb1a4ea9))
* update dependency helmet to v4 ([712ce25](https://github.com/xing/hops/commit/712ce25e949bd5ee3b85edd1d2b0ba5a42147180))
* update dependency mini-css-extract-plugin to ^0.10.0 ([f77a14f](https://github.com/xing/hops/commit/f77a14f23b217d301446f05bc207a0f8a2a8a917))
* update dependency terser-webpack-plugin to v4 ([b0c5132](https://github.com/xing/hops/commit/b0c51320984d42bce065718cf8626080a75928a4))
* update dependency typescript to v4 ([d2ec9fc](https://github.com/xing/hops/commit/d2ec9fc52063694fd46a5dafe42f9317bf96262e))


### Reverts

* Revert "chore: deprecate "hops-mixin" in favor of "hops-bootstrap"" ([79438bb](https://github.com/xing/hops/commit/79438bb1a2054f5ef8362d59b4aefd412cd9be86))





# [13.0.0-alpha.2](https://github.com/xing/hops/compare/v13.0.0-alpha.1...v13.0.0-alpha.2) (2020-08-17)


### Bug Fixes

* **react-apollo:** prevent requests on server when SSR is turned off ([6e2cdf9](https://github.com/xing/hops/commit/6e2cdf97fdf6bb0b15212920d9f05ec956af0093))





# [13.0.0-alpha.1](https://github.com/xing/hops/compare/v13.0.0-alpha.0...v13.0.0-alpha.1) (2020-07-31)


### Bug Fixes

* **react:** declare propTypes for Import component ([a929c7d](https://github.com/xing/hops/commit/a929c7d20a5f477930373d1f99f2eea079a4880e))
* **react:** remove support of react-helmet ([3ea3cc5](https://github.com/xing/hops/commit/3ea3cc534f83cb75dcf8bff61a0dad8ac4cb7d45))
* **react:** require export resolver function in importComponent ([ff71be6](https://github.com/xing/hops/commit/ff71be69ad4d03f453d2c3bdc4177da7961c2bdd))
* **react:** require module loader function in importComponent ([dd6e501](https://github.com/xing/hops/commit/dd6e5017422fff1e3cb20a610c9010e8acc3c2fb))
* **react-apollo:** remove support for shouldPrefetchOnServer ([e52a467](https://github.com/xing/hops/commit/e52a467749f95d4fefacf023198166d967000f49))
* **redux:** remove support for shouldPrefetchOnServer ([1e2e1f2](https://github.com/xing/hops/commit/1e2e1f2bd7ed21fb7d22d95b2803e6ccffcac250))
* **webpack:** reset stats promise on watch run events ([0cd654d](https://github.com/xing/hops/commit/0cd654d33c56f068fdf5412e6e45901312948b0d))
* update dependency archiver to v5 ([30740dc](https://github.com/xing/hops/commit/30740dc6bc34310254052cb2393bf4e900c42ba5))


### BREAKING CHANGES

* **react:** Hops does not support the synchronous
`react-helmet`-package anymore; you have thus to update your
`import`-statements to import the `Helmet`-component from
`react-helmet-async` instead.
* **react:** `importComponent` does not accept a module identifier
as the first argument anymore, but requires you to pass in a function,
that returns the `Promise` of the dynamic import of the module.
* **react:** `importComponent` now requires the second argument,
that resolves a named export, to be a function.
* **redux:** Replace the outdated `shouldPrefetchOnServer` in your Hops
configuration with the new config value `allowServerSideDataFetching`.
* **react-apollo:** Replace the outdated `shouldPrefetchOnServer` in your Hops
configuration with the new config value `allowServerSideDataFetching`.





# [13.0.0-alpha.0](https://github.com/xing/hops/compare/v12.0.0-rc99...v13.0.0-alpha.0) (2020-07-23)


### Bug Fixes

* **react-apollo:** import from graphql-tools monorepo package ([d31d1b0](https://github.com/xing/hops/commit/d31d1b0b73de305fbac4e858747a7f1897d0a51d))
* ensure externals use correct version of packages ([e4ec3d7](https://github.com/xing/hops/commit/e4ec3d755d5e4da12028393866fd6c68aa89c161))
* update dependency graphql-tools to v6 ([5a4fc78](https://github.com/xing/hops/commit/5a4fc7867f91474f204e2222eb492a29111f01b2))
* **lambda:** remove support for the "nodejs10.x"-runtime ([8f9d2ac](https://github.com/xing/hops/commit/8f9d2acf070fcf894df3d1a44524dac1a0cc1f19))
* remove support for Node versions 10 & 13 ([00e7f2f](https://github.com/xing/hops/commit/00e7f2fb2ec92b859805b65bfeee697a78bf8147))
* upgrade jest to v26 ([dfaf499](https://github.com/xing/hops/commit/dfaf49999704096859b63ed94c90a00a8727c75e))


### Features

* support latest Node.js (v13) ([30ca9a4](https://github.com/xing/hops/commit/30ca9a4ebc3a43706eb07158259035349ce2d269))


### BREAKING CHANGES

* **lambda:** Since Hops dropped support for Node version 10, the
respective runtime on AWS Lambda isn't supported anymore either. If
you're running hops-lambda with `nodejs10.x`, please switch to
`nodejs12.x`.
* Hops does not support the outdated Node versions 10
and 13 anymore. In case you're using one of these, please update your
Node version to the current version 14 or the LTS version 12.
* Jest peerDependency has been changed from 24->26





[Hops v12 changelog](https://github.com/xing/hops/blob/v12.x/CHANGELOG.md)
