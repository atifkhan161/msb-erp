// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

var sqlite3 = require('sqlite3').verbose();
class DbService {
  constructor(next, model) {
    this.next = next;
    this.model = model;
  }

  async openDB() {
    // this.db = new bSqlite('/Users/atif.khan/Software/msb-erp/app.db', { verbose: console.log });
    // this.db = new bSqlite('./db/app.db', { verbose: console.log });
    this.db = new sqlite3.Database('/Users/atif.khan/Software/msb-erp/app.db');
  }

  async findFirst(params) {
    try {
      return await this.model.findFirst(params);
    } catch (err) {
      this.next(err);
    } finally {
      this.closeDB();
    }
  }

  async run(query, params) {
    return new Promise((resolve, reject) => {
      try {
        this.openDB();
        // return this.prepare(query).run(params);
        this.db.run(query, params, function (err, row) {
          if (err) {
            this.next(err.message);
            return reject(err.message);
          }
          return resolve({ lastInsertRowid: this.lastID });
        });
      } catch (err) {
        this.next(err);
      } finally {
        this.closeDB();
      }
    });
  }

  async get(query, params) {
    return new Promise((resolve, reject) => {
      try {
        this.openDB();
        // return this.prepare(query).get(params);
        this.db.get(query, params || [], (err, row) => {
          if (err) {
            this.next(err.message);
            return reject(err.message);
          }
          return resolve(row);
        });
      } catch (err) {
        this.next(err);
      } finally {
        this.closeDB();
      }
    });
  }

  async all(query, params) {
    return new Promise((resolve, reject) => {
      try {
        this.openDB();
        // return params ? this.prepare(query).all(params) : this.prepare(query).all();
        this.db.all(query, params || [], (err, rows) => {
          if (err) {
            throw err;
          }
          resolve(rows);
        });
      } catch (err) {
        this.next(err);
      } finally {
        this.closeDB();
      }
    });
  }

  prepare(query) {
    return this.db.prepare(query);
  }

  async closeDB() {
    // await this.db.close();
    // await prisma.$disconnect();
  }
}
module.exports = DbService;
