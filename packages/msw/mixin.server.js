/* eslint-env browser, node */

import { Mixin } from 'hops-mixin';
import createDebug from 'hops-debug';

const debug = createDebug('hops:msw:server');

class MswMixin extends Mixin {
  enhanceServerData(serverData, req, res) {
    debug(
      'cookie "mswWaitForBrowserMocks":',
      req.cookies.mswWaitForBrowserMocks
    );

    const { mswWaitForBrowserMocks = false } = req.cookies;
    const { enableMockServiceWorker } = res.locals;

    return {
      ...serverData,
      mswWaitForBrowserMocks,
      enableMockServiceWorker,
    };
  }
}

export default MswMixin;
