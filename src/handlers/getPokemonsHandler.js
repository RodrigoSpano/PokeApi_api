const e = require('express');
const { Pokemon, Type } = require('../db')
const axios = require('axios')

const getEachPokemonData = async (pokemons) => {
  try {
    const pokemonPromises = pokemons.map(async (poke) => {
      const { data } = await axios(poke.url);
      return {
        id: data.id,
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default,
        hp: data.stats.find(stat => stat.stat.name === 'hp')?.base_stat,
        attack: data.stats.find(stat => stat.stat.name === 'attack')?.base_stat,
        defense: data.stats.find(stat => stat.stat.name === 'defense')?.base_stat,
        speed: data.stats.find(stat => stat.stat.name === 'speed')?.base_stat,
        height: data.height,
        weight: data.weight,
        types: data.types.map(el => { return { name: el.type.name } }),
      };
    });
    return Promise.all(pokemonPromises);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getApiPokemons = async (URI) => {
  try {
    const { data } = await axios(`${URI}/pokemon/?limit=48`)
    const pokemons = await getEachPokemonData(data.results)
    if (pokemons) return pokemons
  } catch (error) {
    throw Error(error.message)
  }
}

const getDbPokemons = async () => {
  try {
    return await Pokemon.findAll({ include: { model: Type, attributes: ['name'], through: { attributes: [] } } })
  } catch (error) {
    throw Error(error.message)
  }
}

const getAllPokemons = async (URI) => {
  try {
    // pokemons from api
    const pokemonsApi = await getApiPokemons(URI)
    //pokemons from DB
    const pokemonsDb = await getDbPokemons()
    return [...pokemonsDb, ...pokemonsApi]
  } catch (error) {
    throw Error(error)
  }
}


module.exports = { getAllPokemons }