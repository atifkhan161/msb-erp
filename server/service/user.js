const express = require('express');
const router = express.Router();
const dbService = require("../db/db.service")();

let response = {
  status: 200,
  data: [],
  message: null
};

// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.data = [];
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

// Get movies
router.post('/user/login', async (req, res) => {
  const user = await dbService.getUser(req.body);
  if (!user) {
    sendError("Invalid Credentials!", res);
  } else {
    res.send(user);
  }
});
module.exports = router;
