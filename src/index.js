import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './login.js';

function Home(props) {
  return (
    <Login />
);
}


export default Home;

ReactDOM.render(<App />, document.getElementById('root'));
