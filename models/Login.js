const Sequelize = require('sequelize');
const conn  = require('../database/conn');

const Login = conn.define('Logins',{
    email:{
        type:Sequelize.STRING,
        unique:true,
        lowercase:true,
        allowNull:false
    },
    password:{
        type: Sequelize.STRING,
        required:true,
        allowNull:false
    },
    cliente:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    },
    acompanhante:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    },
    empresa:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    },
    admin:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    },
});
Login.sync();
module.exports = Login;