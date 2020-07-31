# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [13.0.0-alpha.1](https://github.com/xing/hops/compare/v13.0.0-alpha.0...v13.0.0-alpha.1) (2020-07-31)


### Bug Fixes

* **react:** declare propTypes for Import component ([a929c7d](https://github.com/xing/hops/commit/a929c7d20a5f477930373d1f99f2eea079a4880e))
* **react:** remove support of react-helmet ([3ea3cc5](https://github.com/xing/hops/commit/3ea3cc534f83cb75dcf8bff61a0dad8ac4cb7d45))
* **react:** require export resolver function in importComponent ([ff71be6](https://github.com/xing/hops/commit/ff71be69ad4d03f453d2c3bdc4177da7961c2bdd))
* **react:** require module loader function in importComponent ([dd6e501](https://github.com/xing/hops/commit/dd6e5017422fff1e3cb20a610c9010e8acc3c2fb))


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





# [13.0.0-alpha.0](https://github.com/xing/hops/compare/v12.0.0-rc99...v13.0.0-alpha.0) (2020-07-23)


### Bug Fixes

* remove support for Node versions 10 & 13 ([00e7f2f](https://github.com/xing/hops/commit/00e7f2fb2ec92b859805b65bfeee697a78bf8147))


### Features

* support latest Node.js (v13) ([30ca9a4](https://github.com/xing/hops/commit/30ca9a4ebc3a43706eb07158259035349ce2d269))


### BREAKING CHANGES

* Hops does not support the outdated Node versions 10
and 13 anymore. In case you're using one of these, please update your
Node version to the current version 14 or the LTS version 12.
