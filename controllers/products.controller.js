const { createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductByIdService,
  deleteProductByIdService } = require('../services/products.service');

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

const updateProductByIdServiceController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    
    const product = await updateProductByIdService(id, name, quantity);

    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

const deleteProductByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedProduct = await deleteProductByIdService(id);

    return res.status(200).json(deletedProduct);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createProductController,
  getProductByIdController,
  getAllProductsController,
  updateProductByIdServiceController,
  deleteProductByIdController,
};
