require("dotenv").config(); // Arquivo => .env
const express = require("express");
const app = express(); // Iniciando servidor
const path = require("path");
const { sequelize } = require("./models");
const routes = require("./router/router");

app.use(express.json()); // Resposta via JSON
app.use("/api", routes);
app.use("/uploads", express.static(path.join(__dirname, "config", "uploads")));

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexao com o banco de dados deu certo.");
  })
  .catch((err) => {
    console.log("Erro ao conectar no banco: ", err);
  });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("---------------------------");
  console.log(`Runnig on http://${PORT}`);
  console.log("---------------------------");
});
