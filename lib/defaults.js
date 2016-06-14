/**
 * @module defaults
 * @exports mountPoint
 * @exports title
 * @exports routes
 * @exports initialState
 * @exports createStore
 * @exports history
 * @author Somebody <somebody@foo.bar>
 */

/**
 * assign defaults to exports
 * @property  {String} [mountPoint] - querySelector of mount point
 * @property  {String} [title] - title of app
 * @property  {Route} [routes] - routes of app
 * @property  {Object} [initialState] - global initial state
 * @property  {History} [history] - browser history
 */
Object.assign(exports, {
  mountPoint: 'main',
  routes: null,
  history: require('react-router').browserHistory,
  initialState: global.INITIAL_STATE || {},
  createStore: require('./store').createStore
});
