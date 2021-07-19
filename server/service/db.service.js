const bSqlite = require('better-sqlite3');

class DbService {
  constructor(next) {
    this.next = next;
    this.db = new bSqlite('./db/app.db', { verbose: console.log });
  }

  async getUser(req) {
    let query = "SELECT username FROM user WHERE username = ? and password = ?";
    return this.get(this.db.prepare(query), [req.username, req.password]);
  }

  async addProduct(item) {
    let query = "INSERT INTO product ('name') VALUES (?)";
    return this.run(this.db.prepare(query), item.name);
  }

  async editProduct(item) {
    let query = "UPDATE product SET name=@name WHERE product_id=@productId";
    return this.run(this.db.prepare(query), {
      name: item.name,
      productId: item.product_id
    });
  }

  async deleteProduct(item) {
    let query = "DELETE FROM product WHERE product_id = ?";
    return this.run(this.db.prepare(query), item.product_id);
  }

  async getAllProduct() {
    let query = "SELECT * FROM product;";
    return this.all(this.db.prepare(query, null));
  }

  async run(query, params) {
    try {
      return query.run(params);
    } catch (err) {
      this.next(err);
    } finally {
      this.closeDB();
    }
  }

  async get(query, params) {
    try {
      return query.get(params);
    } catch (err) {
      this.next(err);
    } finally {
      this.closeDB();
    }
  }

  async all(query, params) {
    try {
      return params ? query.all(params) : query.all();
    } catch (err) {
      this.next(err);
    } finally {
      this.closeDB();
    }
  }

  closeDB() {
    this.db.close();
  }
}
module.exports = DbService;
