# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [5.1.0] - 2016-05-15
### Added
- webpack-manifest-plugin is now a dependency and active in both dev and production builds

### Changed
- updated dependencies (mocha, postcss-loader...)

## [5.0.1] - 2016-05-09
### Changed
- updated dependencies (babel-core, postcss, semistandard...)

## [5.0.0] - 2016-04-07
### Added
- changelog.md 

### Changed
- sourcemap support is now only installed for Node.js rendering if Webpack render config contains a truthy `devtool` property

### Removed
- `close`-method from transpilation emitter as it was redundant in all known use-cases
