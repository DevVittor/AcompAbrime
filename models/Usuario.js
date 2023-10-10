const Sequelize = require("sequelize");
const conn = require("../database/conn");

const Usuario = conn.define("Usuarios", {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
    },
});

Usuario.sync();
module.exports = Usuario;
