// conexão com Banco de Dados

const mysql = require('mysql'); //Chamando dependencia mysql

const connection = mysql.createConnection({
    //Parametros para conectar com BD
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// error
connection.connect((error)=>{
    if(error) throw error; //mostra error
    console.log(`Conectado ao Banco de Dados: ${process.env.DB_NAME}`) // deu certo!
});

module.exports = connection;