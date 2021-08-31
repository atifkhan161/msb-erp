var loki = require('lokijs');
const config = require('../config');
class DbService {

  constructor(next, collection) {
    this.next = next;
    this.collection = collection;
    this.db = new loki(config.db.name);
  }

  async openDB() {
    const self = this;
    return new Promise((resolve, reject) => {
      self.db.loadDatabase({}, function (err) {
        if (err) {
          reject(err);
        }
        self.databaseInitialize();
        resolve();
      });
    });
  }

  databaseInitialize() {
    var docCreated = false;

    // Users
    var users = this.db.getCollection("users");
    if (users === null) {
      users = this.db.addCollection("users", {
        indices: ['username'],
        unique: ['username']
      });
      // Create a default user.
      users.insert({
        username: 'admin',
        password: 'admin'
      });
      docCreated = true;
    }

    // Products
    var products = this.db.getCollection("products");
    if (products === null) {
      products = this.db.addCollection("products", {
        indices: ['name'],
        unique: ['name']
      });
      docCreated = true;
    }
    products.on('insert', function (input) {
      input.product_id = input.$loki;
      input.timestamp = input.meta.created;
    });

    products.on('update', function (input) {
      input.timestamp = input.meta.updated;
    });

    // Dealers
    var dealers = this.db.getCollection("dealers");
    if (dealers === null) {
      dealers = this.db.addCollection("dealers", {
        indices: ['name'],
        unique: ['name']
      });
      docCreated = true;
    }
    dealers.on('insert', function (input) {
      input.dealer_id = input.$loki;
      input.timestamp = input.meta.created;
    });

    // Inventory
    var inventory = this.db.getCollection("inventory");
    if (inventory === null) {
      inventory = this.db.addCollection("inventory", {
        indices: ['dealer_id']
      });
      docCreated = true;
    }
    inventory.ensureIndex("timestamp");
    inventory.on('insert', function (input) {
      input.trade_id = input.$loki;
    });

    // Inventory
    var transactions = this.db.getCollection("transactions");
    if (transactions === null) {
      transactions = this.db.addCollection("transactions", {
        indices: ['dealer_id']
      });
      docCreated = true;
    }
    transactions.ensureIndex("timestamp");
    transactions.on('insert', function (input) {
      input.trade_id = input.$loki;
    });

    if (docCreated) {
      this.db.saveDatabase();
    }
  }

  async where(filter) {
    try {
      await this.openDB();
      return this.db.getCollection(this.collection).where(filter);
    } catch (err) {
      this.next(err);
    }
  }

  async update(obj) {
    try {
      await this.openDB();
      return this.db.getCollection(this.collection).update(obj);
    } catch (err) {
      this.next(err);
    } finally {
      this.closeDB();
    }
  }

  async insert(obj) {
    try {
      await this.openDB();
      return this.db.getCollection(this.collection).insert(obj);
    } catch (err) {
      this.next(err);
    } finally {
      this.closeDB();
    }
  }

  async remove(obj) {
    try {
      await this.openDB();
      return this.db.getCollection(this.collection).remove(obj);
    } catch (err) {
      this.next(err);
    } finally {
      this.closeDB();
    }
  }

  async all() {
    try {
      await this.openDB();
      return this.db.getCollection(this.collection).chain().data();
    } catch (err) {
      this.next(err);
    }
  }

  async allSimplesort(key) {
    try {
      await this.openDB();
      return this.db.getCollection(this.collection).chain().simplesort(key, true);
    } catch (err) {
      this.next(err);
    }
  }

  async by(pkey, value) {
    try {
      await this.openDB();
      return this.db.getCollection(this.collection).by(pkey, value);
    } catch (err) {
      this.next(err);
    }
  }

  closeDB() {
    this.db.saveDatabase(function (err) {
      if (err) {
        throw (err);
      }
    });
  }
}
module.exports = DbService;
