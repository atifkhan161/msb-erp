const express = require('express');
const router = express.Router();
const DbService = require("../service/db.service");
const sendError = require("../service/error-service");

class UserService {
  constructor(next) {
    this.next = next;
    this.dbService = new DbService(next);
  }

  async authenticate(item) {
    let query = "SELECT username FROM user WHERE username = @username and password = @password";
    return this.dbService.get(query, {
      username: item.username,
      password: item.password
    });
  }
}
// Authenticate user
router.post('/user/login', async (req, res, next) => {
  let service = new UserService(next);
  const user = await service.authenticate(req.body);
  if (user) {
    res.send(user);
  } else {
    res.status(501).json({
      status: 501,
      data: [],
      message: "Invalid Credentials!"
    });
  }
});
module.exports = router;
