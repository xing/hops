import { render } from 'hops';
import React from 'react';
import styles from './styles.css';
/* eslint-disable import/no-unresolved */
import './global.css?global';
import 'animate.css/animate.min.css?global';
/* eslint-enable import/no-unresolved */

export default render(
  <>
    <Helmet>
      <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
    </Helmet>
    <h1 className={`${styles.headline} fancy-headline animated`}>hello</h1>
  </>
);
