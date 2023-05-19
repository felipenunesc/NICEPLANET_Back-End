const Service = require('../services/Service'); // Importa o módulo de serviços

const buscaUser = async () => {
    let usuarios = await Service.buscaUser(); // Chama a função de serviço "buscaUser()" para obter a lista de usuários
    let jsonUser = usuarios.map(usuario => ({
        user: usuario.nomeUsuario,
        password: usuario.senhaUsuario
    })); // Converte a lista de usuários em um novo formato JSON, mantendo apenas os campos "nomeUsuario" e "senhaUsuario"
    return jsonUser; // Retorna a lista de usuários no formato JSON
}

const buscaPorIdProdutor = async (id) => {
    try {
        const result = await Service.buscaPorIdProdutor(id); // Chama a função de serviço "buscaPorIdProdutor()" passando o ID do produtor para obter informações específicas do produtor
        return result; // Retorna as informações do produtor encontradas
    } catch (error) {
        throw error; // Se ocorrer um erro durante a busca, lança o erro
    }
}

const buscaPorIdPropriedade = async (id) => {
    try {
        const result = await Service.buscaPorIdPropriedade(id); // Chama a função de serviço "buscaPorIdPropriedade()" passando o ID da propriedade para obter informações específicas da propriedade
        return result; // Retorna as informações da propriedade encontradas
    } catch (error) {
        throw error; // Se ocorrer um erro durante a busca, lança o erro
    }
}

const cadastro = async (req, res) => {
    let json = { error: '', result: {} };

    let nomeProdutor = req.body.nomeProdutor;
    let cpfProdutor = req.body.cpfProdutor;

    if (nomeProdutor && cpfProdutor) {
        let idProdutor = await Service.cadastro(nomeProdutor, cpfProdutor); // Chama a função de serviço "cadastro()" passando o nome e o CPF do produtor para realizar o cadastro
        json.result = {
            id: idProdutor,
            nomeProdutor,
            cpfProdutor
        }; // Armazena as informações do produtor cadastrado no objeto JSON de resultado
    } else {
        json.error = "Campos não enviados!"; // Se não forem enviados o nome e o CPF do produtor, armazena uma mensagem de erro no objeto JSON
    }
}

module.exports = {
    buscaUser,
    buscaPorIdProdutor,
    buscaPorIdPropriedade,
    cadastro
};
