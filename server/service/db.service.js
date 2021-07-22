const bSqlite = require('better-sqlite3');

class DbService {
  constructor(next) {
    this.next = next;
    this.db = new bSqlite('./db/app.db', { verbose: console.log });
  }

  async getUser(req) {
    let query = "SELECT username FROM user WHERE username = ? and password = ?";
    return this.get(query, [req.username, req.password]);
  }

  async run(query, params) {
    try {
      return this.prepare(query).run(params);
    } catch (err) {
      this.next(err);
    } finally {
      this.closeDB();
    }
  }

  async get(query, params) {
    try {
      return this.prepare(query).get(params);
    } catch (err) {
      this.next(err);
    } finally {
      this.closeDB();
    }
  }

  async all(query, params) {
    try {
      return params ? this.prepare(query).all(params) : this.prepare(query).all();
    } catch (err) {
      this.next(err);
    } finally {
      this.closeDB();
    }
  }

  prepare(query) {
    return this.db.prepare(query);
  }

  closeDB() {
    this.db.close();
  }
}
module.exports = DbService;
