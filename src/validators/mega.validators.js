const { z } = require("zod");

const numbersSchema = z
  .array(z.number().int().min(1).max(60))
  .refine((arr) => new Set(arr).size === arr.length, "Números duplicados");

const gameSchema = z.object({
  description: z.string().min(1),
  numbers: numbersSchema.refine((arr) => arr.length >= 6 && arr.length <= 20, "Jogo deve ter 6 a 20 dezenas"),
});

const drawSchema = z.object({
  numbers: numbersSchema.refine((arr) => arr.length === 6, "Sorteio deve ter exatamente 6 dezenas"),
});

module.exports = { gameSchema, drawSchema };
