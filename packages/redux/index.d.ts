import { Middleware, ReducersMapObject, Action as ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Config } from 'hops';

declare module 'hops-redux' {
  interface HopsReduxActionCreatorObject {
    action: ActionCreator | ThunkAction<any, any, any, any>;
    path: string;
    exact?: boolean;
    strict?: boolean;
  }
  type HopsReduxActionCreatorFunction = (
    config: Config
  ) => HopsReduxActionCreatorObject;
  type HopsReduxActionCreator =
    | HopsReduxActionCreatorObject
    | HopsReduxActionCreatorFunction;

  export interface HopsReduxOptions {
    redux: {
      reducers: ReducersMapObject;
      middlewares?: Middleware[];
      actionCreators?: HopsReduxActionCreator[];
      alwaysDispatchActionsOnClient?: boolean;
    };
  }
}
