This pull request closes issue # (_put the issue number here_)

<!-- This is a template. Feel free to remove the parts you do not need! Start with this line, for example -->

## Current state

<!-- explanation of the current state -->

## Changes introduced here

<!-- explanation of the changes you did in this pull request -->

## Checklist

- [ ] All commit messages adhere to the [appropriate format](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit) in order to trigger a correct release
- [ ] All code is written in untranspiled ECMAScript (ES 2017) and is formatted using [prettier](https://prettier.io)
- [ ] Necessary unit tests are added in order to ensure correct behavior
- [ ] Documentation has been added

<details>
<summary>Bors merge bot cheat sheet</summary>

We are using [bors-ng](https://github.com/bors-ng/bors-ng) to automate merging of our pull requests. The following table provides a summary of commands that are available to reviewers (members of this repository with push access) and delegates (in case of `bors delegate+` or `bors delegate=[list]`).

| Syntax | Description |
| --- | --- |
| bors merge | Run the test suite and push to master if it passes. Short for "reviewed: looks good." |
| bors merge- | Cancel an r+, r=, merge, or merge= |
| bors try | Run the test suite without pushing to master. |
| bors try- | Cancel a try |
| bors delegate+ | Allow the pull request author to merge their changes. |
| bors delegate=[list] | Allow the listed users to r+ this pull request's changes. |
| bors retry | Run the previous command a second time. |

This is a short collection of opinionated commands. For a full list of the commands read the [bors reference](https://bors.tech/documentation/).

</details>
