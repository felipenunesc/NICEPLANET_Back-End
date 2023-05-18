// Regras do BD


const db = require('../db'); // Chama conexão


const buscarProdutor = () =>{
    return new Promise((aceito, rejeitado) => {
        db.query('SELECT * FROM produtor', (error, results) => {
            if(error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

const buscarPropriedade = () =>{
    return new Promise((aceito, rejeitado) => {
        db.query('SELECT * FROM propriedade', (error, results) => {
            if(error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

const buscaUser = () => {
    return new Promise((aceito, rejeitado) => {
        db.query('SELECT * FROM usuario', (error, results) => {
            if(error) {rejeitado(error); return; }
            aceito(results);
        });
    });
}


// Buscar ID's
const buscaPorIdProdutor = async (id) => {
    return new Promise((aceito, rejeitado) => {
        db.query('SELECT * FROM produtor WHERE idProdutor = ?', [id], (error, results) => {
            if(error) { rejeitado(error); return; }
            if(results.length > 0){
                aceito(results[0]);
            }else{
                aceito(false);
            }
        });
    })
}

const buscaPorIdPropriedade = async (id) => {
    return new Promise((aceito, rejeitado) => {
        db.query('SELECT * FROM propriedade WHERE idPropriedade = ?', [id], (error, results) => {
            if(error) { rejeitado(error); return; }
            if(results.length > 0){
                aceito(results[0]);
            }else{
                aceito(false);
            }
        });
    })
}

const cadastrarProdutor = async (nomeProdutor, cpfProdutor) => {
    const sql = 'INSERT INTO produtor (nomeProdutor, cpfProdutor) VALUES (?, ?)';
    await db.query(sql, [nomeProdutor, cpfProdutor]);
}

const cadastrarPropriedade = async (nomePropriedade, cadastroRural) => {
    const sql = 'INSERT INTO propriedade (nomePropriedade, cadastroRural) VALUES (?, ?)';
    await db.query(sql, [nomePropriedade, cadastroRural]);
}



module.exports = {
    buscarProdutor,
    buscarPropriedade,
    buscaUser,
    buscaPorIdProdutor,
    buscaPorIdPropriedade,
    cadastrarProdutor,
    cadastrarPropriedade
};