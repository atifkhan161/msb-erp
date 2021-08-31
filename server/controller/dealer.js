const express = require('express');
const router = express.Router();
const DealerService = require("../service/dealer");
const TradeService = require("../service/trade");

// Get Dealer
router.post('/dealer', async (req, res, next) => {
  let service = new DealerService(next);
  const info = await service.addDealer(req.body, next);
  if (info) {
    res.send(req.body);
  }
});

router.get('/dealer', async (req, res, next) => {
  let service = new DealerService(next);
  const info = await service.getAllDealer();
  if (info) {
    res.send(info);
  }
});

router.get('/dealer/:id', async (req, res, next) => {
  let service = new DealerService(next);
  const info = await service.getDealerById(req.params.id);
  if (info) {
    res.send(info);
  }
});

router.post('/dealer/delete', async (req, res, next) => {
  let service = new DealerService(next);
  const info = await service.deleteDealer(req.body);
  if (info) {
    res.send(info);
  }
});

router.put('/dealer/', async (req, res, next) => {
  let service = new DealerService(next);
  const info = await service.editDealer(req.body);
  if (info) {
    res.send(info);
  }
});

router.put('/dealer/pay', async (req, res, next) => {
  let service = new TradeService(next);
  let item = req.body;
  const info = await service.addPendingAmount(item);
  if (info) {
    res.send(info);
  }
});

module.exports = router;
