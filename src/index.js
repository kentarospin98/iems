import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './login.js';
import Schedule from './schedule.js';

function Home(props) {
  return (
    <Login />
    //<Schedule userid='0'/>
);
}


export default Home;

ReactDOM.render(<App />, document.getElementById('root'));
