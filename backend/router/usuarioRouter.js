const express = require("express");
const usuarioController = require("../controller/usuarioController.js");
const multer = require("multer");
const verifyJWT = require("../middleware/auth.js");

const router = express.Router();
const upload = multer();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints para gerenciar usuários
 */

/**
 * @swagger
 * /usuarios/cadastrar:
 *   post:
 *     summary: Cadastrar um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               senha:
 *                 type: string
 *                 example: SenhaForte123!
 *               nickname:
 *                 type: string
 *                 example: joaozinho
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 id:
 *                   type: integer
 *                 example:
 *                   status: OK
 *                   id: 1
 *       400:
 *         description: Erro de validação
 */
router.post("/cadastrar", usuarioController.criarUsuario);

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Login de usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               senha:
 *                 type: string
 *                 example: SenhaForte123!
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuario:
 *                   type: object
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", usuarioController.logarUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obter informações de um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Retorna os dados do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 usuario:
 *                   type: object
 *       400:
 *         description: Usuário não encontrado
 */
router.get("/:id", usuarioController.usuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Editar informações de um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João Atualizado
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               senha:
 *                 type: string
 *                 example: NovaSenha123!
 *               nickname:
 *                 type: string
 *                 example: joaozinho123
 *               profissao:
 *                 type: string
 *                 example: Engenheiro
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Erro na atualização
 */
router.put("/:id", verifyJWT, usuarioController.editarUsuario);

/**
 * @swagger
 * /usuarios/{id}/avatar:
 *   put:
 *     summary: Atualizar avatar do usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar avatar
 */
router.put(
  "/:id/avatar",
  upload.single("avatar"),
  verifyJWT,
  usuarioController.uploadAvatar
);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Deletar usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       400:
 *         description: Erro ao deletar usuário
 */
router.delete("/:id", verifyJWT, usuarioController.deletarUsuario);

module.exports = router;
