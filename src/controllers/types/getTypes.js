const { Type } = require('../../db')
const axios = require('axios')

const URI = 'https://pokeapi.co/api/v2'

const getTypes = async (req, res) => {
  try {
    const findType = await Type.findAll()
    if (findType.length) return res.status(200).json(findType)
    const { data } = await axios(`${URI}/type`)
    let types = data.results
    for (let type of types) {
      const typeData = await axios(type.url)
      delete type.url
      type.id = typeData.data.id
    }
    const typeDb = await Type.bulkCreate(types)
    return res.status(200).json(typeDb)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = getTypes