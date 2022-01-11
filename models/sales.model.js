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

module.exports = {
  createSales,
  getSales,
  getSalesById,
};
