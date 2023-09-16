const Sequelize = require('sequelize');
const conn = require('../database/conn');

const Social = conn.define('Social',{
    Facebook:{
        type:Sequelize.STRING,
        allowNull:true
    },
    Instagram:{
        type:Sequelize.STRING,
        allowNull:true
    },
    Twitter:{
        type:Sequelize.STRING,
        allowNull:true
    },
    Whatsapp:{
        type:Sequelize.STRING,
        allowNull:true
    },
    Telegram:{
        type:Sequelize.STRING,
        allowNull:true
    },
    Onlyfans:{
        type:Sequelize.STRING,
        allowNull:true
    },
    Privacy:{
        type:Sequelize.STRING,
        allowNull:true
    },
})
Social.sync()
module.exports=Social