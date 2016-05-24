
Object.assign(exports, {
  mountPoint: 'main',
  title: null,
  routes: null,
  initialState: global.INITIAL_STATE || {},
  createStore: require('./store').createStore,
  history: require('react-router').browserHistory
});
