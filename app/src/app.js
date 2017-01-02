import React from 'react';
import Match from 'react-router/Match';


const App = () => (
  <div>
    <Match exactly pattern="/" component={ Home } />
  </div>
);

const Home = () => (
  <h1>Hello World!</h1>
);


export default App;
