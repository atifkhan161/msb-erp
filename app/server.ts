import * as express from "express";
import * as cors from "cors";
import * as sqlite3 from "sqlite3";

class App {

  // ref to Express instance
  public express: express.Application;

  private db = new sqlite3.verbose()('./app/db/msb.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the chinook database.');
  });
  private users;
  // Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    // Insert data
    this.db.run('CREATE TABLE langs(name text)');
    this.db.close();
  }

  private loadDbs() {
    console.log("context : " + this.db);

    let entries = this.db.getCollection("entries");
    if (entries === null) {
      entries = this.db.addCollection("entries");
    }
    let entryCount = entries.count();
    let now = new Date();

    console.log("old number of entries in database : " + entryCount);

    entries.insert({ x: now.getTime(), y: 100 - entryCount });
    entryCount = entries.count();

    console.log("new number of entries in database : " + entryCount);
    console.log("");
    console.log("Wait 4 seconds for the autosave timer to save our new addition and then press [Ctrl-c] to quit")
  }
  // Configure Express middleware.
  private middleware(): void {
    // this.express.use(logger("dev"));
    this.express.use(express.json());
    this.express.use(cors());
    this.express.options("*", cors);
    this.express.use(express.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    const router = express.Router();
    // placeholder route handler
    router.get("/hello", (req, res, next) => {
      // res.json(this.users.findOne({ message: 'Odin' }));
      res.send({ message: 'Odin' });
    });
    this.express.use("/", router);
  }
}
export default new App().express;