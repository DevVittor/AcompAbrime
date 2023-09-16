const conn = require('../database/conn');

class UsuarioController{
    index(req,res,next){
        res.send("pegando usando controller!");
    }
    store(req,res,next){
        res.send('Store')
    }
}
module.exports = UsuarioController;