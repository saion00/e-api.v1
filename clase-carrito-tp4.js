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
        this.add = []
    }
    addProductToCart(cid, pid, quantity) {
        // console.log(id);
        // console.log(quantity);
        console.log(cid);
        if (cid === undefined, pid === undefined, quantity === undefined) {
            return console.log(`ups! hubo un problema al cargar el producto`);
        } else {
            fs.readFile(cart_json, 'utf8', (err, data) => {
                if (err) {
                    console.log(`err: ${err}`)
                } else {
                    try {
                        // console.log(id);
                        // console.log(quantity);
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

    get allProducts() {
        return this.add;
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
    get numberOfProducts() {
        return this.add.length;
    }
    checkId(sID) {
        //··· Me está tirando un undefined que es incierto que no sé desde donde proviene ···//
        // return this.add;
        var sID = sID;
        // console.log(sID);
        var searchId = this.add;
        // console.log(searchId)
        Object.entries(searchId).forEach(([key, value]) => {
            if (value.id === undefined) { return console.log(`ups! existe un código de producto repetido`); }
            if (sID === value.id) {
                console.log(`Existe una coicidencia! El ID de producto con ${value.id} es ${value.title}`);
            } else {
                console.log(`No es este producto ${value.title} el que estás buscando`);
            }
        });
    }
    updateProduct(id, title, description, price, thumbnail, code, stock, status, category) {
        // Hay que validar mejor la data
        var id = id;
        var title = title;
        var description = description;
        var price = price;
        var thumbnail = thumbnail;
        var code = code;
        var stock = stock;
        var status = status;
        var category = category;

        console.log(id);
        // console.log(title);
        // console.log(description);
        // console.log(price);
        // console.log(thumbnail);
        // console.log(stock);
        // console.log(status);
        // console.log(category);

        fs.readFile(products_json, 'utf8', (err, data) => {
            if (err) {
                console.log(`err: ${err}`)
            } else {
                const bdpro = JSON.parse(data);
                bdpro.forEach(db => {
                    const index = bdpro.indexOf(db);
                    // console.log(bdpro[index].id);
                    // if (db.id != searchId) {
                    // if (bdpro[index].id != searchId) {
                    //     return console.log(`No existe el producto que quieres actualizar, intentalo de nuevo.`)
                    // }
                    // if (db.id === searchId) {
                    if (bdpro[index].id === id) {
                        bdpro[index].id === id;
                        bdpro[index].title = title;
                        bdpro[index].description = description;
                        bdpro[index].price = price;
                        bdpro[index].thumbnail = thumbnail;
                        bdpro[index].code = code;
                        bdpro[index].stock = stock;
                        bdpro[index].status = status;
                        bdpro[index].category = category;
                        // console.log(JSON.stringify(bdpro));
                        fs.writeFileSync(products_json, JSON.stringify(bdpro), 'utf8', function (err) {
                            if (err) return console.log(`err: ${err}`)
                        });
                    }
                });
            }
        });
    }
}

module.exports = { CartProduct, Cart };




