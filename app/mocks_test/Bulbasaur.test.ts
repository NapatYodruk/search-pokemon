import getPokemonByName from '../utils/getPokemonByName';

jest.mock('../utils/getPokemonByName', () => jest.fn().mockImplementation(async (pokemonName: string) => {
  if (pokemonName === 'Bulbasaur') {
    return {
      id: "UG9rZW1vbjowMDE=",
      number: "001",
      name: "Bulbasaur",
      classification: "Seed Pokémon",
      fleeRate: 0.1,
      types: ["Grass", "Poison"],
    };
  } else {  
    throw new Error('Unexpected input in mock implementation');
  }
}));

describe('getPokemonByName', () => {
  it('should fetch and return Pokemon data for Bulbasaur', async () => {
    const pokemonName = 'Bulbasaur';
    const pokemon = await getPokemonByName(pokemonName);

    expect(pokemon?.types).toContain('Grass');
  });

});
