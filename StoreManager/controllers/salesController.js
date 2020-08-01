const express = require('express');
const rescue = require('express-rescue');
const salesService = require('../services/salesService');
const { notFound, badData } = require('../middlewares/error');

const router = express.Router();

const checkIntegrity = (req) => {
  const salesData = req.body.map(({ productId, quantity }) => ({ productId, quantity }));

  if (!Array.isArray(req.body) || salesData.some(({ productId, quantity }) => typeof productId !== 'string' || typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity <= 0)) {
    return false;
  }
  return true;
};

router.post('/', rescue(async (req, res, _next) => {
  const salesData = req.body.map(({ productId, quantity }) => ({ productId, quantity }));

  if (!checkIntegrity(req)) { throw badData; }

  const newSale = await salesService.insertSales(salesData);
  if (newSale === 404) { throw notFound; }
  return res.status(201).json(newSale);
}));

router.get('/', rescue(async (_req, res) => {
  const products = await salesService.listSales();
  return res.status(200).json(products);
}));

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const singleSale = await salesService.showOneSale(id);
  if (singleSale === 404) { throw notFound; }
  return res.status(200).json(singleSale);
}));

router.delete('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const deleteSale = await salesService.deleteSale(id);
  if (deleteSale === 404) { throw notFound; }
  return res.status(204).json();
}));

router.put('/:id', rescue(async (req, res, _next) => {
  const salesData = req.body.map(({ productId, quantity }) => ({ productId, quantity }));
  if (!checkIntegrity(req)) { throw badData; }
  const { id } = req.params;
  const updateSale = await salesService.updateSale(id, salesData);
  if (updateSale === 404) { throw notFound; }
  return res.status(201).json(updateSale);
}));

module.exports = router;
