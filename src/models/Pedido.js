const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Pedido = sequelize.define("Pedido", {
  idPedido: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idProduto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Pedido;
