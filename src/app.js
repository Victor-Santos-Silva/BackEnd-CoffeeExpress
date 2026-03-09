require("dotenv").config(); // Arquivo => .env
const express = require("express");
const app = express(); // Iniciando servidor
const { sequelize } = require("./models");
const routes = require("./router/router");

app.use(express.json()); // Resposta via JSON
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("API Coffee Express está rodando!");
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexao com o banco de dados deu certo.");
  })
  .catch((err) => {
    console.log("Erro ao conectar no banco: ", err);
  });

app.listen(process.env.PORT, () => {
  console.log("---------------------------");
  console.log(`Runnig on http://${process.env.DB_HOST}:${process.env.PORT}`);
  console.log("---------------------------");
});
