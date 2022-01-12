const Joi = require('@hapi/joi');
const { createSales,
  getSales,
  getSalesById,
  updateSalesById,
  deleteSalesById } = require('../models/sales.model');
const errorConstructor = require('../utils/errorHandling');

const salesSchema = Joi.object({
  productId: Joi.string().length(24).required(),
  quantity: Joi.number().min(1).required(),
});

const validateSalesWithJoi = (salesArray) => {
  salesArray.forEach(({ productId, quantity }) => {
    const { error } = salesSchema.validate({ productId, quantity });

    if (error) throw errorConstructor(422, 'Wrong product ID or invalid quantity');
  });
};

const createSalesService = async (salesArray) => {
  validateSalesWithJoi(salesArray);

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

const updateSalesByIdService = async (id, salesArr) => {
  validateSalesWithJoi(salesArr);
  
  const updatedSales = await updateSalesById(id, salesArr);
  
  return { ...updatedSales };
};

const deleteSalesByIdService = async (id) => {
  const idLength = id.length === 24;

  if (!idLength) throw errorConstructor(422, 'Wrong sale ID format');

  const deletedSales = await deleteSalesById(id);

  if (!deletedSales) throw errorConstructor(422, 'Wrong sale ID format');
  
  return deletedSales;
};

module.exports = {
  createSalesService,
  getSalesService,
  getSalesByIdService,
  updateSalesByIdService,
  deleteSalesByIdService,
};
