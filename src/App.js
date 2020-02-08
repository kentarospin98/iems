import React from 'react';
import './App.css';
import './butterCake.css';

import Home from './index.js';

function App(props) {
  return (
    <div className="App" >
    <Home props={props}/>
    </div>
  );
}

export default App;
