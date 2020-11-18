const Sequelize = require("sequelize");
const mysql2 = require("mysql2");

// const connection = new Sequelize("perguntas_respostas", "chuntr", "chuntr1234", {
//   host: "chuntrdb.c1uzpsc3txer.sa-east-1.rds.amazonaws.com",
//   dialect: "mysql",
//   dialectModule: mysql2
// });

const connection = new Sequelize({
  dialect: 'sqlite',
  storage: './database/db.sqlite'
});

module.exports = connection;