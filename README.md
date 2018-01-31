<p align="center">
  <img
    width="200"
    height="217"
    src="https://github.com/xing/hops/blob/master/logo.png?raw=true"
  />
</p>

<h1 align="center">Hops Development Environment</h1>

<p align="center">
  <a href="https://travis-ci.org/xing/hops">
    <img src="https://img.shields.io/travis/xing/hops.svg">
  </a>
</p>
<p>&nbsp;</p>

Hops is everything you need to develop and deploy a production grade universal web application with [React](https://facebook.github.io/react/). It provides both a **universal runtime** as well as the necessary **build tooling**.

### Philosophy

Hops targets the the professional React developer and follows React mainstream best practices.

The two guiding principles are:

1. Hops scales with your requirements, from an easy start up to large scale applications with many teams
1. Hops fits a broad need by being modular and extensible, it comes with reasonable defaults, but allows you to customize, configure, and extend almost everything when needed

Hops is designed to simplify getting started with modern frontend tooling. It streamlines [Webpack](https://webpack.js.org) and [Jest](https://facebook.github.io/jest/) configuration featuring [Babel](https://babeljs.io) and [PostCSS](http://postcss.org).

### Quick start

```shell
npx hops init my-awesome-project
cd my-awesome-project
npm start
```

This will start hops in development mode. Visit [http://localhost:8080](http://localhost:8080) to see your app in the browser and make some changes to the code in your editor to see it live-reloading.

### FAQ

#### When is Hops the framework for you?

When you want to share a consistent setting over more than one project. Either now or in the future. This applies to companies with more than one development team or when you constantly set up projects that should be consistent, e.g. training projects, tutorials, consultant work, etc.

Even without striving for consistency across multiple projects you may want to use Hops for a (single) new project when you do not want to write/copy/maintain your own webpack configuration. We feel your pain and have done that for you. However, we try hard to give you all the customizability you may ever need.

#### When is Hops **not** the framework for you?

If you are new to React and just want a small sample app or mainly want to learn, we recommend to get started with [Create React App](https://github.com/facebook/create-react-app). Once you are getting more serious about your application you can still switch to Hops.

#### Why not just use Create React App?

[Create React App](https://github.com/facebook/create-react-app) is great when you want to experiment with or learn React. For simplicity it is neither configurable nor extensible and does not evolve with you when you are ready to create a production ready app. Hops on the other hand might be a bit harder to get started, but has the complete potential for even large scale applications.

Additionally, contrary to Create React App, Hops is geared towards universal apps.

#### Why a framework and not just a few code snippets describing best practices?

There are two main reasons. Firstly, snippets get outdated. Hops, however, is committed to best practices and to evolve with them. Secondly, Hops is organized in modules that need to run both on the client and on the server. Keeping a track of both sides and at the same time maintaining an in-sync version of a client-side and server-side snippet per module can be really tedious. Using a framework like Hops takes away that pain.

#### Why does Hops not support "eject"?

[Create React App](https://github.com/facebook/create-react-app) offers you the option to "eject". This means dumping Webpack configuration files and scripts, leaving you with a stand-alone project. We Hops people do not think, this is a good idea. Those files still force their philosophy on you while at the same time they are hard to understand. We thus do not believe this to be a practical way to overcome vendor lock-in. Hops instead allows you to customize either by configuration or adding modules.

#### Can we trust in Hops to be around for the forseeable future?

Just as you might put trust into React as Facebook has committed itself to it and eats its own dog food, Hops is being backed and used by a European professional networking site.

Hops being primarily an (extensible) bunch of mainstream best practices, it ought to be rather simple to move off it and do something that better fits the user's requirements. So, the lock-in ought to be way less problematic than, say, with React. Porting a non-trivial app from React to Angular or Vue certainly is a lot more work than replacing Hops with its actual building blocks (Webpack, Babel, etc.)

#### Why so many modules?

First of all some modules are separated from others for ease of development, but can be seen as one logical entity by you. Like `react`, `react-dom`, and `prop-types`. It also enables you to just have a minimal set of modules for each setting. E.g. when deploying your app, you do not need the CLI or the build module. Hops core modules are thus split between build, runtime, and deploy.

There are more modules in the Hops repository except for the core, but they are merely options to give you choices.

#### I like Hops, but I want to use something that is not quite mainstream

Hops allows you to write a package of your own and plug it into Hops' build process. This has been proven to actually work. E.g. people have done this for TypeScript, styled-components and more.

#### How does Hops compare to Angular?

You could say Hops is for React what the Angular eco system and the Angular CLI are for Angular. Hops follows React's mainstream of libraries and best practices, but still allows you to deviate when you really want to or need to.

### Contributing

Hops uses [lerna](https://github.com/lerna/lerna) and [yarn](https://yarnpkg.com/en/) for development and publishing of the packages. Therefore it is required to have `yarn` globally available.

If you want to contribute to this project, create a fork of its [repository](https://github.com/xing/hops/fork) using the GitHub UI. Check out your new fork to your computer:

```bash
mkdir hops && cd $_
git clone git@github.com:user/hops.git .
```

Afterwards, you can `yarn install` the required dependencies and then run `yarn bootstrap` to install the dependencies of all packages and link the packages together.

Using `yarn start` will execute the `start` script in the [hops-template-react](https://github.com/xing/hops/tree/master/packages/template-react) so that you can verify your changes in the browser.

When you are finished, please do go ahead and create a [pull request](https://help.github.com/articles/creating-a-pull-request/).

Hops is entirely written in ECMAScript 5 and its code is formatted using [prettier](https://prettier.io). Please make sure your contribution does, too.

### Thanks!

The beautiful hops icon used in the logo was created by [The Crew at Fusionary](https://thenounproject.com/fusionary/) and provided via [The Noun Project](https://thenounproject.com/term/hops/9254/). It is licensed under a [Creative Commons](http://creativecommons.org/licenses/by/3.0/us/) license.
