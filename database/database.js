const Sequelize = require('sequelize');

const connection = new Sequelize('discussao', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
})

connection.sync({force: false}).then(() => {});

module.exports = connection;
