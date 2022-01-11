const { createSalesService } = require('../services/sales.service');

const createSalesController = async (req, res, next) => {
  try {
    const salesArray = req.body;

    const itensSold = await createSalesService(salesArray);

    return res.status(200).json(itensSold);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createSalesController,
};