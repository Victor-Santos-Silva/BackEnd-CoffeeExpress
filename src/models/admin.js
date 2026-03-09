module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define("Admin", {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    idade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Admin;
};
