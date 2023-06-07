import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PokemonCard = ({ url }) => {

    const [pokemon, setPokemon] = useState({})

    useEffect(() => {
        axios.get(url)
            .then(res => setPokemon(res.data))
    }, [])
    let color = ''
    const type = pokemon.types?.[0].type.name
    type ==='grass'?color='rgb(112, 204, 177)':
    type === 'fire'?color = 'rgb(235, 117, 113)':
    type === 'water'?color = 'rgb(125, 183, 244)':
    type === 'bug'?color = 'rgb(142, 231, 124)':
    type === 'normal'?color = 'rgb(100, 74, 81)':
    type === 'poison'?color = 'rgb(134, 90, 156)':
    type === 'fighting'?color = 'rgb(141, 67, 45)':
    type === 'flying'?color = 'rgb(78, 102, 121)':
    type === 'rock'?color = 'rgb(64,27,15)':
    type === 'ghost'?color = 'rgb(48, 53, 102)':
    type ==='steel'?color='rgb(97, 114, 108)':
    type === 'electric'?color = 'rgb(227, 222, 85)':
    type === 'psychic'?color = 'rgb(149, 209, 240)':
    type === 'bug'?color = 'rgb(85, 136, 146)':
    type === 'dark'?color = 'rgb(4, 7, 6)':
    type === 'fairy'?color = 'rgb(140, 39, 68)':
    type === 'ground'?color = 'rgb(253, 234, 96)':
    type === 'ice'?color = 'rgb(149, 200, 240)':
    type === 'dragon'?color = 'rgb(85, 136, 146)':
    color = 'rgb(149, 200, 240)'
    
    
    return (
        <Link to={`/pokemons/${pokemon.id}`} className='pokecard' style={{backgroundColor:color}}>
            <div className='card-description'>
                <h3>{pokemon.name}</h3>
                <div><b>Types: </b>{pokemon.types?.map((type) => type.type.name + ' ')}</div>
                <div><b>hp: </b>{pokemon.stats?.[0].base_stat}</div>
                <div><b>attack: </b>{pokemon.stats?.[1].base_stat}</div>
                <div><b>defense: </b>{pokemon.stats?.[2].base_stat}</div>
                <div><b>speed: </b>{pokemon.stats?.[5].base_stat}</div>
            </div>
            <img src={pokemon.sprites?.other.dream_world.front_default} alt="" />
        </Link>
    );
};

export default PokemonCard;