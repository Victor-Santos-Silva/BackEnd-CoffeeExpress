const fs = require("fs");
const path = require("path");
const sequelize = require("../config/database");

const db = {};

// Ler todos os arquivos de modelo na pasta
fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js")
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

// Desestrutura para facilitar o uso
const { Pedido, Produto } = db;

// 🔗 Registrar associações (importante fazer após carregar todos)
if (Pedido && Produto) {
  Pedido.belongsTo(Produto, { foreignKey: "idProduto", as: "produto" });
  Produto.hasMany(Pedido, { foreignKey: "idProduto", as: "pedidos" });
}

// Sincronizar com o banco
sequelize.sync();

module.exports = { sequelize, ...db };
