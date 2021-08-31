/*jshint strict:false */

(function (appPath) {
  const express = require('express');
  const app = express();
  var cors = require("cors");
  var methodOverride = require('method-override');
  const path = require('path');
  const config = require('./config');
  const port = config.app.port || 8087;

  // const open = require('open');

  // API files
  const user = require("./controller/user");
  const product = require("./controller/product");
  const dealer = require("./controller/dealer");
  const inventory = require("./controller/inventory");
  const trade = require("./controller/trade");
  const clientErrorHandler = require("./service/error-service");

  app.use(express.json());
  app.use(cors());
  app.options("*", cors);
  app.use(express.urlencoded({ extended: false }));

  // Api Endpoints
  app.use(user);
  app.use(product);
  app.use(dealer);
  app.use(inventory);
  app.use(trade);

  // Web views
  app.use('/', express.static(getDir() + '/static'));
  app.use(redirectUnmatched);

  app.use(methodOverride());
  app.use(clientErrorHandler);
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    require("openurl").open(`http://localhost:${port}`);
  });

  function redirectUnmatched(req, res) {
    res.redirect("/");
  }

  // Using a function to set default app path
  function getDir() {
    if (process.pkg) {
      return path.resolve(process.execPath + "/..");
    } else {
      return path.join(require.main ? require.main.path : process.cwd());
    }
  }
  module.exports = app;
}());