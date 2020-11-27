// importar useState, useEffect, useReducer, useMemo, useRef y useCallback
import React, {useState, useEffect, useReducer, useMemo, useRef, useCallback } from 'react'
import Search from './Search';
// import useCharacters (hook personalizado de useEffect)
import useCharacters from '../hooks/useCharacters';

import "../assets/styles/components/Characters.css";

//Crear el estado inicial
const initialState = {
    favorites: []
};

const API = 'https://rickandmortyapi.com/api/character/';

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
    
    // ELiminamos logica de useState


    const [favorites, dispatch] = useReducer(favoriteReducer, initialState)

    // useState que se encarga de la búsqueda
    const [search, setSearch] = useState('');

    // useRef 
    const searchInput = useRef(null);


    //Quitamos la parte de use effect para implementar el useCharacters.
    const characters = useCharacters(API);

    
    const handleClick = favorite => {
        dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite})
    }

    //funcion para manejar la búsqueda
    /*
    const handleSearch = (event) => {
        setSearch(event.target.value)
    }
    */
   //usando useRef
    /*
    const handleSearch = () => {
        setSearch(searchInput.current.value);
    }
    */

    const handleSearch = useCallback(()=>{
        setSearch(searchInput.current.value)
    }, [])





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

                <Search search={search} handleSearch={handleSearch} searchInput={searchInput} />

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
