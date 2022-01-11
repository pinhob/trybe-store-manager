const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createSales = async (salesArray) => {
  const conn = await connect();

  const result = await conn.collection('sales').insertOne({ itensSold: salesArray });

  const itensSoldObj = result.ops[0];

  return itensSoldObj;
};

module.exports = {
  createSales,
};
