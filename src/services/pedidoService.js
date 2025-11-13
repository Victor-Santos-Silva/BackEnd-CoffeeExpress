const { Pedido, Produto } = require("../models");

const pedidoService = {
  // Criar pedido
  create: async (pedido) => {
    try {
      const { idProduto } = pedido;

      const novoPedido = await Pedido.create({ idProduto });

      return novoPedido;
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      throw new Error("Ocorreu um erro ao criar o pedido.");
    }
  },

  // Listar todos os pedidos
  getAll: async () => {
    try {
      return await Pedido.findAll({
        include: [
          {
            model: Produto,
            as: "produto",
          },
        ],
      });
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
      throw new Error("Ocorreu um erro ao buscar os pedidos.");
    }
  },
};

module.exports = pedidoService;
