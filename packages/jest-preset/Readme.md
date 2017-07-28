# hops-jest-preset
A [jest preset](https://facebook.github.io/jest/docs/configuration.html#preset-string) that makes it easer for hops powered apps to use jest.

It ensures that babel works correctly out of the box and that requiring files such as images does not produce errors. [identity-obj-proxy](https://github.com/keyanzhang/identity-obj-proxy) is used to make working with css modules easier in tests.

## Usage

Add `hops-jest-preset` as [preset](https://facebook.github.io/jest/docs/configuration.html#preset-string) to your jest config. 
This can for example be done by adding it to your package.json.

```json
{
  "jest": {
    "preset": "hops-jest-preset"
  }
}
```

Also you need to install the peer dependencies.
