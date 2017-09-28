
# Hops CLI

hops-cli provides a `hops` binary that should be installed globally.

This binary provides different commands based on the context in which it is called.  
If called inside a hops project it will delegate to the [hops-local-cli](https://github.com/xing/hops/tree/master/packages/local-cli) and provide the commands defined there.

If called outside of a hops project it will expose just a single command `init` which can be used to initialize a new hops project based on a template (by default it will use [hops-template-default](https://github.com/xing/hops/tree/master/packages/template-default)).


## Installation

```bash
npm install --global hops-cli
```

## Usage

```bash
hops init my-new-hops-project [--verbose] [--npm] [--template hops-template-*]
```
This will create a very basic hops example project that is ready to go.

These options are additional:
* `--verbose` - to increase the verbosity of the output for debugging purposes
* `--npm` - to force usage of `npm` instead of `yarn` even if yarn is available
* `--template` - to specify a different template for the intial structure.
  * available templates: `hops-template-default`

Then `cd` into `my-new-hops-project` and execute `hops --help` again to see a list of supported commands. These commands are provided by [hops-local-cli](https://github.com/xing/hops/tree/master/packages/local-cli).


