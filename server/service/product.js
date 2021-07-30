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

  async updateProductCount(id, count, timestamp) {
    let query = `UPDATE product SET inventory=@inventory, timestamp=@timestamp WHERE product_id=@product_id`;
    return this.dbService.run(query, {
      product_id: id,
      inventory: count,
      timestamp: timestamp
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

  async getProductById(id) {
    let query = "SELECT * FROM product WHERE product_id = ?";
    return this.dbService.get(query, id);
  }
}

module.exports = ProductService;
