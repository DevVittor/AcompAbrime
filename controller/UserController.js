const conn = require("../database/conn");

class UsuarioController {
    index(req, res, next) {
        const title = "Inicio";
        res.json({
            page: title,
        });
    }
    store(req, res, next) {
        res.send("Store");
    }
}
module.exports = UsuarioController;
