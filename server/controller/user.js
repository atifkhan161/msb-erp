const express = require('express');
const router = express.Router();
const DbService = require("../service/db.service");
const sendError = require("../service/error-service");
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
class UserService {
  constructor(next) {
    this.next = next;
    this.dbService = new DbService(next, "users");
  }

  async authenticate(item) {
    return this.dbService.where((obj) => {
      return obj.username === item.username && obj.password === item.password;
    });
  }

  async getUser(item) {
    return this.dbService.by("username", item.username);
  }

  async changePassword(item, user) {
    user.password = item.newPwd;
    return this.dbService.update(user);
  }
}

// Authenticate user
router.post('/user/login', async (req, res, next) => {
  let service = new UserService(next);
  const users = await service.authenticate(req.body);
  if (users && users.length) {
    res.send({
      username: users[0].username
    });
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
    await service.changePassword(req.body, user);
    return res.send({
      username: user.username
    });
  } else {
    res.status(501).json({
      status: 501,
      data: [],
      message: "Invalid Credentials!"
    });
  }
});
module.exports = router;
