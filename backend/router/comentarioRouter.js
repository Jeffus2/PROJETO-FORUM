const express = require("express");
const comentarioController = require("../controller/comentarioController");
const verifyJWT = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comentários
 *   description: Endpoints para gerenciar comentários
 */

/**
 * @swagger
 * /comentarios:
 *   post:
 *     summary: Criar um novo comentário
 *     tags: [Comentários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Excelente post!"
 *               conteudo:
 *                 type: string
 *                 example: "Muito bom, gostei bastante do conteúdo!"
 *               usuario_id:
 *                 type: integer
 *                 example: 1
 *               post_id:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Comentário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 titulo:
 *                   type: string
 *                 conteudo:
 *                   type: string
 *                 usuario_id:
 *                   type: integer
 *                 post_id:
 *                   type: integer
 *       400:
 *         description: Erro ao criar comentário
 */
router.post("/", verifyJWT, comentarioController.criarComentario);
/**
 * @swagger
 * /comentarios/{id}/curtir:
 *   post:
 *     summary: Curtir um comentário
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do comentário
 *     responses:
 *       204:
 *         description: Comentário curtido com sucesso
 *       400:
 *         description: Erro ao curtir comentário
 */
router.post("/:id/curtir", verifyJWT, comentarioController.curtirComentario);
/**
 * @swagger
 * /comentarios/{post_id}:
 *   get:
 *     summary: Obter comentários de um post específico
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post
 *       - in: query
 *         name: columm
 *         schema:
 *           type: string
 *           default: createdAt
 *         description: Coluna para ordenação
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           default: DESC
 *         description: Ordem da ordenação (ASC/DESC)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página para paginar
 *     responses:
 *       200:
 *         description: Lista de comentários do post
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
 *                   post_id:
 *                     type: integer
 *                   qtd_curtidas:
 *                     type: integer
 *       400:
 *         description: Erro ao listar comentários
 */
router.get("/:post_id", verifyJWT, comentarioController.timelineComentarios);
/**
 * @swagger
 * /comentarios/{id}:
 *   delete:
 *     summary: Deletar um comentário
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do comentário
 *     responses:
 *       200:
 *         description: Comentário deletado com sucesso
 *       400:
 *         description: Erro ao deletar comentário
 */
router.delete("/:id", verifyJWT, comentarioController.deletarComentario);

module.exports = router;
