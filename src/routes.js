// Gerenciar rotas
const express = require('express');
const router = express.Router();

const Controllers = require('./controllers/Controllers');

router.get('/listagem', Controllers.buscarListagem); // Criando rota 

module.exports = router;