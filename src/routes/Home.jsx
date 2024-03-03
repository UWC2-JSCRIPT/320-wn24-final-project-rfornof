import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
export function Home() {
    const [pokemonList, SetPokemonList] = useState([]);
    const [option, SetOption] = useState({next: '', previous: ''});

    useEffect(() => {
        fetchPokemon();
    }
    , []);

    function getDateFormatted(data){
        return data.results.map((pokemon, index) => {
            return (
                <div key={index}>
                    <Link to={`/choose/${pokemon.name}`}>{pokemon.name}</Link>
                </div>
            );
        });
    }

    function fetchPokemon(url="https://pokeapi.co/api/v2/pokemon") {
        console.log('fetchPokemon',url);
//https://pokeapi.co/api/v2/pokemon
        fetch(url)
        .then(response => response.json())
        .then(data =>{
            console.log(data,data.results);
             SetPokemonList(getDateFormatted(data))
            SetOption({next: data.next, previous: data.previous});
        });
    };

  return (
    <div>
      <h1>Pokedex</h1>
      {pokemonList}
      {option.previous && <button onClick={()=>{fetchPokemon(option.next)}}> Previous </button>}
     <button onClick={()=>{fetchPokemon(option.next)}} > Next </button>

    </div>
  );
}
