const { Pokemon } = require('../../db')

const deletePokemonController = async (req, res) => {
  try {
    const { id } = req.params
    await Pokemon.destroy({ where: { id } })
    return res.status(202).json({ message: `Pokemon id:${id} deleted successfully ` })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = deletePokemonController