const { getAllPokemons } = require('../../handlers/getPokemonsHandler')
const { pokemonByNameAPI, pokemonByNameDB } = require('../../handlers/getPokemonByNameHandler')

const pokeApi = 'https://pokeapi.co/api/v2'

const getPokemons = async (req, res) => {
  const { name } = req.query
  try {
    if (!name) {
      const allPokemons = await getAllPokemons(pokeApi)
      return res.status(200).json(allPokemons)
    } else {
      let pokemon;
      pokemon = await pokemonByNameDB(name.toLowerCase())
      if (!pokemon) {
        pokemon = await pokemonByNameAPI(name.toLowerCase(), pokeApi)
      }
      if (!pokemon) return res.status(404).json('not found')
      return res.status(200).json(pokemon)
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = getPokemons