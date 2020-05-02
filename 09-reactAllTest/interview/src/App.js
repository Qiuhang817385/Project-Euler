import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import './a.scss';
import VConsole from 'vconsole';

import Router from './Router'
// import Subscribe from './component/subscribe/Subscribe';
function App () {
  // require('vconsole.min.js')
  let vConsole = new VConsole();

  return (
    <div className="App">
      <Router></Router>
    </div>
  );
}

export default App;
