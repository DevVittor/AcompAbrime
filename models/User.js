const Sequelize = require('sequelize');
const conn = require('../database/conn');
const Acomp = require('../models/Acomp');

const Usuario = conn.define('Usuarios',{
    nome:{
        type:Sequelize.STRING,
        allowNull:false,
        require:true
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
});

Usuario.belongsTo(Acomp,{
    constraint:true,
    foreignKey:'idAcomp'
});

Usuario.sync({force:true});
module.exports = Usuario;