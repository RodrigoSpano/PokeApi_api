const { default: axios } = require('axios')
const { Pokemon } = require('../db')

const pokeApi = 'https://pokeapi.co/api/v2'

const updateMiddleware = async (req, res, next) => {
  const { name } = req.body
  const { id } = req.params
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const isUUID = uuidRegex.test(req.params.id)
  if (!isUUID) return res.status(400).json({ message: 'invalid id' })
  const pokeExists = await Pokemon.findByPk(id)
  if (!pokeExists) return res.status(404).json({ message: 'pokemon not found' })
  const { data } = await axios(`${pokeApi}/pokemon/?limit=48`)
  const findName = data.results.some(el => el.name.toLowerCase() === name.toLowerCase())
  if (findName) return res.status(400).json({ error: 'name already taken' })
  return next()
}

module.exports = updateMiddleware