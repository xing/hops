
Object.assign(exports, {
  mountPoint: 'main',
  routes: null,
  history: require('react-router').browserHistory,
  initialState: global.INITIAL_STATE || {},
  createStore: require('./store').createStore
});
