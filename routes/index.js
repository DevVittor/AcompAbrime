const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const jwtSecret = process.env.JWT_SECRET;

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

function authRouter(req, res, next) {
    const authToken = req.headers["authorization"];
    if (authToken != undefined) {
        const BearerToken = authToken.split(" ");
        const token = BearerToken[1];
        console.log("Token extraído:", token);
        jwt.verify(token, jwtSecret, (error, data) => {
            if (error) {
                res.status(401).json({
                    infoError: `Token está Inválido! devido ao error: ${error}`,
                });
            } else {
                req.token = token;
                req.userLogger = { id: data.id, email: data.email };
                //res.status(200).json({ infoData: data });
                next();
            }
        });
    } else {
        res.status(401).json({ error: "Token Inválido" });
    }
}
app.get('/', (req,res)=>{
    const token = req.token;
    res.json({name:"Vittor",token:token});
})
//app.get("/", userController.index);
app.get("/userstore", userController.store);

app.get("/verificar", (req, res) => {
    res.send("verificar");
});

app.get("/cadastrar", authRouter,(req, res) => {
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
        if (checkSenha) {
            jwt.sign(
                { id: dataUsuario.id, email: dataUsuario.email },
                jwtSecret,
                { expiresIn: "48h" },
                (error, token) => {
                    if (error) {
                        res.status(400).json({ error: "Falha Interna" });
                    } else {
                        res.status(200).json({ token: token });
                    }
                },
            );
            console.log("Login Bem feito")
        }else{
            console.log('Login inválido');
            res.status(301).redirect('/cadastrar');
        }
    }
});

app.get("*", (req, res) => {
    res.status(404).send("Página Vázia!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
