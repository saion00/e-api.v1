const express = require("express");
const routerProductos = express.Router();
const fs = require("node:fs");
const { Product, ProductManager } = require('./clase-productos-tp4');
const products_json = "products.json";

const productos = new ProductManager();
const allProducts = productos.allProductsJson;
// console.log(allProducts);
// const jsonProducts = JSON.parse(fs.readFileSync(products_json, 'utf8'));
// console.log(jsonProducts);
// var verJson = JSON.parse(fs.readFileSync(products_json, { encoding: "utf8", flag: "r" }));


// ENDPOINTS PRODUCT

// MOSTRAR PRODUCTOS
// http://localhost:8080/api/products
// http://localhost:8080/api/products?limite=2

routerProductos.get("/", async (req, res) => {
    var limite = req.query.limite;
    // La forma es readFileSync desde la ruta y no desde la clase.
    var show = JSON.parse(fs.readFileSync(products_json, 'utf8'));
    // res.json(show);
    if (limite && !isNaN(Number(limite))) {
        if (limite == 0) {
            console.log(show);
            res.send(show);
        } else {
            var show = await show.slice(0, limite);
            console.log(show);
            res.send(show);
        }
    } else {
        res.send(show);
    }
});


// BUSCAR PRODUCTO POR ID
// http://localhost:8080/api/products/1

routerProductos.get("/:pid", async (req, res) => {
    // console.log(req.params.pid);
    var show = allProducts;
    var product = await show.find((e) => e.id === Number(req.params.pid));
    console.log(product);
    res.send(product);
});

// Agrega productos al json, ruta post desde postman
routerProductos.post("/add", async (req, res) => {
    var _add = req.body;
    // console.log(_add.title);
    // console.log(req.body);
    if (_add.title.length && _add.description.length && _add.price.length && _add.code.length && _add.stock.length && _add.status.length && _add.category.length) {
        productos.addProduct(_add.title, _add.description, _add.price, _add.thumbnail, _add.code, _add.stock, _add.status, _add.category);
        return res.status(200).send("ok");
    }
    res.status(400).send("No se pudo guardar el producto, está faltando un dato.");
});

routerProductos.put("/:pid", async (req, res) => {
    var pid = req.params.pid;
    var _update = req.body;
    // console.log(pid);
    // console.log(_update);
    // console.log(req.body);
    var show = allProducts;
    // console.log(show);
    var product = await show.indexOf((e) => e.id === Number(pid));
    var product = product || {};
    var { "id": id } = product;
    console.log(id);
    console.log(product);
    if (pid == id) {
        // res.send(product);
        if (_update.title.length && _update.description.length && _update.price.length && _update.code.length && _update.stock.length && _update.status.length && _update.category.length) {
            // console.log(pid);
            productos.updateProduct(id, _update.title, _update.description, _update.price, _update.thumbnail, _update.code, _update.stock, _update.status, _update.category);
            return res.status(200).send("ok");
        }
    }
    res.status(400).send("No existe el producto a actualizar");
});


routerProductos.delete("/:pid", async (req, res) => {
    var pid = req.params.pid;
    // var _update = req.body;
    // console.log(pid);
    // console.log(_update);
    // console.log(req.body);
    var show = allProducts;
    // console.log(show);
    var product = await show.find((e) => e.id === Number(pid));
    var product = product || {};
    var { "id": id } = product;
    console.log(id);
    console.log(product);
    if (pid == id) {
        // res.send(product);
        productos.deleteProduct(id);
        return res.status(200).send("ok");
    }
    res.status(400).send("No existe el producto a eliminar");
});


// HOLA MUNDO
// routerProductos.get("/", (req, res) => {
//     res.send("Hola mundo!");
// });


// EXPORT ROUTER

module.exports = {
    routerProductos,
};