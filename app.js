const fs = require("fs").promises;
const express = require("express");
const path = require("path");
const middleware = require("./middleware");
const bodyParser = require("body-parser");

// Set the port
const port = process.env.PORT || 3000;

// Boot the app
const app = express();

app.use(middleware.cors);
app.use(bodyParser.json());

// Register the public directory
app.use(express.static(__dirname + "/public"));

// Boot the server
app.listen(port, () => console.log(`Server listening on port ${port}`));

// Adding the api module
const api = require("./api");

app.use(middleware.cors);
// update the route handlers
app.get("/", api.handleRoot);
app.get("/products", api.listProducts);
app.get("/products/:id", api.getProduct);

//route for posting products
app.post("/products", api.createProduct);

// put/edit route 👇
app.put("/products", api.editProduct);

// delete method 👇
app.delete("/products", api.deleteProduct);
