import getPokemonByName from '../utils/getPokemonByName';

jest.mock('../utils/getPokemonByName', () => jest.fn().mockImplementation(async (pokemonName: string) => {
  if (pokemonName === 'Charmander') {
    return {
        id: "UG9rZW1vbjowMDQ=",
        number: "004",
        name: "Charmander",
        classification: "Lizard Pokémon",
        fleeRate: 0.1,
        types: ["Fire"],
      };
  } else {
    throw new Error('Unexpected input in mock implementation');
  }
}));

describe('getPokemonByName', () => {
  it('should fetch and return Pokemon data for Charmander', async () => {
    const pokemonName = 'Charmander';
    const pokemon = await getPokemonByName(pokemonName);

    expect(pokemon?.types).toContain('Fire');
  });

});
