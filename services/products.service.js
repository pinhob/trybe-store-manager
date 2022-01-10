const Joi = require('@hapi/joi');
const { createProduct,
  findProductByName,
  getProducts,
  getProductById } = require('../models/products.model');
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

const getAllProductsService = async () => {
  const products = await getProducts();

  return { products };
};

const getProductByIdService = async (id) => {
  const idLength = id.length === 24;

  if (!idLength) throw errorConstructor(422, 'Wrong id format');

  const product = await getProductById(id);
  
  if (!product) throw errorConstructor(422, 'Wrong id format');

  return { ...product };
};

module.exports = {
  createProductService,
  getProductByIdService,
  getAllProductsService,
};
