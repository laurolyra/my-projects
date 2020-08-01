const productModel = require('../models/productModel');

const existsCheck = async (name, id = null) => {
  const modelCall = await productModel.findProductByName(name, id);
  if (modelCall !== null) { return true; }
  return false;
};

const createProduct = async (name, quantity) => {
  if (!existsCheck(name)) { return 409; }
  const createProductModel = await productModel.createProduct({ name, quantity });
  return createProductModel;
};

const updateProduct = async (name, quantity, id) => {
  const idExists = await productModel.findProductById(id);
  if (!idExists) { return 404; }
  if (!existsCheck(name, id)) { return 409; }
  const updateProductModel = await productModel.updateProduct({ name, quantity, id });
  return updateProductModel;
};

const listProduct = async () => productModel.findProducts();

const showOneProduct = async (id) => {
  const showFromModel = await productModel.showOneProduct(id);
  if (showFromModel === null) { return 404; }
  return showFromModel;
};

const deleteProduct = async (id) => {
  const deleteFromModel = await productModel.deleteProduct(id);
  if (deleteFromModel === null) { return 404; }
  return deleteFromModel;
};

module.exports = {
  createProduct,
  listProduct,
  showOneProduct,
  deleteProduct,
  updateProduct,
};
