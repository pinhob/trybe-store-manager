const Joi = require('@hapi/joi');
const { createProduct,
  findProductByName,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById } = require('../models/products.model');
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

const updateProductByIdService = async (id, name, quantity) => {
  const { error } = productSchema.validate({ name, quantity });
  const product = await updateProductById(id, name, quantity);

  if (error) throw errorConstructor(422, error.message);

  return { ...product };
};

const deleteProductByIdService = async (id) => {
  const idLength = id.length === 24;

  if (!idLength) throw errorConstructor(422, 'Wrong id format');

  const deletedProduct = await deleteProductById(id);

  console.log('Deleted', deletedProduct);
  
  if (!deletedProduct) throw errorConstructor(422, 'Wrong id format');

  return deletedProduct;
};

module.exports = {
  createProductService,
  getProductByIdService,
  getAllProductsService,
  updateProductByIdService,
  deleteProductByIdService,
};
