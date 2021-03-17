import { render } from 'hops';
import React from 'react';
import { Helmet } from 'react-helmet-async';

// Verify both namespace & default imports work fine
// while we're still using module type CommonJS
// for CSS Modules.
import * as styles from './styles.css';
import otherStyles from './other-styles.css';

/* eslint-disable import/no-unresolved */
import './global.css?global';
import 'animate.css/animate.min.css?global';
/* eslint-enable import/no-unresolved */

export default render(
  <>
    <Helmet>
      <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
    </Helmet>
    <h1
      className={`${styles.headline} ${otherStyles.strike} fancy-headline animate__animated`}
    >
      hello
    </h1>
  </>
);
