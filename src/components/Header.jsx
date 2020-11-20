//rafce (short)

// traemos useState al documento
import React, {useState, useContext} from 'react'
import ThemeContext from '../context/ThemeContext';

import "../assets/styles/components/Header.css";

const Header = () => {
    /**
     * Integrar useState a esta logica
     * useState va a manejar este estado 
     * y haremos una función que cambia de Darmode a lightmode
     */

    /**
     * Constante que va a estructurar 2 elementos
     * el primero(darkMode) es el estado
     * el segundo(setDarkMode) es la función que cambiará al estado(darkMode)
     * de useState y lo pasamos como una función con estado inicial false
     */
    const [darkMode, setDarkMode] = useState(false);
    const { theme, updateTheme } = useContext(ThemeContext);

    //const color = useContext(ThemeContext);
    /**
     * Función para hacer los cambios de estado
     */
    const handleClick = () => {
        setDarkMode(!darkMode);
        theme === "bg-light" ? updateTheme("bg-dark") : updateTheme("bg-light");
    };

    /*
     * Creamos el header con el logo 
     * y un boton para activar el DarkMode
     * dentro del boton ingresamos la logica para mostrar darkmode o lightMode
     */ 
    return (
        <>
            <h1>React hooks</h1>
            <div className="Header">
                <div className="Header__button" onClick={handleClick}>
                    {!darkMode ? 'Dark Mode' : 'Light Mode'}
                </div>
                
                {/* <button type="button" onClick={() => setDarkMode(!darkMode)}>{darkMode ? 'Dark Mode 2' : 'Light Mode 2'}</button> */} 
            </div>
        </>
    )
}

export default Header
