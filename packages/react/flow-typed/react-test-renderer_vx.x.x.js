
declare module 'react-test-renderer' {

  declare type TestRendererOptions = {
    createNodeMock: (element: ReactElement<any>) => any;
  };

  declare module.exports: {
    create(
      Component: React$Element<*>,
      options?: TestRendererOptions
    ): {
      toJSON(): {
        props: $PropertyType<Component, 'props'>,
        type: $PropertyType<Component, 'type'>,
        children: $PropertyType<Component, 'children'>,
      }
    }
  };
}
