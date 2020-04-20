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

#### Releasing a new version

Releasing Hops requires the environment variable `GH_TOKEN` [to be set](https://github.com/lerna/lerna/tree/master/commands/version#--github-release) to a valid [GitHub access token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line) with the `public_repo` scope in order to publish the release notes to the [GitHub releases page](https://github.com/xing/hops/releases).

Thanks! :green_heart:

Hops Team
