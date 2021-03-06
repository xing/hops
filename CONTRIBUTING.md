# How to Contribute to Hops

First off, we really value your contribution. Thanks for wanting to help us with your time and talent! :rainbow:

### Did you find a bug?

- Ensure the bug was not already reported by searching on GitHub under [Issues](https://github.com/xing/hops/issues).

- If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/xing/hops/issues/new). Be sure to include a title and clear description, as much relevant information as possible, and a code sample or an executable test case demonstrating the expected behavior that is not occurring.

### Did you write a patch that fixes a bug?

- Open a new GitHub pull request with the patch.

- Ensure the PR description clearly describes the problem and solution. Include the relevant issue number if applicable.

### Do you intend to add a new feature or change an existing one?

- Suggest your change as an issue on GitHub to collect positive feedback about the proposal before starting to actually write code.

- Before submitting code, please make sure you update or extend the existing test cases, documentation and run `yarn test` in Hops' root folder.

All code in this repository is expected to be formatted using [prettier](https://prettier.io), and we will only merge valid [conventional commits](https://conventionalcommits.org) in order to enable automatic [versioning](https://semver.org).

### Branching in Hops

We are using the `master` branch as our **staging branch** and we have a maximum of two active **release branches** at a time. The release branches follow the naming convention of `vN.x` (where `N` is the major version number of that release).

All PRs (except for PRs generated by renovate or release PRs) must be made against `master` and include in their description, and through a label, for which release they are intended.

### Releasing a new version

Hops releases are fully automated through the release-bot.

Each PR must have at least one release label, indicating which version it targets (":package: master", ":package: v14", etc..). Once the PR has been merged the release-bot will try to cherry-pick it onto the respective release branch and notify you if there has been a merge conflict. Then the release-bot creates a "Release PR", which - once merged - will trigger an automatic publish to npm.

#### Releasing a new major version

Releasing a new major version is not yet covered by the release-bot and therefore has to be done manually. For that it is required to have a valid GitHub personal access token set in the `GH_TOKEN` environment variable and npm must be logged in to a user that has publish rights for all Hops packages.

##### Before the release

Repository configuration:

- Add a new release label
- Configure branch protection for the new release branch (once it exists)

These steps are to be done on the master branch:

- Add the new release label to the check-label config ([example](https://github.com/xing/hops/pull/1682/commits/1fc5688406594e769621e3836809d21a0da18604))
- Update the release-bot config for the new branches ([example](https://github.com/xing/hops/pull/1682/commits/07187953765851052f5aef32647d5a96f400cabe))
- Update base branches in renovate config ([example](https://github.com/xing/hops/pull/1682/commits/dad6ee42a1d80dcccb47c587c61ebeb02ea2a819))
<!-- TODO: add new commit here that includes the update of the "branches-ignore"-property in node-ci.yml -->
- Update the branches in CI workflows ([example](https://github.com/xing/hops/pull/1682/commits/f9fb27bee52d511c879b9cf2efd484317706832a))
- Update documentation links ([example](https://github.com/xing/hops/pull/1682/commits/67b14b9ce66db3281e9e5ab2f53172afabd5f7bc))

These steps are to be done on the previous release branch:

- Update the npm dist-tags in the lerna config ([example](https://github.com/xing/hops/pull/1678))

##### Release

These steps are to be done on the master branch:

- Update the `create-hops-app` bin entry ([example](https://github.com/xing/hops/pull/1696))
- Run `yarn release:graduate` to turn the prerelease into a major release
- Create a new release branch off of the release commit
- Run `yarn release:create-nightly` to create the first nightly release for the next major version

##### After the release

These steps are to be done on the master branch:

- Clear out the changelogs and update the link in the root changelog ([example](https://github.com/xing/hops/pull/1695))
- (Update the canarist branch config for some of the internal repositories)

Thanks! :green_heart:

Hops Team
