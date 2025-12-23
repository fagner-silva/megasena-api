const express = require("express");
const Game = require("../models/Game");
const Draw = require("../models/Draw");

const router = express.Router();

function countHits(gameNumbers, drawNumbers) {
  const drawSet = new Set(drawNumbers);
  return gameNumbers.reduce((acc, n) => acc + (drawSet.has(n) ? 1 : 0), 0);
}

/**
 * @swagger
 * /results/latest:
 *   get:
 *     summary: Compara todos os jogos com o último sorteio e retorna contemplados (4/5/6)
 *     tags: [Results]
 *     responses:
 *       200: { description: Resultado da comparação }
 *       404: { description: Nenhum sorteio cadastrado }
 */


// Compara com o último sorteio
router.get("/latest", async (_req, res) => {
  const draw = await Draw.findOne().sort({ createdAt: -1 });
  if (!draw) return res.status(404).json({ message: "Nenhum sorteio cadastrado" });

  const games = await Game.find();
  const winners = { hits4: [], hits5: [], hits6: [] };

  for (const game of games) {
    const hits = countHits(game.numbers, draw.numbers);
    if (hits === 4) winners.hits4.push({ game, hits });
    if (hits === 5) winners.hits5.push({ game, hits });
    if (hits === 6) winners.hits6.push({ game, hits });
  }

  res.json({
    draw,
    totals: {
      hits4: winners.hits4.length,
      hits5: winners.hits5.length,
      hits6: winners.hits6.length,
    },
    winners,
  });
});

module.exports = router;
