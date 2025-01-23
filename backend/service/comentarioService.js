const Comentario = require("../model/Comentarios");
const Usuarios = require("../model/Usuarios");

const comentarioService = {
  criarComentario: async (titulo, conteudo, usuario_id, post_id) => {
    const comentario = await Comentario.create({
      titulo,
      conteudo,
      usuario_id,
      post_id,
    });
    return comentario;
  },
  curtirComentario: async (id) => {
    const comentario = await Comentario.findByPk(id);
    if (comentario) {
      comentario.qtd_curtidas += 1;
      comentario.save();
      return comentario;
    }
    return null;
  },
  timelineComentarios: async (post_id, columm, order, page) => {
    const offset = (page - 1) * 10;

    try {
      const comentarios = await Comentario.findAll({
        order: [[columm, order]],
        limit: 10,
        offset: offset,
        where: post_id,
        include: [
          {
            model: Usuarios,
            attributes: ["nickname", "avatar"],
          },
        ],
      });

      return comentarios;
    } catch (error) {
      return { error: error };
    }
  },
  deletarComentario: async (id) => {
    const deletar = await Comentario.destroy({ where: { id } });
    if (!deletar) {
      return { error: "Erro ao deletar comentario" };
    }
    return deletar;
  },
};

module.exports = comentarioService;
