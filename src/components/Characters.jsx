// importar useState, useEffect, useReducer y useMemo
import React, {useState, useEffect, useReducer, useMemo} from 'react'

import "../assets/styles/components/Characters.css";

//Crear el estado inicial
const initialState = {
    favorites: []
};

//Crear reducer
const favoriteReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_FAVORITE':
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            };
        default:
            return state;
    }
}

const Characters = () => {
    /**
     * Lógica de useState
     * constante donde internamente estructuramos los elementos que necesitamos
     * de useState y lo iniciamos como un vector vacío
     */
    const [characters, setCharacters] = useState([]);
    
    const [favorites, dispatch] = useReducer(favoriteReducer, initialState)

    // useState que se encarga de la búsqueda
    const [search, setSearch] = useState('');

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
    }, []);
    
    const handleClick = favorite => {
        dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite})
    }

    //funcion para manejar la búsqueda
    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    // filtrado de personajes
    /*
    const filteredUsers = characters.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
    })
    */
    // usar useMemo
    const filteredUsers = useMemo(() => 
        characters.filter((user) => {
            return user.name.toLowerCase().includes(search.toLowerCase());
        }),
        [characters, search]
    )


    /** 
     * Nombre del personaje
     * Iteramos por cada uno de los elementos
     */
    return (
        <section className="section__card">
            <div className="Characters">
                {favorites.favorites.map(favorite => (
                    <li key={favorite.id}>
                        {favorite.name}
                    </li>
                ))}

                <div>
                    <input class="btn btn-primary" type="text" value={search} onChange={handleSearch} />
                </div>

                {/* Cambiamos characters por filtered para usar el filtrado de personajes  */}
                {filteredUsers.map(character => (
                        <div className="Characters__card">
                            <div className="Characters__image">
                                <img src={character.image} alt="" srcset=""/>
                            </div>
                            <div className="Characters__name">
                                <h2>{character.name}</h2>
                                <button type="button" onClick={()=> handleClick(character)}>Agregar a favoritos</button>
                            </div>
                        </div>
                    )
                )}
            </div>
        </section>
    )
}

export default Characters
