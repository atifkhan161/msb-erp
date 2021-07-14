const express = require('express')
const app = express()
const port = 8087
var cors = require("cors");

// API files
const user = require("./service/user");

app.use(express.json());
app.use(cors());
app.options("*", cors);
app.use(express.urlencoded({ extended: false }));

// Api Endpoints
app.use(user);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});