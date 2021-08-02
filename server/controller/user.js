const express = require('express');
const router = express.Router();
const DbService = require("../service/db.service");
const sendError = require("../service/error-service");

class UserService {
  constructor(next) {
    this.next = next;
    this.dbService = new DbService(next);
  }

  async getUser(item) {
    let query = "SELECT username FROM user WHERE username = @username and password = @password";
    return this.dbService.get(query, {
      username: item.username,
      password: item.password
    });
  }

  async changePassword(item) {
    let query = `UPDATE user
                  SET
                    password = @password
                  WHERE
                    username = @username`;
    return this.dbService.run(query, {
      username: item.username,
      password: item.newPwd,
    });
  }
}
// Authenticate user
router.post('/user/login', async (req, res, next) => {
  let service = new UserService(next);
  const user = await service.getUser(req.body);
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

router.post('/user/change', async (req, res, next) => {
  let service = new UserService(next);
  const user = await service.getUser(req.body);
  if (user) {
    await service.changePassword(req.body);
    return res.send(user);
  } else {
    res.status(501).json({
      status: 501,
      data: [],
      message: "Invalid Credentials!"
    });
  }
});
module.exports = router;
