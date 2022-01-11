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

  return allProducts;
};

const getProductById = async (id) => {
  const conn = await connect();

  const product = await conn.collection('products').findOne(new ObjectId(id));

  if (!product) return false;

  return product;
};

const updateProductById = async (id, name, quantity) => {
  const conn = await connect();

  const productId = { _id: new ObjectId(id) };

  const updateValues = { $set: { name, quantity } };

  const product = await conn.collection('products').updateOne(productId, updateValues);

  if (!product) return false;

  const productObj = await getProductById(id);

  return productObj;
};

const deleteProductById = async (id) => {
  const conn = await connect();

  const productId = { _id: new ObjectId(id) };
  const productObj = await getProductById(id);
  const deleteProduct = await conn.collection('products').deleteOne(productId);

  if (!deleteProduct) return false;

  return productObj;
};

module.exports = {
  createProduct,
  findProductByName,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
