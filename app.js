const express = require("express");
const app = express();
const fs = require("node:fs");
const bodyParser = require("body-parser");
const { pass, errorHandler } = require("./middlewares");
const { routerProductos } = require("./routerProductos");
const { routerCompras } = require("./routerCompras");

app.use(errorHandler);

const staticFilesPath = __dirname + "/public";
app.use("/static", express.static(staticFilesPath));

app.use(bodyParser.json({ limit: '100mb' }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(pass);

app.use("/api/products", routerProductos);
app.use("/api/cart", routerCompras);

// Levantar el servidor
app.listen(8080, () => {
  console.log("Server running on port: " + 8080);
});