require("dotenv").config();
require("../database/conn");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

const jwtSecret = process.env.JWT_SECRET;

//Controllers
const UserController = require("../controller/UserController");
const userController = new UserController();
//Models
const Usuario = require("../models/Usuario");
// Rota para servir imagens
// Rota para servir imagens
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: "http://localhost:5173/", // Substitua pela URL da sua aplicação Vue.js
}));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    },
});

const upload = multer({ storage });



function authRouter(req, res, next) {
    const authToken = req.headers['authorization'];
    console.log(authToken);
    if (authToken != undefined) {
        const BearerToken = authToken.split(" ");
        const token = BearerToken[1];
        console.log("Token extraído:", token);
        jwt.verify(token, jwtSecret, (error, data) => {
            if (error) {
                res.status(401).json({ infoError: `Token está Inválido! devido ao error: ${error}` });
            } else {
                req.token = token;
                req.userLogger = { id: data.id};
                next();
            }
        });
    } else {
        res.status(401).json({ error: "Token Inválido" });
    }
}
/*app.get('/',authRouter,(req,res)=>{
    res.send('Olá');
});*/
app.get("/", authRouter, userController.index);
app.get("/userstore", userController.store);

app.get("/cadastrar", authRouter, (req, res) => {
    res.send("Register");
});

app.post("/cadastrar/salvar", async (req, res) => {
    const { email, senha } = req.body;

    const emailExist = await Usuario.findOne({
        where: {
            email: email,
        },
    });
    if (emailExist) {
        console.log(`O email ${email} já existe`);
        res.redirect("/cadastrar");
    } else {
        if (email && senha) {
            try {
                const salt = bcrypt.genSaltSync(16);
                const hash = bcrypt.hashSync(senha, salt);
                const registerBD = await Usuario.create({
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

/*app.post("/acessar/ok", async (req, res) => {
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
                        res.status(400).json({ error: `Falha Interna com o error ${error}` });
                    } else {
                        res.status(200).json({ token: token });
                    }
                },
            );
            console.log(`Login feito com sucesso!`);
        }else{
            console.log('Login inválido');
            res.status(301).redirect('/cadastrar');
        }
    }
});*/

app.post("/acessar/ok", async (req, res) => {
    const { email, senha } = req.body;
    const dataUsuario = await Usuario.findOne({ where: { email } });

    if (dataUsuario && senha) {
        const hash = dataUsuario.senha;
        console.log("Senha:", senha);
        console.log("Hash:", hash);
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
                        req.tokenCode = token;
                        res.status(200).json({ token: token });
                        console.log(token);
                    }
                }
            );
        } else {
            console.log("Senha incorreta. Não foi possível fazer Login");
            res.status(401).json({ error: "Senha incorreta" });
        }
    } else {
        console.log("Email não encontrado ou senha vazia. Não foi possível fazer Login");
        res.status(401).json({ error: "Email não encontrado ou senha vazia" });
    }
});

app.get("*", (req, res) => {
    res.status(404);
});



// Rota para lidar com o upload de imagens
app.post("/upload", upload.single("image"), (req, res) => {
    // Salve a imagem no diretório público do servidor Node.js
    const imageUrl = `public/uploads/${req.file.filename}`;
    res.json({ imageUrl });
});


const port = process.env.PORT || 5173;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
