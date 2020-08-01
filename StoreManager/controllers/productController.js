const express = require('express');
const rescue = require('express-rescue');
const productService = require('../services/productService');
const { notFound, badData, exists } = require('../middlewares/error');

const router = express.Router();

const checkIntegrity = (name, quantity) => {
  if (typeof name !== 'string' || name.length <= 5 || typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity <= 0) {
    return false;
  }
  return true;
};

router.get('/', rescue(async (_req, res) => {
  const products = await productService.listProduct();
  return res.status(200).json(products);
}));

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const singleProduct = await productService.showOneProduct(id);
  if (singleProduct === 404) { throw notFound; }
  return res.status(200).json(singleProduct);
}));

router.delete('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await productService.deleteProduct(id);
  if (deleteProduct === 404) { throw notFound; }
  return res.status(204).json();
}));

router.put('/:id', rescue(async (req, res, _next) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  if (!checkIntegrity(name, quantity)) { throw badData; }
  const updateProduct = await productService.updateProduct(name, quantity, id);
  if (updateProduct === 404) { throw notFound; }
  if (updateProduct === 409) { throw exists; }
  return res.status(204).json(updateProduct);
}));

router.post('/', rescue(async (req, res, _next) => {
  const { name, quantity } = req.body;
  if (!checkIntegrity(name, quantity)) { throw badData; }
  const newProduct = await productService.createProduct(name, quantity);
  if (newProduct === 409) { throw exists; }
  return res.status(201).json(newProduct);
}));

module.exports = router;
