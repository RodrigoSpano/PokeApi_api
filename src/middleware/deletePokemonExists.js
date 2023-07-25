const { Pokemon } = require('../db')


const deletePokemonMiddlewate = async (req, res, next) => {
  const { id } = req.params
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const isUUID = uuidRegex.test(req.params.id)
  if (!isUUID) return res.status(400).json({ message: 'invalid id' })
  const pokeExists = await Pokemon.findByPk(id)
  if (!pokeExists) return res.status(404).json({ message: 'pokemon not found' })
  next()
}

module.exports = deletePokemonMiddlewate