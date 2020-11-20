import React, {useState} from 'react'
// Importamos componente Header
import Header from './components/Header';
// Importamos componente Characters
import Characters from './components/Characters';

import ThemeContext from './context/ThemeContext';

import './App.css';

function App() {

const [theme, updateTheme] = useState("bg-light");

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <div className={theme}>
        <Header />
        <Characters />
        
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
