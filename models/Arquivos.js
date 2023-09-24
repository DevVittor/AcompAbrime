const Sequelize = require('sequelize');
const conn = require('../database/conn');

const Arquivo = conn.define('Arquivos',{
    Fotos:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    Videos:{
        type:Sequelize.TEXT,
        allowNull:false
    },
})
Arquivo.sync()
module.exports = Arquivo;