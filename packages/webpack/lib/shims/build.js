import entryPoint from 'hops/entrypoint';

entryPoint();

if (module.hot) {
  module.hot.accept('hops/entrypoint', () => entryPoint());
}
