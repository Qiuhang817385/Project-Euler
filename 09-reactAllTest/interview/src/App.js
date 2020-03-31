import React from 'react';
import './App.css';
import './a.scss';
import Header from './Header.js'
import { ThemeContext } from './context.js';
function App () {
  return (
    <div className="App">
      <ThemeContext.Provider value='dark'>
        <Header></Header>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
