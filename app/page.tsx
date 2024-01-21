"use client";
import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import styles from './styles/Home.module.css'; 
import PokemonListQuery from './components/PokemonListQuery';
import PokemonPopup from './components/PokemonPopup';

const HomePage: NextPage = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [notFoundState, setNotFoundState] = useState(false);
  const [filteredPokemons, setFilteredPokemons] = useState<string[]>([]);
  const [allPokemonName, setallPokemonName] = useState<string[]>([]);

  const handleOpenPopup = (pokemonDetails: any) => {
    setSelectedPokemon(pokemonDetails);
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setSelectedPokemon(null);
    setIsPopupVisible(false);
  };

  const handleFetchNames = (names: string[]) => {
    setallPokemonName(names);
  };

  const handleSearch = () => {
    const filtered = allPokemonName.filter((name) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if(filtered.length==0 && searchTerm.length>0){
      setFilteredPokemons(['None']);
      setNotFoundState(true);
    }
    else{
      setFilteredPokemons(filtered);
      setNotFoundState(false);
    }

    // console.log(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  return (
    <div>

      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.header}>Search Pokemon</div>
        <div className={styles.searchBox}>
          {notFoundState && <span className={styles.notFoundText}>Not found pokemon!!!</span>}
          <input
            type="text"
            placeholder="type name to search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      
        {isPopupVisible && (
          <PokemonPopup onClose={handleClosePopup} pokemonDetails={selectedPokemon} />
        )}
      </div>

      {/* Main content */}
      <div className={styles.mainContent}>
        <div className={styles.pokemoncontainer}>
          <PokemonListQuery 
            onOpenPopup={handleOpenPopup} 
            onFetchNames={handleFetchNames}
            filteredPokemons={filteredPokemons}/>
        </div>
      </div>

      
    </div>
  );
};

export default HomePage;