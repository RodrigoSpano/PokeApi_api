const { Pokemon, Type } = require('../../db')

const postPokemon = async (req, res) => {
  try {
    const { name, hp, attack, defense, speed, height, weight, image, types } = req.body
    const findPokemon = await Pokemon.findOne({ where: { name: name.toLowerCase() } })
    if (findPokemon) return res.status(302).json({ message: 'this pokemon already exists' })
    const pokemonObj = { name: name.toLowerCase(), hp, attack, defense, speed, height, weight, image }
    const newPokemon = await Pokemon.create(pokemonObj)
    await newPokemon.addTypes(types) //tiene q ser el id del type 
    const pokemonCreated = await Pokemon.findOne({ where: { name: newPokemon.name }, include: { model: Type, attributes: ['name'], through: { attributes: [] } } })
    return res.status(201).json(pokemonCreated)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = postPokemon