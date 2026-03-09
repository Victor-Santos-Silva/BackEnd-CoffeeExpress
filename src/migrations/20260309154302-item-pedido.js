"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("itemPedido", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pedidoId: {
        type: Sequelize.INTEGER,
        references: {
          model: "pedido",
          key: "id",
        },
      },
      produtoId: {
        type: Sequelize.INTEGER,
        references: {
          model: "produto",
          key: "idProduto",
        },
      },
      quantidade: {
        type: Sequelize.INTEGER,
      },
      tamanho: {
        type: Sequelize.STRING,
      },
      preco: {
        type: Sequelize.DECIMAL(10, 2),
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("itemPedido");
  },
};
