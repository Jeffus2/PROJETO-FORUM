const { Sequelize } = require("sequelize");
const dontenv = require("dotenv");

dontenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);


const startDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso");
  } catch (error) {
    console.log("Não foi possível conectar ao banco de dados:", error);
  }
};

startDatabase();

module.exports = sequelize;

/*
Usuario 
{
"nome": "Fulano",
"email": "fulano@gmail.com",
"senha": "Fulano123!@#",
"nickname": "fulano123",
"profissao": "Desenvolvedor"
}
Post
{
"titulo": "Meu primeiro post",
"conteudo": "Esse é o conteúdo do meu primeiro post"
"usuario_id": 1
}
Comentario
{
"titulo": "Primeiro comentário",
"conteudo": "Esse é o conteúdo do meu primeiro comentário",
"usuario_id": 1,
"post_id": 1
}
*/
