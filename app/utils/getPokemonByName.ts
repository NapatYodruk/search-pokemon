const getPokemonByName = async (name: string) => {
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
        return result.data.pokemon;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };
  
  export default getPokemonByName;
  