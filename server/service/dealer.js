const DbService = require("./db.service");
class DealerService {
  constructor(next) {
    this.next = next;
    this.dbService = new DbService(next);
  }

  async addDealer(item) {
    let query = 'INSERT INTO dealer (name, number, email, notes) VALUES (@name, @number, @email, @notes)';
    return this.dbService.run(query, {
      name: item.name,
      number: item.number,
      email: item.email,
      notes: item.notes
    });
  }

  async editDealer(item) {
    let query = `UPDATE dealer 
                SET 
                name = @name,
                number = @number,
                email = @email,
                notes = @notes WHERE 
                dealer_id=@dealerId`;
    return this.dbService.run(query, {
      name: item.name,
      number: item.number,
      email: item.email,
      notes: item.notes,
      dealerId: item.dealer_id
    });
  }

  async deleteDealer(item) {
    let query = "DELETE FROM dealer WHERE dealer_id = ?";
    return this.dbService.run(query, item.dealer_id);
  }

  async getAllDealer() {
    let query = "SELECT * FROM dealer";
    return this.dbService.all(query, null);
  }
}

module.exports = DealerService;
