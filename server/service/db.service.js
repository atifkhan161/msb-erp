const bSqlite = require('better-sqlite3');
const path = require('path');
class DbService {
  constructor(next) {
    this.next = next;
  }

  async openDB() {
    // this.db = new bSqlite('/Users/atif.khan/Software/msb-erp/app.db', { verbose: console.log });
    this.db = new bSqlite('./db/app.db', { verbose: console.log });
  }

  async run(query, params) {
    try {
      await this.openDB();
      return this.prepare(query).run(params);
    } catch (err) {
      this.next(err);
    } finally {
      this.closeDB();
    }
  }

  async get(query, params) {
    try {
      await this.openDB();
      return this.prepare(query).get(params);
    } catch (err) {
      this.next(err);
    } finally {
      this.closeDB();
    }
  }

  async all(query, params) {
    try {
      await this.openDB();
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
