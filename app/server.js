"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var sqlite3 = require("sqlite3");
var App = /** @class */ (function () {
    // Run configuration methods on the Express instance.
    function App() {
        this.db = new sqlite3.verbose()('./app/db/msb.db', function (err) {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the chinook database.');
        });
        this.express = express();
        this.middleware();
        this.routes();
        // Insert data
        this.db.run('CREATE TABLE langs(name text)');
        this.db.close();
    }
    App.prototype.loadDbs = function () {
        console.log("context : " + this.db);
        var entries = this.db.getCollection("entries");
        if (entries === null) {
            entries = this.db.addCollection("entries");
        }
        var entryCount = entries.count();
        var now = new Date();
        console.log("old number of entries in database : " + entryCount);
        entries.insert({ x: now.getTime(), y: 100 - entryCount });
        entryCount = entries.count();
        console.log("new number of entries in database : " + entryCount);
        console.log("");
        console.log("Wait 4 seconds for the autosave timer to save our new addition and then press [Ctrl-c] to quit");
    };
    // Configure Express middleware.
    App.prototype.middleware = function () {
        // this.express.use(logger("dev"));
        this.express.use(express.json());
        this.express.use(cors());
        this.express.options("*", cors);
        this.express.use(express.urlencoded({ extended: false }));
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        var router = express.Router();
        // placeholder route handler
        router.get("/hello", function (req, res, next) {
            // res.json(this.users.findOne({ message: 'Odin' }));
            res.send({ message: 'Odin' });
        });
        this.express.use("/", router);
    };
    return App;
}());
exports.default = new App().express;
//# sourceMappingURL=server.js.map