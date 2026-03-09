module.exports = (sequelize, DataTypes) => {
  const Pedido = sequelize.define("Pedido", {
    idPedido: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idCarrinho: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "carrinho",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("PENDENTE", "ENVIADO", "ENTREGUE", "CANCELADO"),
      allowNull: false,
    },
  });
  Pedido.associate = (models) => {
    Pedido.hasMany(models.Carrinho, { foreignKey: "pedidoId" });
  };

  return Pedido;
};
