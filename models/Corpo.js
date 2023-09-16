const Sequelize = require('sequelize');
const conn = require('../database/conn');

const Corpo = conn.define('Corpo',{
    Altura:{
        type:Sequelize.FLOAT(3,2),
        allowNull:false
    },
    Corpo:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Peso:{
        type:Sequelize.FLOAT(5,2),
        allowNull:false
    },
    Peitos:{
        type:Sequelize.STRING,
        allowNull:false
    },
    TamanhoPeitos:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Bunda:{
        type:Sequelize.STRING,
        allowNull:false
    },
    TamanhoBunda:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Tatuagem:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Oculos:{
        type:Sequelize.STRING,
        allowNull:false
    },
    AparelhoDental:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Pubis:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Etnia:{
        type:Sequelize.STRING,
        allowNull:false
    },
})
Corpo.sync();
module.exports = Corpo;