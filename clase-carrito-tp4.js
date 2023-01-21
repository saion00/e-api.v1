const fs = require("node:fs");
const cart_json = "cart-products.json";

// Clase Producto Carrito
let CartProduct = class {
    cid;
    pid;
    quantity;
    static contadorGlobal = 0;
    constructor(cid, pid, quantity) {
        this.cid = cid;
        this.pid = pid;
        this.quantity = quantity;
    }
    show() {
        console.log(this.cid + ' ' + this.pid + ' ' + this.quantity);
    }
}

// Clase Handler de Productos Carrito
let Cart = class {
    constructor() {
       // this.add = []
    }
    get allProductsInCart() {
        // try {        
        // var data = fs.readFileSync(products_json);
        var data = JSON.parse(fs.readFileSync(cart_json, 'utf8'));
        // return JSON.parse(data);
        return data;
        // console.log(data);
        // } catch (err) {
        //    console.log(err); // print the orig error but throw your custom error
        //    throw new Error("Error Reading File");
        // }
    }
    addProductToCart(cid, pid, quantity) {
        if (cid === undefined, pid === undefined, quantity === undefined) {
            return console.log(`ups! hubo un problema al cargar el producto`);
        } else {
            fs.readFile(cart_json, 'utf8', (err, data) => {
                if (err) {
                    console.log(`err: ${err}`)
                } else {
                    try {
                        const bdpro = JSON.parse(data);
                        let p = new CartProduct(cid, pid, quantity);
                        // p.id = this.add.indexOf(p) + 1;
                        bdpro.push(p);
                        fs.writeFileSync(cart_json, JSON.stringify(bdpro), 'utf8', function (err) {
                            if (err) return console.log(err);
                        });
                        console.log(`Producto agregado con exito`)

                    } catch (error) {
                        console.log(error.message);
                    }
                }
            });
        }
    };
    updateProduct(cartId, pid, quantity) {
        var cartId = cartId;
        var pid = pid;
        var quantity = quantity;
        fs.readFile(cart_json, 'utf8', (err, data) => {
            if (err) {
                console.log(`err: ${err}`)
            } else {
                const bdpro = JSON.parse(data);
                bdpro.forEach(db => {
                    const index = bdpro.indexOf(db);
                    if (bdpro[index].cid === cartId && bdpro[index].pid === pid) {
                        bdpro[index].quantity = quantity;
                        fs.writeFileSync(cart_json, JSON.stringify(bdpro), 'utf8', function (err) {
                            if (err) return console.log(`err: ${err}`)
                        });
                    }
                });
            }
        });
    }
}

module.exports = { CartProduct, Cart };




