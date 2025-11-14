const Pedido = require("../models/Pedido");
const Carrinho = require("../models/Carrinho");
const Produto = require("../models/Produto");

const pedidoService = {
  create: async (adminId) => {
    // recebe adminId como parâmetro
    try {
      const carrinhoItems = await Carrinho.findAll({
        where: { adminId, pedidoId: null },
      });

      if (carrinhoItems.length === 0) {
        throw new Error("Carrinho vazio");
      }

      // Cria o pedido
      const novoPedido = await Pedido.create({
        idCarrinho: carrinhoItems[0].id, // ou algum critério para o pedido
        status: "PENDENTE",
      });

      // Atualiza carrinho com o id do pedido
      await Promise.all(
        carrinhoItems.map((item) =>
          item.update({ pedidoId: novoPedido.idPedido })
        )
      );

      return novoPedido;
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      throw new Error(error.message);
    }
  },

  getAll: async () => {
    return await Pedido.findAll();
  },
};

module.exports = pedidoService;
