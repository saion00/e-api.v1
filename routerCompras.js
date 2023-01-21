const express = require("express");
const routerCompras = express.Router();
const fs = require("node:fs");
const middlewares = require("./middlewares");
const { v4: uuidv4 } = require('uuid');
const { Product, ProductManager } = require('./clase-productos-tp4');
const { CartProduct, Cart } = require('./clase-carrito-tp4');

routerCompras.use(middlewares.compras);

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
    var cartId = req.params.cid;
    var show = AllCart;
    var productCart = await show.find((c) => c.cid === cartId);
    var productCart = productCart || {};
    var { "cid": cid } = productCart;
    if (cid == cartId) {
        var searchProducts = show.filter((c) => c.cid === cartId);
        return res.status(200).send(searchProducts);
    }
    return res.status(400).send("No existe el producto en el carrito.");
});

routerCompras.post("/:cid/product/:pid", async (req, res) => {
    var cartId = req.params.cid;
    var pid = req.params.pid;
    var { quantity } = req.body;
    var show = AllCart;
    var product = await show.find((c) => c.cid === cartId);
    var product = product || {};
    var { "cid": cid, "pid": productoId } = product;
    if (cartId.length && pid.length && quantity.length) {
        if (cartId == cid && productoId == pid) {
            // console.log("update product");
            cart.updateProduct(cartId, pid, quantity);
            return res.status(200).send("Se actualizo el producto en el carrito");
        } else {
            cart.addProductToCart(cartId, pid, quantity);
            return res.status(200).send("Se agrego el producto al carrito");
        }
    }
    res.status(400).send("No existe el producto a cargar al carrito");
});

// routerCompras.post("/:cid/product/:pid", async (req, res) => {
//     var cid = req.params.cid;
//     var pid = req.params.pid;
//     var {quantity} = req.body;
//     // console.log(cid);
//     // console.log(pid);
//     // console.log(quantity);
//     // var show = allProducts;
//     // // console.log(show);
//     // var product = await show.find((e) => e.id === Number(pid));
//     // var product = product || {};
//     // var { "id": id } = product;
//     // console.log(id);
//     // console.log(product);
//     // if (pid == id) {
//         // res.send(product);
//         if (cid.length && pid.length && quantity.length) { 
//             console.log(cid);
//             console.log(pid);
//             console.log(quantity);
//             // console.log(pid);
//             cart.addProductToCart(cid, pid, quantity);
//             return res.status(200).send("ok");
//         }
//     // }
//     res.status(400).send("No existe el producto a cargar al carrito");
// });

module.exports = {
    routerCompras,
};