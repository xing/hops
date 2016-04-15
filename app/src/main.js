
import React, { Component, PropTypes } from 'react';
import { Route, IndexRoute } from 'react-router';
import { connect } from 'react-redux';

import { createReducer, render } from 'hops';

/*
 * App is your container element. Everything will be passed to it as `props`,
 * including its child elements or `children` [1]. It is a stateless component
 * in the sense that it has no local state and no direct connection to the
 * central state.
 *
 * App could have been implemented as a pure functional component, but there are
 * still some issues [3] with these and hot module replacement.
 *
 * ({ children }) => (<div>{ children }</div>)
 *
 * [1]: https://facebook.github.io/react/docs/multiple-components.html#children
 * [2]: https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#stateless-functional-components
 * [3]: https://github.com/gaearon/babel-plugin-react-transform/issues/57
 */
class App extends Component {
  static propTypes = {
    children: PropTypes.node
  };
  render() {
    const { children } = this.props;
    return (
      <div>{ children }</div>
    );
  }
}

/*
 * Importing from a CSS file will allow you to import top-level class
 * definitions. In this case style.css contains the class `.headline` and that
 * is what is being imported here. Local class[1] definitions will be created,
 * and your `.headline` class will look something like `.style-headline-3i7jG`
 * to avoid collisions [2].
 *
 * [1]: https://github.com/webpack/css-loader#local-scope
 * [2]: https://github.com/css-modules/css-modules
 */
import { headline } from './style.css';

class Headline extends Component {
  static propTypes = {
    greeting: PropTypes.string
  };
  render() {
    const { greeting } = this.props;
    return (
      <h1 className={ headline }>{ greeting }</h1>
    );
  }
}

const reducer = createReducer('home');
const { createSelector, createAction, registerReducer } = reducer;

/*
 * To modify your application's state, you need to dispatch actions [1].
 * Usually, these actions are plain JavaScript objects. You can conveniently
 * create simple update [2] actions using the `createAction` helper.
 *
 * If you need to dispatch asynchronous actions, such as a `fetch`[3] call or a
 * process in the background via WebWorkers, dispatch a function and
 * have it return a promise, which is needed for rendering in node [4].
 *
 * [1]: http://redux.js.org/docs/basics/Actions.html
 * [2]: https://facebook.github.io/react/docs/update.html
 * [3]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * [4]: https://github.com/gaearon/redux-thunk
 */
const fetchDataAsync = dispatch => (
  new Promise(resolve => {
    setTimeout(() => {
      dispatch(createAction({
        'greeting': { '$set': 'Hello World!' }
      }));
      resolve();
    }, 1);
  })
);

/*
 * Home is your stateful component: It is `@connect`ed to the central store.
 * Decorators like `@connect`, at least in the current form, wrap a function or
 * class in another function. More information in [1].
 *
 * `createSelector` is a function provided for you by the hops stack, you
 * can find it in [2]. It's a handy utility function that maps your state
 * to the props of the element.
 *
 * The reducer where this function comes from is 'home', so this createSelector
 * will get state['home'] and the resulting object or value will become the
 * props for this class. If the reducer was created via createReducer('users'),
 * createSelector would instead fetch state['users'].
 *
 * [1]: https://www.npmjs.com/package/babel-plugin-transform-decorators-legacy
 * [2]: https://github.com/xing/hops/blob/master/lib/store.js#L25
 */
@connect(createSelector())
class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func
  };
  static fetchData(dispatch) {
    return dispatch(fetchDataAsync);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    this.constructor.fetchData(dispatch);
  }
  render() {
    /*
     * Destructuring[1] the `props` [2] object of Home into Headline will give
     * Headline a copy of the Home props, allowing it to have access to, for
     * instance, "greeting". So the result, abbreviated, would be something
     * like this (note it will pass ALL values in this.props):
     *
     *   <Headline greeting={this.props.greeting} />
     *
     * [1]: http://mzl.la/1Wty31k
     * [2]: https://facebook.github.io/react/docs/tutorial.html#using-props
     */
    return (
      <Headline { ...this.props } />
    );
  }
}

/*
 * The registerReducer function can take an object which should contain any
 * other reducer you might have created somewhere else and it will have. For
 * example:
 *
 * import myOtherReducers from './reducersFile' // => { reducerA, reducerB }
 * import { createReducer } from 'hops'
 *
 * const homeReducer = createReducer('home')
 * const allReducers = homeReducer.registerReducer(myOtherReducers)
 */
const reducers = registerReducer();
const routes = (
  <Route path='/' component={ App }>
    <IndexRoute component={ Home } />
  </Route>
);

/*
 * You need to make sure you call hops' render function and export its return
 * value to enable universal (isomorphic) rendering.
 */
export default render({ routes, reducers });
