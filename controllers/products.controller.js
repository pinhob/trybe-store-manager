const { createProductService } = require('../services/products.service');

const createProductController = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    console.log(name, quantity);

    const newProduct = await createProductService(name, quantity);

    console.log(newProduct);

    return res.status(200).json(newProduct);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createProductController,
};
