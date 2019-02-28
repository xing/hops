import { Middleware, ReducersMapObject, Action as ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

declare module 'hops-redux' {
  interface HopsReduxActionCreator {
    action: ActionCreator | ThunkAction<any, any, any, any>;
    path: string;
    exact?: boolean;
    strict?: boolean;
  }

  export interface HopsReduxOptions {
    redux: {
      reducers: ReducersMapObject;
      middlewares?: Middleware[];
      actionCreators?: HopsReduxActionCreator[];
      alwaysDispatchActionsOnClient?: boolean;
    };
  }
}
