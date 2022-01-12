const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createSales = async (salesArray) => {
  const conn = await connect();

  const result = await conn.collection('sales').insertOne({ itensSold: salesArray });

  const itensSoldObj = result.ops[0];

  return itensSoldObj;
};

const getSales = async () => {
  const conn = await connect();

  const allSales = await conn.collection('sales').find({}).toArray();

  return { sales: allSales };
};

const getSalesById = async (id) => {
  const conn = await connect();

  const sales = await conn.collection('sales').findOne(new ObjectId(id));

  if (!sales) return false; 

  return sales;
};

const updateSalesById = async (id, salesObjReq) => {
  const conn = await connect();

  const salesId = new ObjectId(id);

  const updateValues = { $set: { itensSold: salesObjReq } };

  const updateSales = await conn.collection('sales').updateOne({ _id: salesId }, updateValues);

  if (!updateSales) return false;

  const sales = await getSalesById(id);

  return sales;
};

const deleteSalesById = async (id) => {
  const conn = await connect();

  const salesId = { _id: new ObjectId(id) };

  const salesInfos = await getSalesById(id);

  const deleteSales = await conn.collection('sales').deleteOne(salesId);

  if (!deleteSales) return false; 

  return salesInfos;
};

module.exports = {
  createSales,
  getSales,
  getSalesById,
  updateSalesById,
  deleteSalesById,
};
