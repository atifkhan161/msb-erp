const express = require('express');
const router = express.Router();
const DbService = require("./db.service");
const sendError = require("./error-service");

// Authenticate user
router.post('/user/login', async (req, res, next) => {
  let dbService = new DbService(next);
  const user = await dbService.getUser(req.body);
  if (user) {
    res.send(user);
  }
});
module.exports = router;
