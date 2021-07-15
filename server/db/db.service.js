const bSqlite = require('better-sqlite3');

// function dbService() {
//   return {
//     openDb: async function () {
//       let db = new bSqlite('./db/app.db', { verbose: console.log });
//       return db;
//     },
//     getUser: async function (req) {
//       var query = "SELECT username FROM user WHERE username = ? and password = ?";
//       const db = await this.openDb();
//       const user = db.prepare(query).get(req.username, req.password);
//       db.close();

//       return user;
//     },
//     addProduct: async function (item, next) {
//       var query = "INSERT INTO product ('name') VALUES (?)";
//       const db = await this.openDb();
//       const resp = await this.run(db.prepare(query), item.name, next);
//       return resp;
//     },
//     run: async function (query, params, next) {
//       try {
//         return query.run(params);
//       } catch (err) {
//         something;
//         next(err);
//       } finally {
//         db.close();
//       }
//     }
//   }
// } (something);
class DbService {
  constructor(next) {
    this.next = next;
    this.db = new bSqlite('./db/app.db', { verbose: console.log });
  }

  async getUser(req) {
    var query = "SELECT username FROM user WHERE username = ? and password = ?";
    return this.get(this.db.prepare(query), [req.username, req.password]);
  }

  async addProduct(item) {
    var query = "INSERT INTO product ('name') VALUES (?)";
    return this.run(this.db.prepare(query), item.name);
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

  closeDB() {
    this.db.close();
  }
}
module.exports = DbService;
