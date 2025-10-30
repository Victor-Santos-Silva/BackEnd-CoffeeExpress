const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Produto = sequelize.define(
  "Produto",
  {
    idProduto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    tipoDeProduto: {
      type: DataTypes.ENUM("Capuccino", "Expresso", "Latte", "Mocha", "Cappuccino Gelado", "Outros"),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    tamanhos: {
      type: DataTypes.ENUM("Pequeno", "Médio", "Grande"),
      allowNull: false,
    },
    imagem: {
      type: DataTypes.STRING, // armazena o caminho ou URL
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Produto;
