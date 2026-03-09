module.exports = (sequelize, DataTypes) => {
  const Carrinho = sequelize.define("Carrinho", {
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    produtoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Produto",
        key: "idProduto",
      },
    },
    pedidoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Pedido",
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
  });

  Carrinho.associate = (models) => {
    Carrinho.belongsTo(models.Produto, { foreignKey: "produtoId" });
    Carrinho.belongsTo(models.Pedido, { foreignKey: "pedidoId" });
  };

  return Carrinho;
};
