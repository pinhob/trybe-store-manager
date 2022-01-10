const { createProductService } = require('../services/products.service');

const createProductController = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const newProduct = await createProductService(name, quantity);

    return res.status(201).json(newProduct);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createProductController,
};
