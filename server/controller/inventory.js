const express = require('express');
const router = express.Router();
const InventoryService = require("../service/inventory");

// Get Inventory
router.post('/inventory', async (req, res, next) => {
  let service = new InventoryService(next);
  const info = await service.add(req.body, next);
  if (info) {
    res.send(req.body);
  }
});

router.get('/inventory', async (req, res, next) => {
  let service = new InventoryService(next);
  const info = await service.getAll(req.query.limit);
  if (info) {
    res.send(info);
  }
});

router.post('/inventory/delete', async (req, res, next) => {
  let service = new InventoryService(next);
  const info = await service.delete(req.body);
  if (info) {
    res.send(info);
  }
});

router.put('/inventory/', async (req, res, next) => {
  let service = new InventoryService(next);
  const info = await service.add(req.body);
  if (info) {
    res.send(info);
  }
});

router.get('/inventory/transactions/:id', async (req, res, next) => {
  let service = new InventoryService(next);
  const info = await service.getTransaction(req.params.id);
  if (info) {
    res.send(info);
  }
});

module.exports = router;
