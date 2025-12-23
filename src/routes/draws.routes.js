const express = require("express");
const Draw = require("../models/Draw");
const { drawSchema } = require("../validators/mega.validators");

const router = express.Router();

/**
 * @swagger
 * /draws:
 *   post:
 *     summary: Cadastra um sorteio (exatamente 6 dezenas)
 *     tags: [Draws]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [numbers]
 *             properties:
 *               numbers:
 *                 type: array
 *                 items: { type: integer, minimum: 1, maximum: 60 }
 *                 example: [1,2,3,10,20,60]
 *     responses:
 *       201: { description: Sorteio cadastrado }
 *
 * /draws/latest:
 *   get:
 *     summary: Retorna o último sorteio cadastrado
 *     tags: [Draws]
 *     responses:
 *       200: { description: Último sorteio }
 *       404: { description: Nenhum sorteio cadastrado }
 */


// Cadastrar sorteio (guarda histórico)
router.post("/", async (req, res) => {
  const parsed = drawSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.flatten() });

  const draw = await Draw.create(parsed.data);
  res.status(201).json(draw);
});

// Pegar o último sorteio
router.get("/latest", async (_req, res) => {
  const latest = await Draw.findOne().sort({ createdAt: -1 });
  if (!latest) return res.status(404).json({ message: "Nenhum sorteio cadastrado" });
  res.json(latest);
});

module.exports = router;
