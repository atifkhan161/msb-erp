const express = require('express');
const router = express.Router();
const ProductService = require("../service/product");

// Get Product
router.post('/product', async (req, res, next) => {
  let service = new ProductService(next);
  const info = await service.addProduct(req.body, next);
  if (info) {
    res.send(req.body);
  }
});

router.get('/product', async (req, res, next) => {
  let service = new ProductService(next);
  const info = await service.getAllProduct();
  if (info) {
    res.send(info);
  }
});

router.post('/product/delete', async (req, res, next) => {
  let service = new ProductService(next);
  const info = await service.deleteProduct(req.body);
  if (info) {
    res.send(info);
  }
});

router.put('/product/', async (req, res, next) => {
  let service = new ProductService(next);
  const info = await service.editProduct(req.body);
  if (info) {
    res.send(info);
  }
});

module.exports = router;
