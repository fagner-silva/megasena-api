const express = require("express");
const Game = require("../models/Game");
const { gameSchema } = require("../validators/mega.validators");

const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       required: [description, numbers]
 *       properties:
 *         _id: { type: string }
 *         description: { type: string, example: "Jogo do Fagner" }
 *         numbers:
 *           type: array
 *           items: { type: integer, minimum: 1, maximum: 60 }
 *           example: [1,2,3,4,5,6]
 *         createdAt: { type: string }
 *         updatedAt: { type: string }
 *
 * /games:
 *   post:
 *     summary: Cadastra um jogo (6 a 20 dezenas)
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [description, numbers]
 *             properties:
 *               description: { type: string }
 *               numbers:
 *                 type: array
 *                 items: { type: integer, minimum: 1, maximum: 60 }
 *     responses:
 *       201:
 *         description: Jogo criado
 *   get:
 *     summary: Lista todos os jogos
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: Lista de jogos
 *
 * /games/{id}:
 *   put:
 *     summary: Atualiza um jogo
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [description, numbers]
 *             properties:
 *               description: { type: string }
 *               numbers:
 *                 type: array
 *                 items: { type: integer, minimum: 1, maximum: 60 }
 *     responses:
 *       200: { description: Jogo atualizado }
 *       404: { description: Jogo não encontrado }
 *   delete:
 *     summary: Remove um jogo
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Removido }
 *       404: { description: Jogo não encontrado }
 */



// CREATE
router.post("/", async (req, res) => {
  const parsed = gameSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.flatten() });

  const game = await Game.create(parsed.data);
  res.status(201).json(game);
});

// READ ALL
router.get("/", async (_req, res) => {
  const games = await Game.find().sort({ createdAt: -1 });
  res.json(games);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const parsed = gameSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.flatten() });

  const updated = await Game.findByIdAndUpdate(req.params.id, parsed.data, { new: true });
  if (!updated) return res.status(404).json({ message: "Jogo não encontrado" });

  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  const deleted = await Game.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Jogo não encontrado" });

  res.status(204).send();
});

module.exports = router;
