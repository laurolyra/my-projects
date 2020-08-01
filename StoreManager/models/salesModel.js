const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insertNewSales = async (salesData) =>
  connection()
    .then((db) => db.collection('sales').insertOne({ sales: salesData }))
    .then(({ insertedId }) => ({ id: insertedId, sales: salesData }));

const findSaleById = async (id) => {
  if (!ObjectId.isValid(id)) { return null; }
  const search = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
  if (!search) { return null; }
  const { _id, sales } = search;
  return { id: _id, sales };
};

const findSales = async () =>
  connection()
    .then((db) => db.collection('sales').find().toArray())
    .then((array) => array.map(({ _id, sales }) => ({ id: _id, sales })));

const showOneSale = async (id) => {
  const searchId = await findSaleById(id);
  if (searchId === null) {
    return null;
  }
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const product = await db.collection('sales').findOne({ _id: ObjectId(id) })
    .then(({ _id, sales }) => ({ id: _id, sales }));
  return product;
};

const deleteSale = async (id) => {
  const searchId = await findSaleById(id);
  if (searchId === null) {
    return null;
  }
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const sale = await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return sale;
};

const updateSale = async (id, salesData) =>
  connection()
    .then((db) => db.collection('sales')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { salesData } },
        { returnOriginal: false },
      ))
    .then(({ value: { _id } }) => ({ id: _id, sales: salesData }));

module.exports = { insertNewSales, findSales, showOneSale, deleteSale, updateSale, findSaleById };
