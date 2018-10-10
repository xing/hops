/* global HOPS_ASSETS */

import { getConfig } from './loader-shim';
/* eslint-disable-next-line import/no-unresolved */
import entrypoint from 'hops-worker-entry-point';

const render = () => entrypoint(getConfig(), HOPS_ASSETS);

render();

if (module.hot) {
  module.hot.accept('hops-worker-entry-point', render);
}
