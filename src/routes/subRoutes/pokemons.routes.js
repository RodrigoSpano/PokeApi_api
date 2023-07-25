const { Router } = require('express');
const getPokemons = require('../../controllers/pokemon/getPokemons');
const getPokemonByIdController = require('../../controllers/pokemon/getPokemonById');
const postPokemon = require('../../controllers/pokemon/postPokemon');
const validatePokemonMiddleware = require('../../middleware/validatePokemon');
const deletePokemonMiddlewate = require('../../middleware/deletePokemonExists');
const deletePokemonController = require('../../controllers/pokemon/deletePokemonDB');
const updatePokemonController = require('../../controllers/pokemon/updatePokemonDB');
const updateMiddleware = require('../../middleware/validateUpdate');

const router = Router();

router.get('/', getPokemons)
router.get('/:id', getPokemonByIdController)
router.post('/', validatePokemonMiddleware, postPokemon)
router.delete('/:id', deletePokemonMiddlewate, deletePokemonController)
router.put('/update/:id', updateMiddleware, updatePokemonController)

module.exports = router