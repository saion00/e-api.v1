function pass(req, res, next) {
    console.log("OK ruta");
    next();
  }
  
  function compras(req, res, next) {
    console.log("Se esta accediendo a las rutas de /compras");
    next();
  }
  
  function errorHandler(err, req, res, next) {
    console.log(err);
    res.status(500).send("Hubo un error en la API!");
  }
  
  module.exports = {
    pass,
    compras,
    errorHandler,
  };