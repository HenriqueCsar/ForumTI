const Sequelize = require('sequelize');
const connection = require('./database');

const Discussao = connection.define('discussaos', {

    titulo:{ 
        type: Sequelize.STRING,
        allowNull: false
    },
    materia: {
        type: Sequelize.STRING,
        allowNull: false
    },
    opiniao: {
        type: Sequelize.TEXT,
        allowNull: false
    }

})

module.exports = Discussao;