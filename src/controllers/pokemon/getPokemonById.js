const { pokemonByIdAPI, pokemonByIdDB } = require('../../handlers/getPokemonByIdHandler')

const pokeApi = 'https://pokeapi.co/api/v2'

const getPokemonByIdController = async (req, res) => {
  try {
    let pokemon;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const isUUID = uuidRegex.test(req.params.id)

    if (!isUUID) {
      pokemon = await pokemonByIdAPI(req.params.id, pokeApi)
    } else {
      pokemon = await pokemonByIdDB(req.params.id)
    }

    if (pokemon) return res.status(200).json(pokemon)
    return res.status(404).json({ message: 'pokemon not found' })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = getPokemonByIdController