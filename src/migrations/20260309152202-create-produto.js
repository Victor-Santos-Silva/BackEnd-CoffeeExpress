"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("produto", {
      idProduto: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipoDeProduto: {
        type: Sequelize.ENUM(
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
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      precoPequeno: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      precoMedio: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      precoGrande: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("produto");
  },
};
