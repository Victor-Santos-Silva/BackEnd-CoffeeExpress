module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define("Produto", {
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
      type: DataTypes.ENUM(
        "Capuccino",
        "Expresso",
        "Latte",
        "Mocha",
        "Cappuccino Gelado",
        "Outros",
      ),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    precoPequeno: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    precoMedio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    precoGrande: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });

  Produto.associate = (models) => {
    Produto.hasMany(models.Carrinho, { foreignKey: "produtoId" });
  };

  return Produto;
};
