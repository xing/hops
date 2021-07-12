/* eslint-env browser, node */

import { Mixin } from 'hops-mixin';

class MswMixin extends Mixin {
  enhanceServerData(serverData, req, res) {
    // this value has been set on `app.locals`, because it is a "global"
    // value that should affect all following requests after it has been
    // set.
    const { mswWaitForBrowserMocks = false } = res.app.locals;

    return {
      ...serverData,
      mswWaitForBrowserMocks,
    };
  }
}

export default MswMixin;
