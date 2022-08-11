const Price = require('./price.model');
const { setError } = require('../../helpers/utils');

const getAll = async (req, res, next) => {
  try {
    const prices = await Price.find().populate("courses");
    return res.json({
      status: 200,
      message: 'Recovered all prices',
      data: { prices }
    });
  } catch (error) {
    return next(setError(500, 'Failed all prices'));
  }
}

const create = async (req, res, next) => {
  try {
    const PriceToSave = new Price(req.body)
    const priceInDb = await PriceToSave.save()
    return res.json({
      status: 201,
      message: 'Created new price',
      data: { priceInDb }
    });
  } catch (error) {
    return next(setError(500, 'Failed created price'))
  }
}


module.exports = { getAll, create }