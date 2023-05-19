const mysql = require('mysql');

// Criação da conexão com o banco de dados
const connection = mysql.createConnection({
    host: process.env.DB_HOST, // Obtém o host do banco de dados a partir da variável de ambiente
    user: process.env.DB_USER, // Obtém o usuário do banco de dados a partir da variável de ambiente
    password: process.env.DB_PASS, // Obtém a senha do banco de dados a partir da variável de ambiente
    database: process.env.DB_NAME // Obtém o nome do banco de dados a partir da variável de ambiente
});

// Conexão ao banco de dados
connection.connect((error) => {
    if (error) throw error; // Se ocorrer um erro durante a conexão, lança o erro
    console.log(`Conectado ao Banco de Dados: ${process.env.DB_NAME}`); // Exibe uma mensagem indicando que a conexão com o banco de dados foi estabelecida
});

module.exports = connection; // Exporta a conexão para ser utilizada em outros arquivos
