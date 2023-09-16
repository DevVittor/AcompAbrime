const Sequelize = require('sequelize');
const conn  = require('../database/conn');

const Login = conn.define('login',{
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
    }
})
Login.sync();
module.exports = Login;