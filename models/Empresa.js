const Sequelize = require('sequelize');
const conn = require('../database/conn');

const Empresa = conn.define('Empresas',{
    empresa:{
        type:Sequelize.STRING,
        allowNull:false
    },
    linkEmpresa:{
        type:Sequelize.STRING,
        allowNull:false
    },
    aprovado:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    }
});
Empresa.sync();
module.exports = Empresa;