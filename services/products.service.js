const Joi = require('@hapi/joi');
const { createProduct, findProductByName } = require('../models/products.model');
const errorConstructor = require('../utils/errorHandling');

const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required(),
});

const createProductService = async (name, quantity) => {
  const { error } = productSchema.validate({ name, quantity });
  const productNameExists = await findProductByName(name);

  if (error) throw errorConstructor(422, error.message);
  if (productNameExists) throw errorConstructor(422, 'Product already exists');

  const { _id } = await createProduct(name, quantity);

  return { _id, name, quantity };
};

module.exports = {
  createProductService,
};
