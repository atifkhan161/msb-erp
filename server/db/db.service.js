const sqlite3 = require('sqlite3');
// const { open } = require('sqlite');
const bSqlite = require('better-sqlite3');

// Response handling
let resp = {
  status: 200,
  data: [],
  message: null
};

function dbService() {
  return {
    // openDb: async function () {
    //   return await open({
    //     filename: './db/app.db',
    //     driver: sqlite3.Database
    //   });
    // },
    openDb: async function () {
      return new bSqlite('./db/app.db', { verbose: console.log });
    },
    getUser: async function (req) {
      var query = "SELECT username FROM user WHERE username = ? and password = ?";
      const db = await this.openDb();
      const user = db.prepare(query).get(req.username, req.password);
      db.close();
      
      return user;
    }
  }
}
module.exports = dbService;
