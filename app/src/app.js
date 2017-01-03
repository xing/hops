import React from 'react';
import Match from 'react-router/Match';


const Home = () => (
  <h1>Hello World!</h1>
);

const App = () => (
  <div>
    <Match exactly pattern="/" component={ Home } />
  </div>
);


export default App;
