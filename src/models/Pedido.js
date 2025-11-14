const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Pedido = sequelize.define(
  "Pedido",
  {
    idPedido: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idCarrinho: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Carrinhos",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("PENDENTE", "ENVIADO", "ENTREGUE", "CANCELADO"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Pedido;
