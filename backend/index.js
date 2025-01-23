const express = require("express");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const sequelize = require("./config/databaseconfig.js");
const { expressjwt: jwt } = require("express-jwt");
const usuarioRouter = require("./router/usuarioRouter");
const postRouter = require("./router/postRouter");
const comentarioRouter = require("./router/comentarioRouter");
const dontenv = require("dotenv");

dontenv.config();

const app = express();
const port = 3000;

sequelize.authenticate().then(() => {
  console.log("Conectado ao banco de dados");
});

sequelize.sync().then(() => {
  console.log("Tabelas criadas");
});
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Forum",
      version: "1.0.0",
      description: "Documentação da API do Forum",
    },
    servers: [
      {
        url: `https://improved-space-disco-wr5v4g75rw5rh96j5-3000.app.github.dev/`,
      },
    ],
  },
  apis: ["./router/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const JWTSecret = process.env.JWT_SECRET;

app.use(express.json());
app.use(cors());

app.use(
  jwt({
    secret: JWTSecret,
    algorithms: ["HS256"],
  }).unless({
    path: ["/usuarios/cadastrar", "/usuarios/login", "api-docs"],
  })
);

app.use("/usuarios", usuarioRouter);
app.use("/posts", postRouter);
app.use("/comentarios", comentarioRouter);

app.get("/", (req, res) => {
  res.send("Rodando na porta 3000");
});

app.listen(port, () => {
  console.log(`rodando na port: ${port}`);
});

module.exports = app;

//mysql -h 127.0.0.1 -u root -p

/*
usuario modelo:
{
"nome":"Jeffson",
"email":"jeffson@gmail.com",
"senha": "jeff123!",
"nickname": "Jeffao"
}
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "SenhaForte123!",
  "nickname": "joaozinho"
}
 */
