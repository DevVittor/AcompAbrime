const Sequelize = require('sequelize');
const conn = require('../database/conn');
const Usuario = conn.define('Usuario',{
    nome:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Categoria:{
        type:Sequelize.STRING,
        allowNull:false
    }
})
Usuario.sync()
module.exports = Usuario