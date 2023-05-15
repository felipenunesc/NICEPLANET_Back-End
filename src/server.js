/* Para rodar o servidor*/
require('dotenv').config({path:'variaveis.env'}); // para ler arquivo variaveis
const express = require('express'); // conjunto de recursos e utilitários que simplificam tarefas comuns
const cors = require('cors'); // Para usar recurso de outros sites
const bodyParser = require('body-parser'); // Conversor 

const routes = require('./routes'); // onde estão as rotas

const server = express(); // para controlar o servidor
server.use(cors());
server.use(bodyParser.urlencoded({extended: false}));

server.use('/api', routes); // todos endereços usam /api

server.listen(process.env.PORT, () =>{
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});

/* ----------------------- */

