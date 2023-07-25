const { default: axios } = require('axios')
const { Pokemon, Type } = require('../db')

const pokemonByIdDB = async (id) => {
  const findPokemon = await Pokemon.findByPk(id, { include: { model: Type, attributes: ['name'], through: { attributes: [] } } })
  if (findPokemon) return findPokemon
}

const pokemonByIdAPI = async (id, url) => {
  const { data } = await axios(`${url}/pokemon/${id}`)
  const pokemon = {
    id: data.id,
    name: data.name,
    image: data.sprites.other['official-artwork'].front_default,
    hp: data.stats[0].stat.name === 'hp' && data.stats[0].base_stat,
    attack: data.stats[1].stat.name === 'attack' && data.stats[1].base_stat,
    defense: data.stats[2].stat.name === 'defense' && data.stats[2].base_stat,
    speed: data.stats[5].stat.name === 'speed' && data.stats[5].base_stat,
    height: data.height,
    weight: data.weight,
    types: data.types.map(el => { return { name: el.type.name } })

  }
  return pokemon
}

module.exports = { pokemonByIdDB, pokemonByIdAPI }