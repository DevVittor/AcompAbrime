const Sequelize = require('sequelize');
const conn = require('../database/conn');

const Admin = conn.define('Admin',{
    nome:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    }
});
Admin.sync();
module.exports = Admin;