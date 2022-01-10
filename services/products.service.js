const Joi = require('@hapi/joi');
const { createProduct } = require('../models/products.model');
const errorConstructor = require('../utils/errorHandling');

const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required(),
});

const createProductService = async (name, quantity) => {
  // const validate = productSchema.validate(name, quantity);

  console.log('xablau');
  console.log('validate:', validate);

  // if (validate.error) throw errorConstructor(422, validate.error.message);

  const newProductId = await createProduct(name, quantity);

  console.log('id', newProductId);

  return { newProductId, name, quantity };
};

module.export = {
  createProductService,
};
