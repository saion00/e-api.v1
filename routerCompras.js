const express = require("express");
const routerCompras = express.Router();
const fs = require("node:fs");
const {v4: uuidv4}=require('uuid');
const { Product, ProductManager } = require('./clase-productos-tp4');
const { CartProduct, Cart } = require('./clase-carrito-tp4');

// let { compras } = require("./database");
// const multer = require("multer");

const productos = new ProductManager();
const allProducts = productos.allProductsJson;

const cart = new Cart();
const AllCart = cart.allProductsInCart;
// console.log(AllCart);

/// ENDPOINTS CART

routerCompras.get("/", (req, res) => {
    res.json(uuidv4());
});

routerCompras.get("/:cid", async (req, res) => {
    // console.log(req.params.pid);
    var cartId = req.params.cid;
    var show = AllCart;
    // console.log(show);
    var productCart = await show.find((c) => c.cid === cartId);
    // console.log(productCart);
    var productCart = productCart || {};
    var { "cid": cid } = productCart;
    console.log(productCart);
    if (cid == cartId) {
        return res.status(200).send(productCart);
    } else {
        res.status(400).send("No existe el producto en el carrito");
    }
});

routerCompras.post("/:cid/product/:pid", async (req, res) => {
    var cid = req.params.cid;
    var pid = req.params.pid;
    var {quantity} = req.body;
    // console.log(cid);
    // console.log(pid);
    // console.log(quantity);
    // var show = allProducts;
    // // console.log(show);
    // var product = await show.find((e) => e.id === Number(pid));
    // var product = product || {};
    // var { "id": id } = product;
    // console.log(id);
    // console.log(product);
    // if (pid == id) {
        // res.send(product);
        if (cid.length && pid.length && quantity.length) { 
            console.log(cid);
            console.log(pid);
            console.log(quantity);
            // console.log(pid);
            cart.addProductToCart(cid, pid, quantity);
            return res.status(200).send("ok");
        }
    // }
    res.status(400).send("No existe el producto a cargar al carrito");
});


// routerCompras.get("/", (req, res) => {
//     res.send(compras);
// });


// routerCompras.put("/:id", (req, res) => {
//     compraId = compras.findIndex((c) => c.id === +req.params.id);
//     compras[compraId] = {
//         id: req.params.id,
//         nombre: req.body.nombre,
//     };
//     res.send("producto actualizado!");
// });


// routerCompras.delete("/:id", (req, res) => {
//     compras = compras.filter((c) => c.id !== +req.params.id);
//     res.send("Producto eliminado");
// });


// routerCompras.post("/nueva", multer({ dest: "uploads/" }).single("foto"), function (req, res, next) {
//     // req.file is the `avatar` file
//     // req.body will hold the text fields, if there were any
//     console.log(req.body);
//     res.status(200).send("Compra agregada");
// });


// HOLA MUNDO
// routerCompras.get("/", (req, res) => {
//     res.send("Hola mundo!");
// });

// EXPORT ROUTER

module.exports = {
    routerCompras,
};