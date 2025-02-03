const comentarioService = require("../service/comentarioService");

const comentarioController = {
  criarComentario: async (req, res) => {
    const {  conteudo, usuario_id, post_id } = req.body;

    try {
      const comentario = await comentarioService.criarComentario(
        conteudo,
        usuario_id,
        post_id
      );
      console.log(comentario);
      if (comentario.error) {
        return res
          .status(500)
          .json({ status: "ERROR", message: comentario.error });
      }
      res.status(201).json(comentario);
      console.log(comentario);
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  },
  curtirComentario: async (req, res) => {
    try {
      const resultado = await comentarioService.curtirComentario(
        req.params.id,
        req.query.usuario_id
      );
      if (!resultado) {
        return res
          .status(500)
          .json({ status: "ERROR", message: "Erro ao curtir comentário" });
      }
      res.status(204).json(resultado);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  timelineComentarios: async (req, res) => {
    try {
      const post_id = req.params.id;
      const columm = req.query.columm || createdAt;
      const order = req.query.order || DESC;
      const page = parseInt(req.query.page) || 1;

      const comentarios = await comentarioService.timelineComentarios(
        post_id,
        columm,
        order,
        page
      );
      if (comentarios.error) {
        return res
          .status(500)
          .json({ status: "ERROR", message: comentarios.error });
      }
      res.status(200).json(comentarios);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  deletarComentario: async (req, res) => {
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ error: "envie todos os campos obrigatorios" });
    const resultado = await comentarioService.deletarComentario(id);

    if (!resultado || resultado.error)
      return res.status(400).json(resultado.error);

    res.status(200).json({ mensagem: "excluido com sucesso" });
  },
};

module.exports = comentarioController;
