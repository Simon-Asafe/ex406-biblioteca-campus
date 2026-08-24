const express = require("express");

const router = express.Router();

// ─── Tarefa C — Sugestões de compra + votação ─────────────────────────────────

// Armazenamento EM MEMÓRIA (não use banco de dados neste trabalho).
const sugestoes = [];

let proximoId = 1;

// GET /sugestoes — lista as sugestões, cada uma com sua contagem de votos.
router.get("/", (req, res) => {
  try {
    return res.status(200).json(sugestoes);
  } catch (erro) {
    return res.status(500).json({
      erro: erro.message
    });
  }
});

// POST /sugestoes — cria uma sugestão { titulo } (TEXTO), começando com 0 votos.
router.post("/", (req, res) => {
  try {
    const { titulo } = req.body;
    if (!titulo || typeof titulo !== "string") {
      return res.status(400).json({
        erro: "Título é obrigatório e deve ser um texto"
      });
    }

    const sugestao = {
      id: proximoId++,
      titulo: titulo,
      votos: 0
    };

    sugestoes.push(sugestao);

    return res.status(201).json(sugestao);
  } catch (erro) {
    return res.status(400).json({
      erro: erro.message
    });
  }
});

// POST /sugestoes/voto — registra um voto na sugestão de id informado { id }.
router.post("/voto", (req, res) => {
  try {
    const id = Number(req.body.id);

    const sugestao = sugestoes.find((item) => item.id === id);

    if (!sugestao) {
      return res.status(400).json({
        erro: "Sugestão não encontrada"
      });
    }

    sugestao.votos++;

    return res.status(200).json(sugestao);
  } catch (erro) {
    return res.status(400).json({
      erro: erro.message
    });
  }
});

module.exports = router;