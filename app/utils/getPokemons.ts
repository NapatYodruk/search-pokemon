const getPokemons = async () => {
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
        return result.data.pokemons;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  
  export default getPokemons;
  