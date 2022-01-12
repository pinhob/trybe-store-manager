const { createSalesService,
  getSalesService,
  getSalesByIdService,
  updateSalesByIdService,
  deleteSalesByIdService } = require('../services/sales.service');

const createSalesController = async (req, res, next) => {
  try {
    const salesArray = req.body;

    const itensSold = await createSalesService(salesArray);

    return res.status(200).json(itensSold);
  } catch (error) {
    return next(error);
  }
};

const getSalesController = async (_req, res, next) => {
  try {
    const sales = await getSalesService();

    return res.status(200).json(sales);
  } catch (error) {
    return next(error);
  }
};

const getSalesByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const sales = await getSalesByIdService(id);

    return res.status(200).json(sales);
  } catch (error) {
    return next(error);
  }
};

const updateSalesByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const salesObjReq = req.body;

    const updatedSales = await updateSalesByIdService(id, salesObjReq);

    return res.status(200).json(updatedSales);
  } catch (error) {
    return next(error);
  }
};

const deleteSalesByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteSales = await deleteSalesByIdService(id);

    return res.status(200).json(deleteSales); 
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createSalesController,
  getSalesController,
  getSalesByIdController,
  updateSalesByIdController,
  deleteSalesByIdController,
};