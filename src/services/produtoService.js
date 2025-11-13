const Produto = require("../models/Produto");

const produtoService = {
  create: async (produto) => {
    try {
      const {
        nome,
        tipoDeProduto,
        descricao,
        precoPequeno,
        precoMedio,
        precoGrande,
        imagem,
      } = produto;
      return await Produto.create({
        nome,
        tipoDeProduto,
        descricao,
        precoPequeno,
        precoMedio,
        precoGrande,
        imagem,
      });
    } catch (error) {
      console.log(error);
      throw new Error("Ocorreu um erro ao criar produto.");
    }
  },
  update: async (id, update) => {
    try {
      const produto = await Produto.findByPk(id);
      if (!produto) {
        return null;
      }
      await produto.update(update);
      await produto.save();
      return produto;
    } catch (error) {
      throw new Error("Ocorreu um erro ao atualizar o produto.");
    }
  },
  getById: async (id) => {
    try {
      const produto = await Produto.findByPk(id);
      if (!produto) {
        return null;
      }
      return produto;
    } catch (error) {
      console.log(error);
      throw new Error("Ocorreu um erro ao encontrar produto.");
    }
  },
  getAll: async () => {
    try {
      return await Produto.findAll();
    } catch (error) {
      console.log(error);
      throw new Error("Ocorreu um erro ao encontrar produtos.");
    }
  },
  delete: async (id) => {
    try {
      const produto = await Produto.findByPk(id);
      if (!produto) {
        return null;
      }
      await produto.destroy();
      return produto;
    } catch (error) {
      console.log(error);
      throw new Error("Ocorreu um erro ao deletar produto.");
    }
  },
};

module.exports = produtoService;
