
import React, { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';
import styles from '../styles/Home.module.css'; 
import getPokemons from '../utils/getPokemons';
//up

interface PokemonListQueryProps {
    onOpenPopup: (pokemonDetails: any) => void;
    onFetchNames: (names: string[]) => void;
    filteredPokemons: string[]; 
  }
  const PokemonListQuery: React.FC<PokemonListQueryProps> = ({ 
    onOpenPopup, 
    onFetchNames,
    filteredPokemons, }) => {
    const [pokemons, setPokemons] = useState([]);
    const [pokemonsfilter, setpokemonsfilter] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await getPokemons();
            setPokemons(result);
            const names = result.map((pokemon: any) => pokemon.name);
            onFetchNames(names);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);


    useEffect(() => {
        const filtered = pokemons.filter((pokemon: any) =>
        filteredPokemons.includes(pokemon.name)
        );
        setpokemonsfilter(filtered);
    }, [filteredPokemons, pokemons]);

    return (
        <div className={styles.pokemoncontainer}>
            {filteredPokemons.length === 0? 
            pokemons.map((pokemon: any) => (
            <PokemonCard
                key={pokemon.id}
                name={pokemon.name}
                classification={pokemon.classification}
                maxHP={pokemon.maxHP}
                maxCP={pokemon.maxCP}
                imageUrl={pokemon.image}
                attacks={pokemon.attacks}
                evolutions={pokemon.evolutions}
                onOpenPopup={onOpenPopup}
            />
          ))
        : pokemonsfilter.map((pokemon: any) => (
            <PokemonCard
                key={pokemon.id}
                name={pokemon.name}
                classification={pokemon.classification}
                maxHP={pokemon.maxHP}
                maxCP={pokemon.maxCP}
                imageUrl={pokemon.image}
                attacks={pokemon.attacks}
                evolutions={pokemon.evolutions}
                onOpenPopup={onOpenPopup}
            />
            ))}
        </div>
    );
};

export default PokemonListQuery;