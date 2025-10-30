const produtoService = require("../services/produtoService.js");

const produtoController = {
  create: async (req, res) => {
    try {
      // Se estiver usando multer:

      const imagem = req.file ? req.file.filename : null;

      // Junta req.body com o nome do arquivo

      const produtoData = { ...req.body, imagem };

      const produto = await produtoService.create(produtoData);

      return res.status(201).json({
        msg: "Produto criado com sucesso.",

        produto: produto,
      });
    } catch (error) {
      console.log("Erro ao criar produto:", error);

      return res.status(500).json({
        msg: "Erro no servidor.",
      });
    }
  },
  update: async (req, res) => {
    try {
      const produto = await produtoService.update(req.params.id, req.body);

      if (!produto) {
        return res.status(400).json({
          msg: "Produto nao encontrado",
        });
      }
      return res.status(200).json({
        msg: "Produto atualizado com sucesso",
        produto: produto,
      });
    } catch (error) {
      console.log("Erro ao atualizar o produto:", error);
      return res.status(500).json({
        msg: "Erro no servidor.",
      });
    }
  },
  delete: async (req, res) => {
    try {
      const produto = await produtoService.delete(req.params.id);
      if (!produto) {
        return res.status(400).json({
          msg: "produto nao encontrado",
        });
      }
      return res.status(200).json({
        msg: "produto deletado com sucesso!",
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Ocorreu um erro no servidor",
      });
    }
  },
  getOne: async (req, res) => {
    try {
      const produto = await produtoService.getById(req.params.id);
      return res.status(200).json({
        msg: "Produto encontrado!",
        produto,
      });
    } catch (error) {
      console.log("Erro ao visualizar o produto:", error);
      return res.status(500).json({
        msg: "Erro no servidor.",
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const produtos = await produtoService.getAll();
      return res.status(200).json({
        msg: "Todos os produtos.",
        produtos: produtos,
      });
    } catch (error) {
      console.log("Erro ao visualizar os produtos:", error);
      return res.status(500).json({
        msg: "Erro no servidor.",
      });
    }
  },
};

module.exports = produtoController;
