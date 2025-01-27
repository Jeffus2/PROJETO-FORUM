const postService = require("../service/postService");

const postController = {
  criarPost: async (req, res) => {
    const { titulo, conteudo, usuario_id } = req.body;
    try {
      const post = await postService.criarPost(titulo, conteudo, usuario_id);
      if (post.error) {
        return res.status(500).json({ status: "ERROR", message: post.error });
      }
      res.status(201).json(post);
      console.log(post);
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  },
  timelinePosts: async (req, res) => {
    try {
      const column = req.query.column || "createdAt";
      const order = req.query.order || "DESC";
      const limit = parseInt(req.query.limit) || 10;
      const where = req.query.where ? JSON.parse(req.query.where) : {};
      const page = parseInt(req.query.page) || 1;

      const posts = await postService.timelinePosts(
        column,
        order,
        limit,
        where,
        page
      );
      if (posts.error) {
        return res.status(500).json({ status: "ERROR", message: posts.error });
      }
      res.status(200).json(posts);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  exibirPost: async (req, res) => {
    const { id } = req.params;
    try {
      const post = await postService.exibirPost(id);
      if (post.error) {
        return res.status(500).json({ status: "ERROR", message: post.error });
      }
      res.status(200).json(post);
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  },
  deletarPost: async (req, res) => {
    try {
      const resultado = await postService.deletarPost(req.params.id);
      if (resultado.error) {
        return res
          .status(500)
          .json({ status: "ERROR", message: resultado.error });
      }
      res.status(204).json(resultado);
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  },
  editarPost: async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, conteudo, usuario_id } = req.body;

      const post = await postService.editarPost(
        id,
        titulo,
        conteudo,
        usuario_id
      );
      if (post.error) {
        return res.status(500).json({ status: "ERROR", message: post.error });
      }
      res.status(200).json(post);
      console.log(post);
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  },
  curtirPost: async (req, res) => {
    try {
      const id = req.params.id;
      const usuario_id = req.query.usuario_id;
      const resultado = await postService.curtirPost(id, usuario_id);
      if (!resultado) {
        return res
          .status(500)
          .json({ status: "ERROR", message: "Erro ao curtir post" });
      }
      res.status(200).json({ resultado });
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  },
};

module.exports = postController;
