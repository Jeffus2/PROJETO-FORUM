const validator = require("validator");
const Usuario = require("../model/Usuarios");

const postService = require("./postService");
const Post = require("../model/Posts");

const usuarioService = {
  criarUsuario: async ({ nome, email, senha, nickname }) => {
    if (!nome.trim() || !email.trim() || !senha.trim() || !nickname.trim()) {
      return { error: "Preencha todos os campos obrigatorios" };
    }

    if (nome.length < 3 || nickname.length < 3) {
      return {
        error: "Nome ou nickname não atingiu o numero de caracteres minimas",
      };
    }

    if (!validator.isEmail(email)) {
      return { error: "Email invalido" };
    }
    if (
      !validator.isStrongPassword(senha, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 3,
        minSymbols: 1,
      })
    ) {
      return { error: "Senha fraca" };
    }

    if (await Usuario.findOne({ where: { email } })) {
      return { error: "Email já cadastrado" };
    }

    if (await Usuario.findOne({ where: { nickname } })) {
      return { error: "Nickname já cadastrado" };
    }

    try {
      const novoUsuario = await Usuario.create({
        nome,
        email,
        senha,
        nickname,
      });
      if (!novoUsuario) {
        return { error: "Erro ao criar usuario" };
      }
      return novoUsuario;
    } catch (error) {
      return { error: error.message };
    }
  },
  logarUsuario: async (email, senha) => {
    if (!email || !senha) {
      return { error: "Preencha todos os campos obrigatorios" };
    }

    try {
      const usuario = await Usuario.findOne({ where: { email, senha } });
      if (!usuario) {
        return { error: "Usuario não encontrado" };
      }
      if (usuario.senha !== senha) {
        return { error: "Senha incorreta" };
      }
      usuario.qtd_posts = await Post.count({
        where: { usuario_id: usuario.id },
      });
      console.log(qtd_posts);
      return usuario;
    } catch (error) {
      return { error: error.message };
    }
  },
  editarUsuario: async (id, nome, email, senha, nickname, profissao) => {
    if (!nome && !email && !senha && !nickname && !profissao) {
      return { error: "Preencha ao menos um campo para atualizar" };
    }

    if (!(await Usuario.findByPk(id)))
      return { error: "Usuário não encontrado" };
    if (!nome && !email && !senha && !nickname && !profissao) {
      return { error: "Preencha ao menos um campo para atualizar" };
    }

    if ((nome && nome.length < 3) || !validator.isAlpha(nome))
      return { error: "Nome inválido" };

    if (
      !validator.isEmail(
        email
      ) /*||(await Usuario.findOne({ where: { email } }))*/
    )
      return {
        error: "Email invalido",
      };

    if (profissao.length < 1) return { error: "Profissão inválida" };

    if (
      !validator.isStrongPassword(senha, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 3,
        minSymbols: 1,
      })
    )
      return { error: "Senha fraca" };

    if (
      nickname.length < 3 /*||await Usuario.findOne({ where: { nickname } })*/
    )
      return { error: "Nickname invalido" };

    const usuario = await Usuario.findByPk(id);
    try {
      const usuarioAtualizado = await usuario.update({
        nome,
        email,
        senha,
        nickname,
        profissao,
      });

      if (!usuarioAtualizado) return { error: "Erro ao atualizar usuário" };
      return usuarioAtualizado;
    } catch (error) {
      return { error: error.message };
    }
  },
  usuario: async (id) => {
    if (!id) {
      return { error: "Id não informado" };
    }
    try {
      const usuario = {
        dadosUsuario: await Usuario.findByPk(id),
        qtdPosts: await postService.qtdPosts(id),
      };
      if (!usuario) {
        return { error: "Usuário não encontrado" };
      }
      return usuario;
    } catch (error) {
      return { error: error.message };
    }
  },
  uploadAvatar: async (id, file) => {
    if (!id || !avatar) {
      return { error: "Preencha todos os campos" };
    }
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return { error: "Usuário não encontrado" };
      }

      if (usuario) {
        const avatar = file ? file.buffer : usuario.avatar;
        await user.update({ avatar });
      }
      return usuario;
    } catch (error) {
      return { error: error.message };
    }
  },
  deletarUsuario: async (id) => {
    const deletar = await Usuario.destroy({ where: { id } });
    if (!deletar) {
      return { error: "Erro ao deletar usuário" };
    }
    return deletar;
  },
  obterUsuario: async (email) => {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return { error: "Usuário não encontrado" };
    }
    usuario.dataValues.qtd_posts = await postService.qtdPosts(usuario.id);
    console.log(usuario);
    return usuario;
  },
};

module.exports = usuarioService;
