import { render } from 'hops';
import React from 'react';
import styled from 'styled-components';

const H1 = styled.h1`
  position: sticky;
`;

export default render(<H1>hello</H1>);
