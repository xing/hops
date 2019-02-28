declare module 'hops-styled-components' {
  export interface HopsStyledComponentsOptions<
    T extends object = {},
    U extends object = T
  > {
    styled?: {
      theme?: T | ((theme: U) => T);
    };
  }
}
