const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createProduct = async ({ name, quantity }) =>
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(({ insertedId }) => ({ id: insertedId, name, quantity }));

const findProductByName = async (name, id = null) =>
  connection().then((db) => db.collection('products')
    .findOne({ name, _id: { $ne: ObjectId(id) } }));

const findProductById = async (id) => {
  if (!ObjectId.isValid(id)) { return null; }
  return connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));
};

const findProducts = async () =>
  connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) => products.map(({ _id, name, quantity }) => ({ id: _id, name, quantity })));

const showOneProduct = async (id) => {
  const searchId = await findProductById(id);
  if (searchId === null) {
    return null;
  }
  const { _id, name, quantity } = searchId;
  return { id: _id, name, quantity };
};

const deleteProduct = async (id) => {
  const searchId = await findProductById(id);
  if (searchId === null) {
    return null;
  }
  await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
  return { ok: true };
};

const updateProduct = async ({ name, quantity, id }) =>
  connection()
    .then((db) => db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));

const checkSalesAndId = async (productsIds) => {
  const validArray = productsIds.filter(ObjectId.isValid).map(ObjectId);
  if (!validArray.length) return [];
  return connection()
    .then((db) => db.collection('products').find({ _id: { $in: validArray } }).toArray());
};

module.exports = {
  createProduct,
  findProductByName,
  findProductById,
  findProducts,
  showOneProduct,
  deleteProduct,
  updateProduct,
  checkSalesAndId,
};
