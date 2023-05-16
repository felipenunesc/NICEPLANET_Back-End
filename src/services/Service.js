// Regras do BD


const db = require('../db'); // Chama conexão


const buscarProdutor = () =>{
    return new Promise((aceito, rejeitado)=> {
        db.query('SELECT * FROM produtor', (error, results)=>{
            if(error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

const buscarPropriedade = () =>{
    return new Promise((aceito, rejeitado)=> {
        db.query('SELECT * FROM propriedade', (error, results)=>{
            if(error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

module.exports = {
    buscarProdutor,
    buscarPropriedade,
};