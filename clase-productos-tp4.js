const fs = require("node:fs");
const products_json = "products.json";

// Clase producto
let Product = class {
    id;
    title;
    description;
    price;
    thumbnail;
    code;
    stock;
    status;
    category;
    static contadorGlobal = 0;
    constructor(title, description, price, thumbnail, code, stock, status, category) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.status = status;
        this.category = category;
        Product.contadorGlobal += 1;
    }
    show() {
        console.log(this.id + ' ' + this.title);
    }
}

// Clase Handler de productos
let ProductManager = class {
    constructor() {
        // this.add = []
    }
    get allProductsJson() {
        // try {        
        var data = JSON.parse(fs.readFileSync(products_json, 'utf8'));
        // console.log(data);
        return data;
        // } catch (err) {
        //    console.log(err); // print the orig error but throw your custom error
        //    throw new Error("Error Reading File");
        // }
    }
    addProduct(title, description, price, thumbnail, code, stock, status, category) {
        if (title === undefined || description === undefined || price === undefined || thumbnail === undefined || code === undefined || stock === undefined || status === undefined || category === undefined) {
            return console.log(`ups! un valor esta faltando en el producto ${title}`);
        } else {
            fs.readFile(products_json, 'utf8', (err, data) => {
                if (err) {
                    console.log(`err: ${err}`)
                } else {
                    try {
                        const bdpro = JSON.parse(data);
                        let jsonCode = bdpro.findIndex((c) => c.code === code);
                        // console.log(jsonCode);
                        if (jsonCode === -1) {
                            let p = new Product(title, description, price, thumbnail, code, stock, status, category);
                            bdpro.push(p);
                            p.id = bdpro.indexOf(p) + 1;
                            fs.writeFileSync(products_json, JSON.stringify(bdpro), 'utf8', function (err) {
                                if (err) return console.log(err);
                            });
                            console.log(`Producto agregado con exito`)
                        } else {
                            console.log(`Producto con código repetido`)
                        }
                    } catch (error) {
                        console.log(error.message);
                    }
                }
            });
        }
    }
    // get allProducts() {
    //     return this.add;
    // }
    // get numberOfProducts() {
    //     return this.add.length;
    // }
    // checkId(sID) {
    //     //··· Me está tirando un undefined que es incierto que no sé desde donde proviene ···//
    //     // return this.add;
    //     var sID = sID;
    //     // console.log(sID);
    //     var searchId = this.add;
    //     // console.log(searchId)
    //     Object.entries(searchId).forEach(([key, value]) => {
    //         if (value.id === undefined) { return console.log(`ups! existe un código de producto repetido`); }
    //         if (sID === value.id) {
    //             console.log(`Existe una coicidencia! El ID de producto con ${value.id} es ${value.title}`);
    //         } else {
    //             console.log(`No es este producto ${value.title} el que estás buscando`);
    //         }
    //     });
    // }
    getProductById(searchId) {
        var searchId = searchId;
        fs.readFile(products_json, 'utf8', (err, data) => {
            if (err) {
                console.log(`err: ${err}`)
            } else {
                const bdpro = JSON.parse(data);
                bdpro.forEach(db => {
                    if (db.id === searchId) {
                        console.log(`El producto que estás buscando es: ID:${db.id}, nombre ${db.title}`)
                        console.log(db);
                    } else {
                        console.log(`No es este el producto que estás buscando`)
                    }
                })
            }
        });
    }

    deleteProduct(searchId) {
        var searchId = searchId;
        fs.readFile(products_json, 'utf8', (err, data) => {
            if (err) {
                console.log(`err: ${err}`)
            } else {
                const bdpro = JSON.parse(data)
                // console.log(bdpro);
                bdpro.forEach(db => {
                    const index = bdpro.indexOf(db);
                    // if (db.id != searchId) {
                    if (bdpro[index].id != searchId) {
                        // console.log(`El producto que estás buscando es: ID:${db.id}, nombre ${db.title}`)
                        return console.log(`No existe el producto a eliminar, intentalo de nuevo.`)
                    }
                    // if (db.id === searchId) {
                    if (bdpro[index].id === searchId) {
                        console.log(`Producto eliminado ID: ${bdpro[index].id}`);
                        bdpro.splice(index, 1);
                        fs.writeFileSync(products_json, JSON.stringify(bdpro), 'utf8', function (err) {
                            if (err) return console.log(`err: ${err}`)
                        });
                    }
                });
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

        //console.log(id);
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

module.exports = { Product, ProductManager };




