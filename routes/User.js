const router = require('express').Router();
const UsuarioController =require('../controller/UserController');

const usuarioController = new UsuarioController();

router.get('/',usuarioController.index);

module.exports = router;