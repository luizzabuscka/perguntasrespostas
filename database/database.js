const Sequelize = require("sequelize");
const mysql2 = require("mysql2")

const connection = new Sequelize("perguntas_respostas", "root", "", {
    host: "localhost",
    dialect: "mysql",
    dialectModule: mysql2
});

module.exports = connection;