const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define("respostas",
    {
        idPergunta: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    }
);

Resposta.sync({force: false}).then(() => {});

module.exports = Resposta;