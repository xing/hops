import React from 'react';
import Match from 'react-router/Match';


import { headline } from './styles.css';


const Home = () => (
  <h1 className={ headline }>Hello World!</h1>
);

const App = () => (
  <div>
    <Match exactly pattern="/" component={ Home } />
  </div>
);


export default App;
