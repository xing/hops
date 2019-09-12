import * as React from 'react';
import { BrowserRouterProps } from 'react-router-dom';

declare module 'hops' {
  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  export class Miss extends React.Component {}

  export interface StatusProps {
    code: number;
  }
  export class Status extends React.Component<StatusProps> {}

  export interface HeaderProps {
    name: string;
    value: string;
  }

  export class Header extends React.Component<HeaderProps> {}

  export interface ImportComponentRenderOptions<Props> {
    Component: React.ComponentType<Props>;
    error: boolean;
    loading: boolean;
  }

  export interface ImportComponentOptions<Props> {
    loader?: (load: Promise<any>) => Promise<any>;
    render?: (
      options: ImportComponentRenderOptions<Props> & Props
    ) => React.ReactNode;
  }

  export function importComponent<Props>(
    load: () => Promise<{ default: React.ComponentType<Props> }>
  ): React.ComponentType<ImportComponentOptions<Props> & Props>;

  export function importComponent<Props, Exports>(
    load: () => Promise<Exports>,
    resolver: (exports: Exports) => React.ComponentType<Props>
  ): React.ComponentType<ImportComponentOptions<Props> & Props>;

  export function importComponent<Props>(
    module: string,
    exportName?: string
  ): React.ComponentType<ImportComponentOptions<Props>>;

  export interface ServerData {
    [key: string]: any;
  }

  export interface Config {
    [key: string]: any;
  }

  export const ServerDataContext: React.Context<ServerData>;

  export const ConfigContext: React.Context<Config>;

  export function withServerData<P, C = ServerData,>(
    Component: React.ComponentType<P & { serverData: C }>
  ): React.ComponentType<P>;

  export function withConfig<P, C = Config>(
    Component: React.ComponentType<P & { config: C }>
  ): React.ComponentType<P>;

  export class Mixin {}

  export const strategies: any;

  export interface HopsOptions {
    router?: BrowserRouterProps;
  }

  export function render<Options = { [key: string]: any }, P = {}>(
    reactElement: React.ReactElement<P>,
    options?: Options & HopsOptions
  ): void;
}
