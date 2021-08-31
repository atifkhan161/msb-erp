const DbService = require("./db.service");
const ProductService = require("./product");
const DealerService = require("./dealer");

class InventoryService {
  constructor(next) {
    this.next = next;
    this.dbService = new DbService(next, "inventory");
  }

  // async add(item) {
  //   let productService = new ProductService(this.next);
  //   let dealerService = new DealerService(this.next);
  //   let query = `INSERT INTO trade (dealer_id, total, amount, timestamp, type)
  //                 VALUES ($dealer_id, $total, $amount, $timestamp, $type)`;
  //   let trade = await this.dbService.run(query, {
  //     $dealer_id: item.dealer_id,
  //     $total: item.total,
  //     $amount: item.amount,
  //     $timestamp: item.timestamp,
  //     $type: 'Buy'
  //   });
  //   // Update dealer amount owed
  //   let dealer = await dealerService.getDealerById(item.dealer_id);
  //   if (dealer) {
  //     let amount = dealer.amount;
  //     amount -= item.total - item.amount;
  //     await dealerService.updateDealerAmount(item.dealer_id, amount, item.timestamp);
  //   }
  //   if (trade) {
  //     // Add entry into transac table
  //     for (const trasaction of item.transactions) {
  //       let transQuery = `INSERT INTO transac (product_id, trade_id, quantity, cost, timestamp)
  //                 VALUES ($product_id, $trade_id, $quantity, $cost, $timestamp)`;
  //       await this.dbService.run(transQuery, {
  //         $product_id: trasaction.product_id,
  //         $trade_id: trade.lastInsertRowid,
  //         $quantity: trasaction.quantity,
  //         $cost: trasaction.cost,
  //         $timestamp: item.timestamp
  //       });
  //       // Update trade count in product page
  //       let product = await productService.getProductById(trasaction.product_id);
  //       if (product) {
  //         let totalCount = product.inventory + trasaction.quantity;
  //         await productService.updateProductCount(trasaction.product_id, totalCount, item.timestamp);
  //       }
  //     }
  //     return trade;
  //   } else {
  //     return trade;
  //   }
  // }

  // async delete(item) {
  //   let productService = new ProductService(this.next);
  //   let dealerService = new DealerService(this.next);
  //   const transactions = await this.getTransaction(item.trade_id);
  //   let dealer = await dealerService.getDealerById(item.dealer_id);
  //   if (dealer) {
  //     let amount = dealer.amount;
  //     amount += item.total - item.amount;
  //     await dealerService.updateDealerAmount(item.dealer_id, amount, item.timestamp);
  //   }
  //   let tquery = "DELETE FROM transac WHERE trade_id = ?";
  //   await this.dbService.run(tquery, item.trade_id);
  //   let query = "DELETE FROM trade WHERE trade_id = ?";
  //   let delInv = await this.dbService.run(query, item.trade_id);
  //   for (const trasaction of transactions) {
  //     let product = await productService.getProductById(trasaction.product_id);
  //     if (product) {
  //       let totalCount = product.inventory - trasaction.quantity;
  //       await productService.updateProductCount(trasaction.product_id, totalCount, Date.now());
  //     }
  //   }
  //   return delInv;
  // }

  // async getAll() {
  //   let query = `SELECT trade.trade_id, trade.dealer_id, dealer.name AS Dealer_Name,
  //                 trade.amount, trade.total, trade.timestamp
  //                 FROM trade 
  //                 LEFT JOIN dealer ON trade.dealer_id = dealer.dealer_id
  //                 WHERE trade.type = 'Buy' 
  //                 ORDER BY trade.timestamp DESC`;
  //   return this.dbService.all(query, null);
  // }

  // async getTransaction(trade_id) {
  //   let query = `SELECT transac.trade_id, transac.product_id, product.name, transac.quantity,
  //                 transac.cost, transac.timestamp
  //                 FROM transac 
  //                 LEFT JOIN product ON transac.product_id = product.product_id
  //                 WHERE transac.trade_id = ?`;
  //   return this.dbService.all(query, trade_id);
  // }

  async add(item) {
    let productService = new ProductService(this.next);
    let dealerService = new DealerService(this.next);
    let inventory = await this.dbService.insert(item);
    // Update dealer amount owed
    let dealer = await dealerService.getDealerById(item.dealer_id);
    if (dealer) {
      let amount = dealer.amount;
      amount -= item.total - item.amount;
      await dealerService.updateDealerAmount(item.dealer_id, amount, item.timestamp);
    }
    if (inventory) {
      // Add entry into transac table
      for (const trasaction of item.transactions) {
        // Update trade count in product page
        let product = await productService.getProductById(trasaction.product_id);
        if (product) {
          let totalCount = product.inventory + trasaction.quantity;
          await productService.updateProductCount(product, totalCount, item.timestamp);
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
    let dealer = await dealerService.getDealerById(item.dealer_id);
    if (dealer) {
      let amount = dealer.amount;
      amount += item.total - item.amount;
      await dealerService.updateDealerAmount(item.dealer_id, amount, item.timestamp);
    }
    for (const trasaction of item.transactions) {
      let product = await productService.getProductById(trasaction.product_id);
      if (product) {
        let totalCount = product.inventory - trasaction.quantity;
        await productService.updateProductCount(product, totalCount, Date.now());
      }
    }
    let inventory = await this.getInventoryById(item.trade_id);
    let delInv = await this.dbService.remove(inventory);
    return delInv;
  }

  async getAll(limit) {
    let dealerService = new DealerService(this.next);
    let inventory = await this.dbService.allSimplesort('timestamp');
    let dealers = await dealerService.getAllDealer();
    let resultSet = inventory.eqJoin(dealers, "dealer_id", "dealer_id", (left, right) => {
      const { $loki, ...inv} = {...left};
      return {
        ...inv,
        Dealer_Name: right.name,
      };
    });
    if (limit) {
      resultSet = resultSet.limit(limit);
    }
    return resultSet.data();
  }

  async getInventoryById(id) {
    return this.dbService.by("trade_id", id);
  }
}

module.exports = InventoryService;
