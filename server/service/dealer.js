const DbService = require("./db.service");
class DealerService {
  constructor(next) {
    this.next = next;
    this.dbService = new DbService(next, "dealers");
  }

  // async addDealer(item) {
  //   let query = 'INSERT INTO dealer (name, number, email, notes, amount) VALUES ($name, $number, $email, $notes, $amount)';
  //   return this.dbService.run(query, {
  //     $name: item.name,
  //     $number: item.number,
  //     $amount: item.amount,
  //     $email: item.email,
  //     $notes: item.notes
  //   });
  // }

  // async editDealer(item) {
  //   let query = `UPDATE dealer 
  //               SET 
  //               name = $name,
  //               number = $number,
  //               amount = $amount,
  //               email = $email,
  //               notes = $notes WHERE 
  //               dealer_id=$dealerId`;
  //   return this.dbService.run(query, {
  //     $name: item.name,
  //     $number: item.number,
  //     $amount: item.amount,
  //     $email: item.email,
  //     $notes: item.notes,
  //     $dealerId: item.dealer_id
  //   });
  // }

  // async deleteDealer(item) {
  //   let query = "DELETE FROM dealer WHERE dealer_id = ?";
  //   return this.dbService.run(query, item.dealer_id);
  // }

  // async getAllDealer() {
  //   let query = "SELECT * FROM dealer";
  //   return this.dbService.all(query, null);
  // }

  // async getDealerById(id) {
  //   let query = "SELECT * FROM dealer WHERE dealer_id = ?";
  //   return this.dbService.get(query, id);
  // }

  // async updateDealerAmount(id, amount, timestamp) {
  //   let query = `UPDATE dealer SET amount=$amount, timestamp=$timestamp WHERE dealer_id=$dealer_id`;
  //   return this.dbService.run(query, {
  //     $dealer_id: id,
  //     $amount: amount,
  //     $timestamp: timestamp
  //   });
  // }

  async addDealer(item) {
    return this.dbService.insert(item);
  }

  async editDealer(item) {
    let dealer = await this.getDealerById(item.dealer_id);
    dealer.name = item.name;
    dealer.number = item.number;
    dealer.amount = item.amount;
    dealer.email = item.email;
    dealer.notes = item.notes;
    return this.dbService.update(dealer);
  }

  async deleteDealer(item) {
    return this.dbService.remove(item);
  }

  async getAllDealer() {
    return this.dbService.all();
  }

  async getDealerById(id) {
    return this.dbService.by("dealer_id", id);
  }

  async updateDealerAmount(id, amount, timestamp) {
    let dealer = await this.getDealerById(id);
    dealer.amount = amount;
    dealer.timestamp = timestamp;
    return this.dbService.update(dealer);
  }
}

module.exports = DealerService;
