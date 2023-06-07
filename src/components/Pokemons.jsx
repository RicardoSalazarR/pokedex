import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PokemonCard from './PokemonCard';
import 'boxicons'

const Pokemons = () => {

    const navigate = useNavigate()
    const userName = useSelector(state => state.username);
    const [pokemons, setPokemons] = useState([]);
    const [page, setPage] = useState(1)
    const [writeName, setWriteName] = useState(false)
    const [types, setTypes] = useState([])
    const [pokemonName, setPokemonName] = useState('')

    //pagination
    const pokemonsPerPage = 16
    const lastIndex = page * pokemonsPerPage
    const totalPages = Math.ceil(pokemons.length / pokemonsPerPage)
    const firstIndex = lastIndex - pokemonsPerPage
    const pokemonPaginated = pokemons.slice(firstIndex, lastIndex)
    const pages = []


    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154')
            .then(res => setPokemons(res.data.results))

        axios.get(' https://pokeapi.co/api/v2/type')
            .then(res => setTypes(res.data.results))
    }, [])

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    const filterType = (e) => {
        if(e.target.value){
            axios.get(e.target.value)
            .then(res=>{setPokemons(res.data.pokemon)})
        console.log(e.target.value);
        }else{
            axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154')
            .then(res => setPokemons(res.data.results))
        }
    }

    const buttonsPaginated = pages.slice(page - 1, page + 10)

    const searchPokemon = () => {
        navigate(`/pokemons/${pokemonName}`)
    }

    return (
        <div className='pokedex-container'>
            <h1>Pokedex</h1>
            <p>Welcome {userName}!, here you can find your favorite pokemon</p>

            <div className='pokedex-forms'>

                <div className='switch-container'>
                    <span>type</span>
                    <input type="checkbox" className='hide' id='switch' onChange={() => setWriteName(!writeName)} />
                    <label htmlFor="switch" className='lbl'></label>
                    <span>Pokemon</span>
                </div>
                <section className='inputs-to-search'>
                    <select className={writeName ? 'hide' : 'visible'} id='types' onChange={filterType}>
                        <option value=''>All pokemons</option>
                        {
                            types.map(type => (
                                <option key={type.url} value={type.url}>{type.name}</option>
                            ))
                        }

                    </select>

                    <div className={!writeName ? 'hide' : 'visible'}>
                        <label htmlFor="search-pokemon-name"></label>
                        <input type="text" id='search-pokemon-name' value={pokemonName}
                            onChange={e => setPokemonName(e.target.value)}
                            placeholder='Write the name of a pokemon here' />
                        <button className='search-pokemon' onClick={searchPokemon}>search</button>
                    </div>
                </section>
            </div>


            <ul className='pokemons'>
                {pokemonPaginated.map(pokemon => (
                    <li key={pokemon.name?pokemon.name:pokemon.pokemon.name}>
                        <PokemonCard url={pokemon.url?pokemon.url:pokemon.pokemon.url} />
                    </li>
                ))}
            </ul>
            <div className='buttons-page main'>
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className='button-page'
                >prev</button>
                <div className='buttons-page'>
                    {buttonsPaginated.map((number) => (
                        <button
                            key={number}
                            onClick={() => { setPage(number) }}
                            className='button-page'
                        >{number}</button>
                    ))}
                </div>
                <button
                    onClick={() => {
                        setPage(page + 1)
                    }}
                    disabled={page === totalPages}
                    className='button-page'
                >next</button>
            </div>
        </div>
    );
};

export default Pokemons;