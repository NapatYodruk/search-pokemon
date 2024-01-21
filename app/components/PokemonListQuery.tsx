
import React, { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';
import styles from '../styles/Home.module.css'; 

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
                const response = await fetch('https://graphql-pokemon2.vercel.app', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
                        query pokemons($first: Int!){
                            pokemons(first: $first){
                                id
                                number
                                name
                                classification
                                fleeRate
                                maxCP
                                maxHP
                                image
                                attacks{
                                    fast{
                                      name
                                    }
                                    special{
                                      name
                                    }
                                  }
                                  evolutions{
                                    name
                                  }
                            }
                        }
                        `,
                        variables: {
                            first: 500,
                        },
                    }),
                });
    
                const result = await response.json();
    
                if (result.data && result.data.pokemons) {
                    setPokemons(result.data.pokemons);
                    const names = result.data.pokemons.map((pokemon: any) => pokemon.name);
                    onFetchNames(names);
                }
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