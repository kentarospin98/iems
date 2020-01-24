import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Login, Apicon} from './login.js';
import Schedule from './schedule.js';

let apicon = new Apicon();

function Home(props) {
  return (
    <Login apicon={apicon}/>
    //<Schedule userid='0'/>
);
}


export default Home;

ReactDOM.render(<App />, document.getElementById('root'));
