const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');

const insertSales = async (saleData) => {
  const arrayId = saleData.map(({ productId }) => productId);
  const idFound = await productModel.checkSalesAndId(arrayId);
  if (!idFound || saleData.length !== idFound.length) { return 404; }
  return salesModel.insertNewSales(saleData);
};

const listSales = async () => salesModel.findSales();

const showOneSale = async (id) => {
  const showFromModel = await salesModel.showOneSale(id);
  if (showFromModel === null) { return 404; }
  return showFromModel;
};

const deleteSale = async (id) => {
  const deleteFromModel = await salesModel.deleteSale(id);
  if (deleteFromModel === null) { return 404; }
};

const updateSale = async (id, salesData) => {
  const idExists = await salesModel.findSaleById(id);
  if (!idExists) { return 404; }
  return salesModel.updateSale(id, salesData);
};

module.exports = {
  insertSales,
  listSales,
  showOneSale,
  deleteSale,
  updateSale,
};
