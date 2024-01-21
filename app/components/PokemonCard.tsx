"use client";

import React, { useEffect, useState } from 'react';
import styles from '../styles/PokemonCard.module.css';
import getPokemonByName from '../utils/getPokemonByName';

interface PokemonCardProps {
    name: string;
    classification: string;
    imageUrl: string;
    maxCP: string,
    maxHP: string,
    attacks: {
      fast: { name: string }[];
      special: { name: string }[];
    };
    evolutions: { name: string; image: string }[];
    onOpenPopup: (pokemonDetails: any) => void;
  }

const PokemonCard: React.FC<PokemonCardProps> = ({
    name,
    classification,
    imageUrl,
    maxCP,
    maxHP,
    attacks,
    evolutions,
    onOpenPopup,
}) => {

  const handleClick = async () => {
    const pokemonDetails = await getPokemonByName(name);

    if (pokemonDetails) {
      console.log('result:');
      console.log(pokemonDetails);
      onOpenPopup(pokemonDetails);
    }
  };


      return (
        <div className={styles.pokemonCard} onClick={handleClick}>
          <div className={styles.imageContainer} style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}/>
          <div className={styles.infoContainer}>
            <h2 className={styles.header}>{name}</h2>
            <p>classification : {classification}</p>
            <p>maxCP : {maxCP}</p>
            <p>maxHP : {maxHP}</p>
            <p>Fast Attacks : {attacks.fast.length}</p>
            <p>Special Attacks : {attacks.special.length}</p>
            <ul>
                {evolutions ? (
                  <p>Evolutions : {evolutions.length}</p>
                ) : (
                <p>Evolutions : 0</p>
                )}
            </ul>
          </div>
        </div>
      );
    };

export default PokemonCard;
