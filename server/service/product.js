const express = require('express');
const router = express.Router();
const DbService = require("../db/db.service");

// Get Product
router.post('/product', async (req, res, next) => {
  let dbService = new DbService(next);
  const info = await dbService.addProduct(req.body, next);
  if (info) {
    res.send(req.body);
  }
});
module.exports = router;
