const { createProductService,
  getAllProductsService,
  getProductByIdService } = require('../services/products.service');

const createProductController = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const newProduct = await createProductService(name, quantity);

    return res.status(201).json(newProduct);
  } catch (error) {
    return next(error);
  }
};

const getAllProductsController = async (req, res, next) => {
  try {
    const products = await getAllProductsService();

    // console.log('products', products);
    return res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
};

const getProductByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const productById = await getProductByIdService(id);

    return res.status(200).json(productById);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createProductController,
  getProductByIdController,
  getAllProductsController,
};
