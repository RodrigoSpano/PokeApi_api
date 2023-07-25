const { Pokemon } = require('../../db')

const updatePokemonController = async (req, res) => {
  try {
    const { id } = req.params
    const poke = await Pokemon.update({ ...req.body }, {
      returning: true,
      where: {
        id: id
      }
    })
    return res.status(202).json({ message: `${poke[1][0].name} was successfully updated` })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = updatePokemonController