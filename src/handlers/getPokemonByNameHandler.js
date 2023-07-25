const axios = require('axios')
const { Pokemon, Type } = require('../db')
const { Op } = require('sequelize')

// get pokemon by name from DB
const pokemonByNameDB = async (name) => {
  const pokemonDB = await Pokemon.findAll({ where: { name: name }, include: { model: Type, attributes: ['name'], through: { attributes: [] } } })
  if (pokemonDB.length) return pokemonDB
}

// get pokemon by name from API
const pokemonByNameAPI = async (name, api) => {
  const { data } = await axios(`${api}/pokemon/${name}`)
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


module.exports = { pokemonByNameAPI, pokemonByNameDB }