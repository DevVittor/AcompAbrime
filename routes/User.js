const router = require('express').Router();
const UsuarioController =require('../controller/UserController');

const usuarioController = new UsuarioController();

router.get('/',usuarioController.index);
router.get('/')

module.exports = router;