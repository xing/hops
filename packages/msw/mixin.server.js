/* eslint-env browser, node */

import { Mixin } from 'hops-mixin';
import createDebug from 'hops-debug';

const debug = createDebug('hops:msw:server');

class MswMixin extends Mixin {
  enhanceServerData(serverData, req, res) {
    // this value has been set on `app.locals`, because it is a "global"
    // value that should affect all following requests after it has been
    // set.
    const { mswWaitForBrowserMocks = false } = res.app.locals;
    debug('mswWaitForBrowserMocks:', res.app.locals.mswWaitForBrowserMocks);

    return {
      ...serverData,
      mswWaitForBrowserMocks,
    };
  }
}

export default MswMixin;
