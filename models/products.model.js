const connect = require('./connection');

const createProduct = async (name, quantity) => {
  const conn = await connect();

  const { insertedId } = await conn.collection('products').insertOne({
    name, quantity,
  });

  return { _id: insertedId };
};

const findProductByName = async (name) => {
  const conn = await connect();

  const product = await conn.collection('products').findOne({ name });

  return product;
};

module.exports = {
  createProduct,
  findProductByName,
};
