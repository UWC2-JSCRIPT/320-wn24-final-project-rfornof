import { useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export function ChooseDetails(props) {
    const { pokemonId } = useParams();
    console.log('choose pokemon',pokemonId);
  
   const[ sprite, SetSprite] = useState([]); 
   const[ name, SetName] = useState([]);
    const[ abilities, SetAbilities] = useState([]);
    const[ species, SetSpecies] = useState([]);
    const[ moves, SetMoves] = useState([]);

     const formatAbilities = (data) => {
        let abilitiesArray = [];
        for(let ability of data){
            abilitiesArray.push(<div className="ability-item">{ability.ability.name}</div>);
        }
        const header = <h3>Abilities</h3>
        const divWrapper = <div className="ability-container">{abilitiesArray}</div>
        return [header, divWrapper];
      
      }
      // {
      //   "base_stat": 35,
      //   "effort": 0,
      //   "stat": {
      //       "name": "hp",
      //       "url": "https://pokeapi.co/api/v2/stat/1/"
      //   }


      const formatStats = (stats) => {
        let statArray = [];
        for(let stat of stats){
          console.log(stat.base_stat,stat.effort,stat.stat);
          //[stat.base_stat,stat.effort,
            statArray.push(<div className="stats-item">{stat.stat.name}: Base Stat: {
            stat.base_stat} , Effort: {stat.effort}<br/>
            </div>);
        }
        const header = <h3>Stats</h3>
        const divWrapper = <div className="stats-container">{statArray}</div>
        return [header, divWrapper];
      
      }
      const formatMoves = (data) => {
        let movesArray = [];
        for(let move of data){
            movesArray.push(<div>{move.move.name}</div>);
          
        }
        const header = <h3>Moves</h3>
        const divWrapper = <div className="moves">{movesArray}</div>
        return [header, divWrapper];
      }
    function fetchPokemon(pokemonId){
    
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => response.json())
        .then(data =>{
           
            SetSprite(<img src={data.sprites.front_default} alt={data.name} />);
            SetName(<h2>{data.name}</h2>)
            SetAbilities(formatAbilities(data.abilities));
            SetSpecies(formatStats(data.stats));
            SetMoves(formatMoves(data.moves));
        });
    }
    useEffect(() => {
        fetchPokemon(pokemonId);
    }
    , []);

  return (
    
    <div>
       <Link to={`/`}>Back to Pokedex</Link>
      {name}
      {sprite}
      {species}
      {abilities}
      
      {moves}
    
   
    </div>
  );
}  
