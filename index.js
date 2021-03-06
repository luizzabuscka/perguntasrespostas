const express = require("express");
const bodyParser = require("body-parser");

const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

connection
    .authenticate()
    .then(() => {
        console.log("Connected with database!!!")
    })
    .catch((error) => {
        console.log("Erro ao conectar com banco de dados: "+error)
    });

const app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {

    var perguntas = Pergunta.findAll({ raw: true, order: [
        ['id', 'DESC']
    ]}).then((perguntas) => {
        res.render("index", { perguntas });
    });

});

app.get("/v1/questions", (req, res) => {
    var perguntas = Pergunta.findAll({ raw: true, order: [
        ['id', 'DESC']
    ]}).then((perguntas) => {
        res.send(perguntas)
    });
});

app.post("/v1/savequestion", (req, res) => {
    var title = req.body.title;
    var description = req.body.description;

    Pergunta.create({
        title: title,
        description: description
    }).then(() => {
        res.send(true);
    }).catch((error) => {
        console.log("Error saving question!")
        res.send(false);
    });
});

app.get("/ask", (req, res) => {
    res.render("ask");
});

app.post("/savequestion", (req, res) => {
    var title = req.body.title;
    var description = req.body.description;

    Pergunta.create({
        title: title,
        description: description
    }).then(() => {
        res.redirect("/");
    }).catch((error) => {
        console.log("Error saving question!")
    });
});

app.get("/question/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: { id: id }
    }).then((pergunta) => {
        if (pergunta != undefined) {
            Resposta.findAll({
                where: { idPergunta: pergunta.id }
            }).then((respostas) => {
                res.render("question", { pergunta, respostas })
            });
        } else {
            console.log("Pergunta não encontrada");
            res.redirect("/");
        }
    })
});

app.post("/saveanswer", (req, res) => {
    var idPergunta = req.body.idPergunta;
    var description = req.body.answer;

    Resposta.create({
        description: description,
        idPergunta : idPergunta
    }).then(() => {
        res.redirect("/question/"+idPergunta);
    }).catch((error) => {
        console.log("Error saving answer: "+error);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, err => {
    if(err) throw err;
    console.log("%c Server running", "color: green");
});