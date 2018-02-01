## Architectural Principles

Many of the architectural decisions directly derive from the requirement that

1. Hops optimizes for universal ("isomorphic") web applications

2. Hops is modular and extensible

## Render Contexts

### Two render functions

Hops is universal. That means rendering needs to happen both on the server as well as on the client, though, though how that is done is different on both sides.

Because of this there are two render methods with the same signature in the react package. One on the server side and one on the client side.

### Render functions need to be extensible

Hops is modular and extensible. That also means new packages need to be able to extend the render process both on the client as well as on the server side.

Having a fixed render method for each package and extension is not feasible, as packages need to cooperate with each other, without having knowledge, i.e. dependencies to, one another.

### Conclusion: Each package provides pieces of code instrumented by the render functions

What you do is to configure all the packages that you need and bring them in an order. Each package defines a set of code snippets that are then executed using a specific strategy. This is different from client to server.

Client Side:

1. Getting the mount point: There can only be one, the package defined last, defines this
2. Bootstrapping of the application: Executed in parallel for all packages
3. Wrapping the element to be rendered (e.g. Router, Redux Provider): Wrappers for all extensions are applied and nested into each other, the last package is on the inside.

Server Side:

1. Bootstrapping (as on Client Side)
2. Wrapping into elements (as on Client Side)
3. Getting the template to embed the server side rendering markup into: can be composed by many packages, template itself has extension points
4. Using the template create a rendered results: the last package having a function to render a template is used

In the [React Package] (../packages/react/README.md) you can find details of the [render function](../packages/react/README.md#renderreactelement-context), 
[React Context](../packages/react/README.md#reactcontext), and the [life cycle API](../packages/react/README.md#lifecycle-api).
