const DbService = require("./db.service");

class ProductService {
  constructor(next) {
    this.next = next;
    this.dbService = new DbService(next, "products");
  }

  // async addProduct(item) {
  //   let query = `INSERT INTO product ('name') VALUES ($name)`;
  //   return this.dbService.run(query, {
  //     $name: item.name
  //   });
  // }

  // async editProduct(item) {
  //   let query = `UPDATE product SET name=$name WHERE product_id=$productId`;
  //   return this.dbService.run(query, {
  //     $name: item.name,
  //     $productId: item.product_id
  //   });
  // }

  // async updateProductCount(id, count, timestamp) {
  //   let query = `UPDATE product SET inventory=$inventory, timestamp=$timestamp WHERE product_id=$product_id`;
  //   return this.dbService.run(query, {
  //     $product_id: id,
  //     $inventory: count,
  //     $timestamp: timestamp
  //   });
  // }

  // async deleteProduct(item) {
  //   let query = "DELETE FROM product WHERE product_id = ?";
  //   return this.dbService.run(query, item.product_id);
  // }

  // async getAllProduct() {
  //   let query = "SELECT * FROM product";
  //   return this.dbService.all(query, null);
  // }

  // async getProductById(id) {
  //   let query = "SELECT * FROM product WHERE product_id = ?";
  //   return this.dbService.get(query, id);
  // }

  async addProduct(item) {
    item.inventory = 0;
    return this.dbService.insert(item);
  }

  async editProduct(item) {
    let product = await this.getProductById(item.product_id);
    product.name = item.name;
    return this.dbService.update(product);
  }

  async updateProductCount(product, count, timestamp) {
    // let product = await this.getProductById(id);
    if (product) {
      product.inventory = count;
      product.timestamp = timestamp;
    }
    return this.dbService.update(product);
  }

  async deleteProduct(item) {
    return this.dbService.remove(item);
  }

  async getAllProduct() {
    return this.dbService.all();
  }

  async getProductById(id) {
    return this.dbService.by("product_id", id);
  }
}

module.exports = ProductService;
