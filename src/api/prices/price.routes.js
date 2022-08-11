const PriceRoutes = require('express').Router();
const { getAll, create } = require('./price.controller');

PriceRoutes.get('/', getAll)
PriceRoutes.post('/', create)



module.exports = PriceRoutes;