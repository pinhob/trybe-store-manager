const { ObjectId } = require('mongodb');
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

const getProducts = async () => {
  const conn = await connect();

  const allProducts = await conn.collection('products').find({}).toArray();

  console.log('ALL PRODUCTS \n', allProducts);

  return allProducts;
};

const getProductById = async (id) => {
  const conn = await connect();

  const product = await conn.collection('products').findOne(new ObjectId(id));

  if (!product) return false;

  return product;
};

module.exports = {
  createProduct,
  findProductByName,
  getProducts,
  getProductById,
};
