
var store = require('./store');

Object.assign(exports, {
  createStore: store.createStore,
  mountPoint: 'main',
  reducers: null,
  routes: null
});
