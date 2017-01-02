import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import BrowserRouter from 'react-router/BrowserRouter'

import App from './app';


export default () => {

  const mountPoint = document.querySelector('#main');

  unmountComponentAtNode(mountPoint);

  render(
    <BrowserRouter><App/></BrowserRouter>,
    mountPoint
  );
};
