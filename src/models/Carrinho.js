const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Produto = require("./Produto");
const Pedido = require("./Pedido");

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
        model: Produto,
        key: "idProduto",
      },
    },
    pedidoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Pedido,
        key: "idPedido",
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

// Associações
Carrinho.belongsTo(Produto, { foreignKey: "produtoId" });
Produto.hasMany(Carrinho, { foreignKey: "produtoId" });

Carrinho.belongsTo(Pedido, { foreignKey: "pedidoId" });
Pedido.hasMany(Carrinho, { foreignKey: "pedidoId" });

module.exports = Carrinho;
