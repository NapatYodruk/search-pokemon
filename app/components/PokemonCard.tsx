"use client";

import React, { useEffect, useState } from 'react';
import styles from '../styles/PokemonCard.module.css'; // Update the import path

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
        try {
          const response = await fetch('https://graphql-pokemon2.vercel.app', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: `
                query pokemon($name: String!){
                  pokemon(name: $name){
                    id
                    number
                    name
                    classification
                    fleeRate
                    types
                    resistant
                    weaknesses
                    maxCP
                    maxHP
                    image
                    weight{
                        minimum
                        maximum
                      }
                      height{
                        minimum
                        maximum
                      }
                    attacks{
                    fast{
                        name
                        type
                        damage
                    }
                    special{
                        name
                        type
                        damage
                    }
                    }
                    evolutions{
                        name
                        number
                        fleeRate
                        maxCP
                        maxHP
                        image
                    }
                  }
                }
              `,
              variables: {
                name: name,
              },
            }),
          });
    
          const result = await response.json();
    
          if (result.data && result.data.pokemon) {
            const pokemonDetails = result.data.pokemon;
            console.log("result :");
            console.log(pokemonDetails);
            onOpenPopup(pokemonDetails); // Pass handlePopupClose as a callback
          }
        } catch (error) {
          console.error('Error fetching data:', error);
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
