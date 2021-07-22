const express = require('express');
const router = express.Router();
const DbService = require("./db.service");

class ProductService {
  constructor(next) {
    this.next = next;
    this.dbService = new DbService(next);
  }

  async addProduct(item) {
    let query = `INSERT INTO product ('name') VALUES (@name)`;
    return this.dbService.run(query, {
      name: item.name
    });
  }

  async editProduct(item) {
    let query = `UPDATE product SET name=@name WHERE product_id=@productId`;
    return this.dbService.run(query, {
      name: item.name,
      productId: item.product_id
    });
  }

  async deleteProduct(item) {
    let query = "DELETE FROM product WHERE product_id = ?";
    return this.dbService.run(query, item.product_id);
  }

  async getAllProduct() {
    let query = "SELECT * FROM product";
    return this.dbService.all(query, null);
  }
}

// Get Product
router.post('/product', async (req, res, next) => {
  let service = new ProductService(next);
  const info = await service.addProduct(req.body, next);
  if (info) {
    res.send(req.body);
  }
});

router.get('/product', async (req, res, next) => {
  let service = new ProductService(next);
  const info = await service.getAllProduct();
  if (info) {
    res.send(info);
  }
});

router.post('/product/delete', async (req, res, next) => {
  let service = new ProductService(next);
  const info = await service.deleteProduct(req.body);
  if (info) {
    res.send(info);
  }
});

router.put('/product/', async (req, res, next) => {
  let service = new ProductService(next);
  const info = await service.editProduct(req.body);
  if (info) {
    res.send(info);
  }
});

module.exports = router;
