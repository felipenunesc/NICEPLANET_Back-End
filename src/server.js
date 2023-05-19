const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

require('dotenv').config({path:'variaveis.env'}); // para ler arquivo variaveis
const express = require('express'); // conjunto de recursos e utilitários que simplificam tarefas comuns
const cors = require('cors'); // Para usar recurso de outros sites
const bodyParser = require('body-parser'); // Conversor 


const routes = require('./routes'); // onde estão as rotas

const server = express(); 
server.use(cors());
server.use(bodyParser.urlencoded({extended: false})); //  analisar e lidar com dados enviados

server.use('/', routes);

// Rota para vizualisar documentação no swagger
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Ler uma porta específica
server.listen(process.env.PORT, () =>{
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
}); 