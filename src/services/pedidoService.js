const { Pedido, PedidoItem, CarrinhoItem, Produto } = require("../models");

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
  finalizarPedido: async (userId) => {
    const itens = await CarrinhoItem.findAll({ where: { userId } });

    if (itens.length === 0) {
      throw new Error("Carrinho vazio.");
    }

    const pedido = await Pedido.create({
      userId,
      total: itens.reduce((acc, item) => acc + item.subtotal, 0),
    });

    // Criar itens do pedido
    for (const item of itens) {
      const produto = await Produto.findByPk(item.produtoId);

      // Atualizar estoque
      produto.estoque -= item.quantidade;
      await produto.save();

      await PedidoItem.create({
        pedidoId: pedido.id,
        produtoId: item.produtoId,
        quantidade: item.quantidade,
        precoUnitario: produto.preco,
      });
    }

    // Limpa carrinho
    await CarrinhoItem.destroy({ where: { userId } });

    return pedido;
  },
};

module.exports = pedidoService;
