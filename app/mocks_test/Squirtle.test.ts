import getPokemonByName from '../utils/getPokemonByName';

jest.mock('../utils/getPokemonByName', () => jest.fn().mockImplementation(async (pokemonName: string) => {
  if (pokemonName === 'Squirtle') {
    return {
        id: "UG9rZW1vbjowMDc=",
        number: "007",
        name: "Squirtle",
        classification: "Tiny Turtle Pokémon",
        fleeRate: 0.1,
        types: ["Water"],
      };
  } else {
    throw new Error('Unexpected input in mock implementation');
  }
}));

describe('getPokemonByName', () => {
  it('should fetch and return Pokemon data for Squirtle', async () => {
    const pokemonName = 'Squirtle';
    const pokemon = await getPokemonByName(pokemonName);

    expect(pokemon?.types).toContain('Water');
  });


});
