const express = require("express");
const postController = require("../controller/postController.js");
const verifyJWT = require("../middleware/auth.js");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Endpoints para gerenciar posts
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Criar um novo post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Título do Post
 *               conteudo:
 *                 type: string
 *                 example: Conteúdo do post...
 *               usuario_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Post criado com sucesso
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
router.post("/", postController.criarPost);

/**
 * @swagger
 * /posts/{id}/curtir:
 *   post:
 *     summary: Incrementar curtidas de um post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do post
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Curtida incrementada com sucesso
 *       400:
 *         description: Erro ao incrementar curtida
 */
router.post("/:id/curtir", postController.curtirPost);

/**
 * @swagger
 * /posts/timeline:
 *   get:
 *     summary: Obter todos os posts da timeline
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: column
 *         required: false
 *         schema:
 *           type: string
 *         description: Coluna para ordenar os posts
 *       - in: query
 *         name: order
 *         required: false
 *         schema:
 *           type: string
 *         description: Ordem dos posts (ASC ou DESC)
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *         description: Quantidade de posts por página
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *         description: Número da página para paginação
 *       - in: query
 *         name: where
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtro adicional para os posts
 *     responses:
 *       200:
 *         description: Lista de posts com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   titulo:
 *                     type: string
 *                   conteudo:
 *                     type: string
 *                   usuario_id:
 *                     type: integer
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Erro ao buscar posts
 */
router.get("/timeline", postController.timelinePosts);
/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Exibir post específico
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do post
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post encontrado com sucesso
 *       400:
 *         description: Post não encontrado
 */
router.get("/:id", postController.exibirPost);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Editar post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do post
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Novo Título
 *               conteudo:
 *                 type: string
 *                 example: Novo conteúdo do post...
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar post
 */
router.put("/:id", verifyJWT, postController.editarPost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Deletar post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do post
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post deletado com sucesso
 *       400:
 *         description: Erro ao deletar post
 */
router.delete("/:id", verifyJWT, postController.deletarPost);

module.exports = router;
