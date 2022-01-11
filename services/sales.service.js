const Joi = require('@hapi/joi');
const { createSales,
  getSales,
  getSalesById } = require('../models/sales.model');
const errorConstructor = require('../utils/errorHandling');

const salesSchema = Joi.object({
  quantity: Joi.number().min(1).required(),
});

const createSalesService = async (salesArray) => {
  salesArray.forEach(({ quantity }) => {
      const { error } = salesSchema.validate({ quantity });

      if (error) throw errorConstructor(422, 'Wrong product ID or invalid quantity');
    });

  const itensSold = await createSales(salesArray);

  return { ...itensSold };
};

const getSalesService = async () => {
  const sales = await getSales();

  if (!sales) throw errorConstructor(404, 'Sale not found');

  return { ...sales };
};

const getSalesByIdService = async (id) => {
  const idLength = id.length === 24;

  if (!idLength) throw errorConstructor(404, 'Sale not found');

  const sales = await getSalesById(id);

  if (!sales) throw errorConstructor(404, 'Sale not found');

  return { ...sales };
};

module.exports = {
  createSalesService,
  getSalesService,
  getSalesByIdService,
};
