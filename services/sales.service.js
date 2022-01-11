const Joi = require('@hapi/joi');
const { createSales } = require('../models/sales.model');
const errorConstructor = require('../utils/errorHandling');

const salesSchema = Joi.object({
  quantity: Joi.number().min(1).required(),
});

const createSalesService = async (salesArray) => {
  const allSalesAreValid = salesArray
    .forEach(({ quantity }) => {
      const { error } = salesSchema.validate({ quantity });

      if (error) throw errorConstructor(422, 'Wrong product ID or invalid quantity');
    });

  console.log(allSalesAreValid);

  const modelResult = await createSales(salesArray);

  return { ...modelResult };
};

module.exports = {
  createSalesService,
};
