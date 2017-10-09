# Hops Local CLI

hops-local-cli provides a set of commands to manage your hops project.
hops-local-cli will be automatically installed in projects created by [`hops-init` (provided by hops-cli)](https://github.com/xing/hops/tree/master/packages/cli). In other projects it needs to be added as a dependency separately.


## Installation

In case that it isn't already installed (such as an existing hops project) you can add hops-local-cli via npm or yarn:
```bash
npm install --save hops-local-cli
```
or
```bash
yarn add hops-local-cli
```


## Usage
### Available commands

- `hops build` - initiates a project build to generate browser and server JS bundles
- `hops develop` - starts the webpack development server with hot code reloading for fast local iterations
- `hops serve` - starts a production Node.js Express server using the generated JS bundle from `hops build`
- `hops start` - if NODE_ENV is set to production, this runs `hops serve`. Otherwise `hops develop` gets executed

`hops build` accepts additional arguments: `--static` / `-s` to generate static HTML app shells for all configured hops locations.

hops-local-cli only lists commands that are available through other hops packages.

So for example `hops build` and `hops develop` are only available if `hops-build` is installed as a dependency in your project ([`hops-template-default`](https://github.com/xing/hops/tree/master/packages/template-default) includes it by default).

The command `hops serve` is only available if `hops-express` is installed as a dependency in your project (also included in the default template).

And the command `hops start` is only available if both `hops-build` and `hops-express` are installed as dependencies.


## Configuration

hops-local-cli is being configured through [hops-config](https://github.com/xing/hops/tree/master/packages/config) which uses the npm config mechanism (read more at hops-config).

That means that you can run `hops` commands independently and they will use the configuration from your package.json file, you cannot overwrite these values through `npm config set ...` when running hops-local-cli standalone. For that to work you need to run the hops-local-cli through your package.json `scripts` fields.

```JSON
{
  "name": "my-application",
  "scripts": {
    "start": "hops start"
  },
  "config": {
    "hops:": {
      "port": "3000"
    }
  }
}
```
```bash
npm config set my-application:hops:port 1337
```

And now you can execute the "start" command through npm or yarn:
```bash
npm run start
yarn run start
```
