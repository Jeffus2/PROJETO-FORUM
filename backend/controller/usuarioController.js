const usuarioService = require("../service/usuarioService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dontenv = require("dotenv");

dontenv.config();

const JWTSecret = process.env.JWT_SECRET_CONTROLLER;

const usuarioController = {
  criarUsuario: async (req, res) => {
    try {
      const senhaCriptografada = await bcrypt.hash(req.body.senha, 10);
      const resultado = await usuarioService.criarUsuario({
        ...req.body,
        senha: senhaCriptografada,
      });
      if (resultado.error) {
        return res
          .status(500)
          .json({ status: "ERROR", message: resultado.error });
      }
      res.status(201).json({ status: "OK", id: resultado });
    } catch (error) {
      res.status(400).json({ status: "ERROR", message: error });
    }
  },

  logarUsuario: async (req, res) => {
    try {
      const { email, senha } = req.body;
      const usuario = await usuarioService.obterUsuario(email);
      const compararSenhas = await bcrypt.compare(senha, usuario.senha);

      if (usuario && compararSenhas) {
        const token = jwt.sign({ id: usuario.id }, JWTSecret, {
          expiresIn: "1h",
        });
        return res.status(200).json({ usuario, token });
      } else {
        return res.status(401).json({ message: "email ou senha invalido" });
      }
    } catch (error) {
      res.status(400).json({ status: "ERROR", message: resultado.error });
    }
  },
  editarUsuario: async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, nickname, profissao } = req.body;

    const resultado = await usuarioService.editarUsuario(
      id,
      nome,
      email,
      senha,
      nickname,
      profissao
    );
    console.log(resultado);
    if (resultado.error)
      return res
        .status(400)
        .json({ status: "ERROR", message: resultado.error });

    res.status(200).json({ status: "OK", id: resultado.id });
  },
  usuario: async (req, res) => {
    const { id } = req.params;
    const resultado = await usuarioService.usuario(id);

    if (resultado.error)
      return res
        .status(400)
        .json({ status: "ERROR", message: resultado.error });

    res.status(200).json({ status: "OK", usuario: resultado });
  },
  uploadAvatar: async (req, res) => {
    const resultado = await usuarioService.uploadAvatar(
      req.params.id,
      req.file.filename
    );

    if (resultado.error)
      return res
        .status(400)
        .json({ status: "ERROR", message: resultado.error });

    res.status(200).json({ status: "OK", id: resultado });
  },
  deletarUsuario: async (req, res) => {
    const { id } = req.params;
    const resultado = await usuarioService.deletarUsuario(id);

    if (resultado.error)
      return res
        .status(400)
        .json({ status: "ERROR", message: resultado.error });

    res.status(200).json({ status: "OK", id: resultado });
  },
};
module.exports = usuarioController;
