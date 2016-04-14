
import React, { Component, PropTypes } from 'react';
import { Route, IndexRoute } from 'react-router';
import { connect } from 'react-redux';

import { createReducer, render } from 'hops';

/*
 * App is you "container" element. Every other element will be passed as "props"
 * to it, they will be in the key "children"[1]. As you see this is a dumb
 * component and has NO access to the store and state as it does not need it.
 *
 * [1]: https://facebook.github.io/react/docs/multiple-components.html#children
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
 * definitions. In this case style.css contains only the class .headline, that's
 * what's getting imported. Local class[1] definitions will be created, and your
 * .headline class will look something like .style-headline-3i7jG to avoid
 * collisions[2].
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
 * The promise here is essentially unnecessary, but serves as an example of how
 * you could dispatch other async actions, such as a `fetch`[1] call, a process
 * in the background via WebWorkers, or anything that could return a promise.
 * This is achieved via redux-thunk[2]. If your action does not do async
 * stuff you probably don't need this and your action creator should not return
 * a function.
 *
 * hops's createStore[3] makes some assumptions, one of them is the fact that
 * you will be using thunk for async stuff. You don't have to, if you take a
 * look at lib/store.js you should notice that the createStore method accepts an
 * enhancer argument. That should be enough to figure out how to use something
 * else like redux-saga. If it isn't enough we recommend you stick with
 * redux-thunk to get started!
 *
 * [1]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * [2]: https://github.com/gaearon/redux-thunk
 * [3]: https://github.com/xing/hops/blob/master/lib/store.js#L38-L52
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
 * Home is your stateful component. Decorators, at least in the old form, wrap a
 * function or class in another function. More information in [1]. The
 * createSelector is a function provided for you by the hops stack, you
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
     * Destructuring[1] the "props"[2] object of Home into Headline will give
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
export default render({ routes, reducers });
