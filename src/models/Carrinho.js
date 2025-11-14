const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Carrinho = sequelize.define(
  "Carrinho",
  {
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    produtoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Produtos",
        key: "idProduto",
      },
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tamanho: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precoTotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Carrinho;
