const express = require('express');
const router = express.Router();
const TradeService = require("../service/trade");

// Get Trade
router.post('/trade', async (req, res, next) => {
  let service = new TradeService(next);
  const info = await service.add(req.body, next);
  if (info) {
    res.send(req.body);
  }
});

router.get('/trade', async (req, res, next) => {
  let service = new TradeService(next);
  const info = await service.getAll(req.query.limit);
  if (info) {
    res.send(info);
  }
});

router.post('/trade/delete', async (req, res, next) => {
  let service = new TradeService(next);
  const info = await service.delete(req.body);
  if (info) {
    res.send(info);
  }
});

router.put('/trade/', async (req, res, next) => {
  let service = new TradeService(next);
  const info = await service.add(req.body);
  if (info) {
    res.send(info);
  }
});

router.get('/trade/transactions/:id', async (req, res, next) => {
  let service = new TradeService(next);
  const info = await service.getTransaction(req.params.id);
  if (info) {
    res.send(info);
  }
});

module.exports = router;
