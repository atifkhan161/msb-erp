const DbService = require("./db.service");
const ProductService = require("./product");
const DealerService = require("./dealer");

class InventoryService {
  constructor(next) {
    this.next = next;
    this.dbService = new DbService(next);
  }

  async add(item) {
    let productService = new ProductService(this.next);
    let dealerService = new DealerService(this.next);
    let query = `INSERT INTO inventory (dealer_id, total, paid, timestamp)
                  VALUES (@dealer_id, @total, @paid, @timestamp)`;
    let inventory = await this.dbService.run(query, {
      dealer_id: item.dealer_id,
      total: item.total,
      paid: item.paid,
      timestamp: item.timestamp
    });
    // Update dealer amount owed
    let dealer = await dealerService.getDealerById(item.dealer_id);
    if (dealer) {
      let amount = dealer.amount;
      amount += item.total - item.paid;
      await dealerService.updateDealerAmount(item.dealer_id, amount, item.timestamp);
    }
    if (inventory) {
      // Add entry into transac table
      for (const trasaction of item.transactions) {
        let transQuery = `INSERT INTO transac (product_id, inventory_id, quantity, cost, timestamp)
                  VALUES (@product_id, @inventory_id, @quantity, @cost, @timestamp)`;
        await this.dbService.run(transQuery, {
          product_id: trasaction.product_id,
          inventory_id: inventory.lastInsertRowid,
          quantity: trasaction.quantity,
          cost: trasaction.cost,
          timestamp: item.timestamp
        });
        // Update inventory count in product page
        let product = await productService.getProductById(trasaction.product_id);
        if (product) {
          let totalCount = product.inventory + trasaction.quantity;
          await productService.updateProductCount(trasaction.product_id, totalCount, item.timestamp);
        }
      }
      return inventory;
    } else {
      return inventory;
    }
  }

  async delete(item) {
    let productService = new ProductService(this.next);
    let dealerService = new DealerService(this.next);
    const transactions = await this.getTransaction(item.inventory_id);
    let dealer = await dealerService.getDealerById(item.dealer_id);
    if (dealer) {
      let amount = dealer.amount;
      amount -= item.total - item.paid;
      await dealerService.updateDealerAmount(item.dealer_id, amount, item.timestamp);
    }
    let tquery = "DELETE FROM transac WHERE inventory_id = ?";
    await this.dbService.run(tquery, item.inventory_id);
    let query = "DELETE FROM inventory WHERE inventory_id = ?";
    let delInv = await this.dbService.run(query, item.inventory_id);
    for (const trasaction of transactions) {
      let product = await productService.getProductById(trasaction.product_id);
      if (product) {
        let totalCount = product.inventory - trasaction.quantity;
        await productService.updateProductCount(trasaction.product_id, totalCount, Date.now());
      }
    }
    return delInv;
  }

  async getAll() {
    let query = `SELECT inventory.inventory_id, inventory.dealer_id, dealer.name AS Dealer_Name,
                  inventory.paid, inventory.total, inventory.timestamp
                  FROM inventory 
                  LEFT JOIN dealer ON inventory.dealer_id = dealer.dealer_id
                  ORDER BY inventory.timestamp DESC`;
    return this.dbService.all(query, null);
  }

  async getTransaction(inventory_id) {
    let query = `SELECT transac.inventory_id, transac.product_id, product.name, transac.quantity,
                  transac.cost, transac.timestamp
                  FROM transac 
                  LEFT JOIN product ON transac.product_id = product.product_id
                  WHERE transac.inventory_id = ?`;
    return this.dbService.all(query, inventory_id);
  }
}

module.exports = InventoryService;
