const Sequelize = require('sequelize');
const conn = require('../database/conn');

const Acomp = conn.define('Acompanhantes',{

    Nome:{
        type:Sequelize.STRING,
        allowNull:false
    },
    DataNascimento:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    Celular:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    Categoria:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Clientes:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Cep:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Estado:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Cidade:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Sobre:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Servicos:{
        type:Sequelize.STRING,
        allowNull:false
    },
    ServicosEspeciais:{
        type:Sequelize.STRING,
        allowNull:false
    },
    LugarEncontro:{
        type:Sequelize.STRING,
        allowNull:false
    },
    horariosAtendimento:{
        type:Sequelize.STRING,
        allowNull:false
    }
});
Acomp.sync();
module.exports= Acomp;