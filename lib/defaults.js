
Object.assign(exports, {
  mountPoint: 'main',
  title: null,
  routes: null,
  createStore: require('./store').createStore,
  initialState: global.INITIAL_STATE || {},
  history: null
});
