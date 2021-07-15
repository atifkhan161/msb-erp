const express = require('express')
const app = express()
const port = 8087
var cors = require("cors");
var methodOverride = require('method-override');

// API files
const user = require("./service/user");
const product = require("./service/product");
const clientErrorHandler =  require("./service/error-service");

app.use(express.json());
app.use(cors());
app.options("*", cors);
app.use(express.urlencoded({ extended: false }));

// Api Endpoints
app.use(user);
app.use(product);

app.use(methodOverride());
app.use(clientErrorHandler);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});