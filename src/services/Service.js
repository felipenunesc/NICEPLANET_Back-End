const db = require('../db'); // Importa a conexão com o banco de dados

const buscaUser = () => {
    return new Promise((aceito, rejeitado) => {
        // Consulta todos os registros da tabela "usuario" no banco de dados
        db.query('SELECT * FROM usuario', (error, results) => {
            if (error) {
                rejeitado(error); // Se ocorrer um erro na consulta, rejeita a promessa com o erro
                return;
            }
            aceito(results); // Caso contrário, aceita a promessa e retorna os resultados da consulta
        });
    });
}

const buscaPorIdProdutor = async (id) => {
    return new Promise((aceito, rejeitado) => {
        // Consulta um registro da tabela "produtor" no banco de dados com base no idProdutor fornecido
        db.query('SELECT * FROM produtor WHERE idProdutor = ?', [id], (error, results) => {
            if (error) {
                rejeitado(error); // Se ocorrer um erro na consulta, rejeita a promessa com o erro
                return;
            }
            if (results.length > 0) {
                aceito(results[0]); // Se houver resultados, aceita a promessa e retorna o primeiro resultado
            } else {
                aceito(false); // Caso contrário, aceita a promessa e retorna false para indicar que nenhum registro foi encontrado
            }
        });
    })
}

const buscaPorIdPropriedade = async (id) => {
    return new Promise((aceito, rejeitado) => {
        // Consulta um registro da tabela "propriedade" no banco de dados com base no idPropriedade fornecido
        db.query('SELECT * FROM propriedade WHERE idPropriedade = ?', [id], (error, results) => {
            if (error) {
                rejeitado(error); // Se ocorrer um erro na consulta, rejeita a promessa com o erro
                return;
            }
            if (results.length > 0) {
                aceito(results[0]); // Se houver resultados, aceita a promessa e retorna o primeiro resultado
            } else {
                aceito(false); // Caso contrário, aceita a promessa e retorna false para indicar que nenhum registro foi encontrado
            }
        });
    })
}

const cadastrarProdutor = async (nomeProdutor, cpfProdutor) => {
    // Insere um novo registro na tabela "produtor" no banco de dados com os valores fornecidos
    const sql = 'INSERT INTO produtor (nomeProdutor, cpfProdutor) VALUES (?, ?)';
    await db.query(sql, [nomeProdutor, cpfProdutor]);
}

const cadastrarPropriedade = async (nomePropriedade, cadastroRural) => {
    // Insere um novo registro na tabela "propriedade" no banco de dados com os valores fornecidos
    const sql = 'INSERT INTO propriedade (nomePropriedade, cadastroRural) VALUES (?, ?)';
    await db.query(sql, [nomePropriedade, cadastroRural]);
}

module.exports = {
    buscaUser,
    buscaPorIdProdutor,
    buscaPorIdPropriedade,
    cadastrarProdutor,
    cadastrarPropriedade
};
