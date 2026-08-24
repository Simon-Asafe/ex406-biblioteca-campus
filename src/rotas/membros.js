const express = require("express");
const { error } = require("node:console");

const router = express.Router();

// ─── Tarefa B — Membros ───────────────────────────────────────────────────────

const membros = [{"id": 0, "nome": "Fulano", "matricula": "123456"}];
let proximoId = 1;


router.get("/", (req, res) => {


  res.status(200).json(membros)
});


router.post("/", (req, res) => {

  const novomembro = req.body
  if((novomembro && novomembro.nome) || (novomembro && novomembro.matricula)){
    res.status(400).json({erro:"matricula ou nome vazio"})
  } else {
    membros[proximoId] = novomembro
    proximoId++
  }
res.status(200).json({erro:"membro adicionado"})

});

module.exports = router;
