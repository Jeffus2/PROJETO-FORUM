const { where } = require("sequelize");
const Posts = require("../model/Posts");
const Usuarios = require("../model/Usuarios");
const Curtidas = require("../model/Curtidas");
const validator = require("validator");

const postService = {
  criarPost: async (titulo, conteudo, usuario_id) => {
    if (!titulo || !conteudo || !usuario_id) {
      return { error: "Preencha todos os campos" };
    }
    if (!titulo.trim() || !conteudo.trim()) {
      return { error: "Preencha todos os campos" };
    }

    if (typeof titulo !== "string" || typeof conteudo !== "string") {
      return { error: "Tipo de dado inválido" };
    }

    if (titulo.length < 3 || conteudo.length < 10)
      return { error: "Tamanho mínimo de caracteres não atingido" };

    if (titulo.length > 100 || conteudo.length > 500)
      return { error: "Tamanho máximo de caracteres excedido" };

    const usuario = await Usuarios.findByPk(usuario_id);
    if (!usuario) {
      return { error: "Usuário não encontrado" };
    }
    try {
      const novoPost = await Posts.create({
        titulo,
        conteudo,
        usuario_id,
      });
      if (!novoPost) {
        return { error: "Erro ao criar post" };
      }
      return novoPost;
    } catch (error) {
      return { error: error.message };
    }
  }, //[timeline] "/" | GET: param(filtro) | 200: {[]} (posts, apelido e avatar do usuario)
  timelinePosts: async (column, order, limit = 10, where, page) => {
    const offset = (page - 1) * 10;
    const filtro = !where ? null : (where = { usuario_id: where });
    try {
      const posts = await Posts.findAll({
        order: [[column, order]],
        limit: limit,
        offset: offset,
        where: filtro,
        include: [
          {
            model: Usuarios,
            attributes: ["nickname", "avatar"],
          },
        ],
      });
      return posts;
    } catch (error) {
      return { error: error.message };
    }
  },
  editarPost: async (id, titulo, conteudo, usuario_id) => {
    const post = await Posts.findByPk(id);

    if (!titulo && !conteudo) {
      return { error: "Preencha ao menos um campo para atualizar" };
    }

    if (!(await Posts.findByPk(id))) return { error: "Post não encontrado" };

    if (!titulo && !conteudo && !usuario_id) {
      return { error: "Preencha ao menos um campo para atualizar" };
    }

    if (titulo.length < 3) return { error: "Titulo inválido" };

    if (conteudo.length < 10) return { error: "Conteudo inválido" };

    if (titulo.length > 100 || conteudo.length > 500)
      return { error: "Tamanho máximo de caracteres excedido" };

    const usuario = await Usuarios.findOne();
    if (!usuario) {
      return { error: "Usuário não encontrado" };
    }

    if (post.usuario_id !== usuario_id)
      return { error: "Usuário não autorizado" };

    try {
      const post = await Posts.update({ titulo, conteudo }, { where: { id } });
      if (!post) {
        return { error: "Erro ao atualizar post" };
      }
      return post;
    } catch (error) {
      return { error: error.message };
    }
  },
  exibirPost: async (id) => {
    if (!id) return { error: "id invalido" };
    try {
      const post = await Posts.findOne({
        where: { id: id },
        include: {
          model: Usuarios,
          attributes: ["nickname", "avatar"],
        },
      });
      return post;
    } catch (error) {
      return { error: "erro ao exibir post" };
    }
  },
  curtirPost: async (id, usuario_id) => {
    console.log(id, usuario_id);
    try {
      const post = await Posts.findByPk(id);
      console.log(post);
      if (!post) {
        return { error: "Post não encontrado" };
      }
      const curtida = await Curtidas.findOne({
        where: { tipo: "post", referencia_id: id, usuario_id: usuario_id },
      });
      if (curtida) {
        await curtida.destroy();
        post.qtd_curtidas -= 1;
        await post.save();
        return post;
      }
      await Curtidas.create({
        tipo: "post",
        referencia_id: id,
        usuario_id: usuario_id,
      });
      post.qtd_curtidas += 1;
      await post.save();
      return post;
    } catch (error) {
      return { error };
    }
  },
  deletarPost: async (id) => {
    try {
      const deletar = await Posts.destroy({ where: { id } });
      return deletar;
    } catch (error) {
      return { error: error };
    }
  },
  qtdPosts: async (usuario_id) => {
    if (!usuario_id) {
      return { error: "Preencha todos os campos" };
    }
    const usuario = await Usuarios.findByPk(usuario_id);
    if (!usuario) {
      return { error: "Usuário não encontrado" };
    }
    try {
      const accPostsUsuario = await Posts.count({ where: { usuario_id } });

      return accPostsUsuario;
    } catch (error) {
      return { error: error.message };
    }
  },
};

module.exports = postService;
