const express = require('express');
const router = express.Router();
const DbService = require("./db.service");

// Get Product
router.post('/product', async (req, res, next) => {
  let dbService = new DbService(next);
  const info = await dbService.addProduct(req.body, next);
  if (info) {
    res.send(req.body);
  }
});

router.get('/product', async (req, res, next) => {
  let dbService = new DbService(next);
  const info = await dbService.getAllProduct();
  if (info) {
    res.send(info);
  }
});

router.post('/product/delete', async (req, res, next) => {
  let dbService = new DbService(next);
  const info = await dbService.deleteProduct(req.body);
  if (info) {
    res.send(info);
  }
});

router.put('/product/', async (req, res, next) => {
  let dbService = new DbService(next);
  const info = await dbService.editProduct(req.body);
  if (info) {
    res.send(info);
  }
});

module.exports = router;
