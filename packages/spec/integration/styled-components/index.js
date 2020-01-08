import { render } from 'hops';
import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';

const H1 = styled.h1`
  position: sticky;
`;

export default render(
  <>
    <Helmet>
      <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
    </Helmet>
    <H1>hello</H1>
  </>
);
