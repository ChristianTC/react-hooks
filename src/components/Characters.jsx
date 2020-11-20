// importar useState y useEffect
import React, {useState, useEffect} from 'react'


const Characters = () => {
    /**
     * Lógica de useState
     * constante donde internamente estructuramos los elementos que necesitamos
     * de useState y lo iniciamos como un vector vacío
     */
    const [characters, setCharacters] = useState([]);
    
    /**
     * Lógica de useEffect
     * es una función con 2 parámetros
     * el primero es una función anónima donde va a estar la lógica
     * el segundo es una variable que esta escuchando si hay cambios 
     */
    useEffect(() => {
        // useEffect llama a fetch, el cual obtiene la informacion de la api de RickAndMorty
        fetch('https://rickandmortyapi.com/api/character/')
        .then(response => response.json())
        .then(data => setCharacters(data.results));
    }, [])
    
    /** 
     * Nombre del personaje
     * Iteramos por cada uno de los elementos
     */
    return (
        <div className="Characters">
            {characters.map(character => (
                <h2>{character.name}</h2>
            ))}
        </div>
    )
}

export default Characters
