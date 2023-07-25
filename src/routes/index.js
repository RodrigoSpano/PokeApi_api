const { Router } = require('express');
const pokemonsRoutes = require('./subRoutes/pokemons.routes')
const getTypes = require('../controllers/types/getTypes')

const router = Router();

router.use('/pokemons', pokemonsRoutes)
router.get('/types', getTypes)


module.exports = router;
