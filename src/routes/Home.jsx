import {Link, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { fireAuth as auth,logout,isLoggedIn } from '../services/firebase/firebase';
//'../../services/firebase/firebase.js';


export function Home() {
    const [pokemonList, SetPokemonList] = useState([]);
    const [option, SetOption] = useState({next: '', previous: ''});
    const navigate = useNavigate();
    function loggedIn(){
    onAuthStateChanged(auth, user => {
        if (user) {
            console.log(
                'logged in!!!!'
            )
            return true
        }
        else {
            console.log(
                'not logged in!!!!'
            )
            navigate('/login')
           return false
        } })
    }
    loggedIn();
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
        <button onClick={()=>{logout()}}>Logout</button>
      {pokemonList}
      {option.previous && <button onClick={()=>{fetchPokemon(option.next)}}> Previous </button>}
     <button onClick={()=>{fetchPokemon(option.next)}} > Next </button>

    </div>
  );
}
