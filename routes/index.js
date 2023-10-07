const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Controllers
const UserController = require("../controller/UserController");
const userController = new UserController();
//Models
const Usuario = require("../models/Usuario");

require("dotenv").config();
require("../database/conn");

app.use(express.static("/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", userController.index);
app.get("/userstore", userController.store);

app.get("/verificar", (req, res) => {
    res.send("verificar");
});

app.get("/cadastrar", (req, res) => {
    res.send("Register");
});

app.post("/cadastrar/salvar", async (req, res) => {
    const { nome, email, senha } = req.body;

    const emailExist = await Usuario.findOne({
        where: {
            email: email,
        },
    });

    if (emailExist) {
        console.log(`O email ${email} já existe`);
        res.redirect("/cadastrar");
    } else {
        if (nome && email && senha) {
            try {
                const salt = bcrypt.genSaltSync(16);
                const hash = bcrypt.hashSync(senha, salt);
                const registerBD = await Usuario.create({
                    nome: nome,
                    email: email,
                    senha: hash,
                });
                console.log("Registrado com sucesso!");
                registerBD.save();
                res.status(201).redirect("/");
            } catch (error) {
                console.log(
                    `Não foi possível registrar por causa disso ${error}`,
                );
            }
        }
    }
});

app.get("/acessar", (req, res) => {
    res.send("Login");
});

app.post("/acessar/ok", async (req, res) => {
    const { email, senha } = req.body;
    const dataUsuario = await Usuario.findOne({
        where: {
            email,
        },
    });
    if (dataUsuario) {
        const hash = dataUsuario.senha;
        const checkSenha = bcrypt.compareSync(senha, hash);
        checkSenha
            ? console.log("Login Bem feito")
            : console.log("Dados incorretos");
    }
});

app.get("*", (req, res) => {
    res.status(404).send("Página Vázia!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
