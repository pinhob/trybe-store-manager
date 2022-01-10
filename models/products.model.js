const connect = require('./connection');

const createProduct = async (name, quantity) => {
  const conn = await connect();

  const { insertedId } = conn.collection('products').insertOne({
    name, quantity,
  });

  return { insertedId };
};

module.export = {
  createProduct,
};
