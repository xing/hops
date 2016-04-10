
var store = require('./store');

Object.assign(module.exports, {
  createStore: store.createStore,
  mountPoint: 'main',
  reducers: null,
  routes: null
});
