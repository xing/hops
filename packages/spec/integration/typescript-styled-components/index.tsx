import * as React from 'react';
import { render } from 'hops';

// Fixes the TS compilation for the CSS prop.
// Importing the empty object is actually required,
// otherwise the error "Module not found: Error:
// Can't resolve 'styled-components/cssprop'"
// is thrown.
// https://styled-components.com/docs/api#usage-with-typescript
import {} from 'styled-components/cssprop';

export default render(
  <h1
    css={`
      color: rgb(255, 0, 255);
    `}
  >
    Hello World.
  </h1>
);
