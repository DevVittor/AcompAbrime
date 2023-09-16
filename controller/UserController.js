const conn = require('../database/conn');

class UsuarioController{
    index(req,res,next){
        res.send("pegando usando controller!");
    }
}
module.exports = UsuarioController;