import React from 'react';
import styles from '../styles/PokemonPopup.module.css'; 

interface PokemonPopupProps {
    onClose: () => void;
    pokemonDetails: any; 
  }

interface FastAttack {
name: string;
type: string;
damage: number;
}

interface SpecialAttack {
    name: string;
    type: string;
    damage: number;
}

interface Evolution {
    name: string;
    number: string;
    fleeRate: number;
    maxCP: number;
    maxHP: number;
    image: string;
  }
  
  
const PokemonPopup: React.FC<PokemonPopupProps> = ({ onClose, pokemonDetails }) => {
    return (
        <div className={styles.popup}>
            <button className={styles.closeButton} onClick={onClose}>
                Close
            </button>
            <div className={styles.popupContent}>
                <h2>{pokemonDetails.name}</h2>
                <div className={styles.contentContainer}>
                <img src={pokemonDetails.image} alt={pokemonDetails.name} className={styles.image} />
                    <table className={styles.table}>
                    <caption style={{ fontSize: '1.5em', fontWeight: 'bold', textAlign: 'left', marginBottom: '10px', marginLeft: '10px'}}>Pokemon details</caption>   
                    <tbody>
                        <tr>
                        <td>ID</td>
                        <td>{pokemonDetails.id}</td>
                        </tr>
                        <tr>
                        <td>Number</td>
                        <td>{pokemonDetails.number}</td>
                        </tr>
                        <tr>
                        <td>Name</td>
                        <td>{pokemonDetails.name}</td>
                        </tr>
                        <tr>
                        <td>Classification</td>
                        <td>{pokemonDetails.classification}</td>
                        </tr>
                        <tr>
                        <td>Flee Rate</td>
                        <td>{pokemonDetails.fleeRate}</td>
                        </tr>
                        <tr>
                        <td>Types</td>
                        <td>{pokemonDetails.types.join(', ')}</td>
                        </tr>
                        <tr>
                        <td>Resistant</td>
                        <td>{pokemonDetails.resistant.join(', ')}</td>
                        </tr>
                        <tr>
                        <td>Weaknesses</td>
                        <td>{pokemonDetails.weaknesses.join(', ')}</td>
                        </tr>
                        <tr>
                        <td>Max CP</td>
                        <td>{pokemonDetails.maxCP}</td>
                        </tr>
                        <tr>
                        <td>Max HP</td>
                        <td>{pokemonDetails.maxHP}</td>
                        </tr>
                        <tr>
                        <td>Weight</td>
                        <td>{pokemonDetails.weight.minimum} - {pokemonDetails.weight.maximum}</td>
                        </tr>
                        <tr>
                        <td>Height</td>
                        <td>{pokemonDetails.height.minimum} - {pokemonDetails.height.maximum}</td>
                        </tr>
                    </tbody>
                </table>
                </div>

                
                    <table className={styles.table}>
                    <caption style={{ fontSize: '1.5em', fontWeight: 'bold', textAlign: 'left', marginBottom: '10px', marginLeft: '10px'}}>Attack</caption>
                        <thead>
                        <tr>
                            <th style={{ width: '30%' }}>Attack Type</th>
                            <th style={{ width: '30%' }}>Name</th>
                            <th style={{ width: '20%' }}>Type</th>
                            <th style={{ width: '20%' }}>Damage</th>
                        </tr>
                        </thead>
                        <tbody>
                        {pokemonDetails.attacks.fast.map((attack: FastAttack) => (
                        <tr key={attack.name}>
                            <td style={{ width: '30%' }}>Fast</td>
                            <td style={{ width: '30%' }}>{attack.name}</td>
                            <td style={{ width: '20%' }}>{attack.type}</td>
                            <td style={{ width: '20%' }}>{attack.damage}</td>
                        </tr>
                        ))}

                        {pokemonDetails.attacks.special.map((specialAttack: SpecialAttack) => (
                            <tr key={specialAttack.name}>
                                <td style={{ width: '30%' }}>Special</td>
                                <td style={{ width: '30%' }}>{specialAttack.name}</td>
                                <td style={{ width: '20%' }}>{specialAttack.type}</td>
                                <td style={{ width: '20%' }}>{specialAttack.damage}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>

            
                    {pokemonDetails.evolutions && pokemonDetails.evolutions.length > 0 && (
                    <table className={styles.table}>
                        <caption style={{ fontSize: '1.5em', fontWeight: 'bold', textAlign: 'left', marginBottom: '10px', marginLeft: '10px'}}>Evolutions</caption>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Number</th>
                            <th>Flee Rate</th>
                            <th>Max CP</th>
                            <th>Max HP</th>
                            <th>Image</th>
                        </tr>
                        </thead>
                        <tbody>
                        {pokemonDetails.evolutions.map((evolution: Evolution) => (
                            <tr key={evolution.name}>
                            <td>{evolution.name}</td>
                            <td>{evolution.number}</td>
                            <td>{evolution.fleeRate}</td>
                            <td>{evolution.maxCP}</td>
                            <td>{evolution.maxHP}</td>
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                <img
                                src={evolution.image}
                                alt={evolution.name}
                                style={{  display: 'block', margin: '0 auto', height: 'auto', width: '50%' }}  // Adjust the width and height as needed
                                />
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    )}
                    

            </div>
        </div>
    );
  };
  
  export default PokemonPopup;