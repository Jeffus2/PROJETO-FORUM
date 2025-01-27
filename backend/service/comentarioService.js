const Comentario = require("../model/Comentarios");
const Usuarios = require("../model/Usuarios");
const Curtidas = require("../model/Curtidas");

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
  curtirComentario: async (id, usuario_id) => {
    try {
      const comentario = await Comentario.findByPk(id);
      if (!comentario) {
        return null;
      }
      const curtida = await Curtidas.findOne({
        where: {
          tipo: "comentario",
          referencia_id: id,
          usuario_id: usuario_id,
        },
      });
      if (curtida) {
        await curtida.destroy();
        comentario.qtd_curtidas -= 1;
        await comentario.save();
        return comentario;
      }
      await Curtidas.create({
        tipo: "comentario",
        referencia_id: id,
        usuario_id: usuario_id,
      });
      comentario.qtd_curtidas += 1;
      await comentario.save();
      return comentario;
    } catch (error) {
      return { error };
    }
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
