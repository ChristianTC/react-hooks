import React from 'react'
// Importamos componente Header
import Header from './components/Header';
// Importamos componente Characters
import Characters from './components/Characters';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Characters />
      <h1>
        Hola Mundo
      </h1>
    </div>
  );
}

export default App;
