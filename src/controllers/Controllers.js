const Service = require('../services/Service');

// Modulo para buscar propriedades e proprietario
const buscarListagem = async (req, res) => {
    let jsonLista = { error: '', produtor: [], propriedade: [] };
    let produtor = await Service.buscarProdutor();
    let propriedade = await Service.buscarPropriedade();

    for (let i in produtor) {
        jsonLista.produtor.push({
            nomeProdutor: produtor[i].nomeProdutor,
            cpf: produtor[i].cpfProdutor
        });
    }
    for (let i in propriedade) {
        jsonLista.propriedade.push({
            nomePropriedade: propriedade[i].nomePropriedade,
            cadastroRural: propriedade[i].cadastroRural
        });
    }
    res.json(jsonLista);
}

// Modulo para buscar usuarios
const buscaUser = async () => {
    let usuarios = await Service.buscaUser();
    let jsonUser = usuarios.map(usuario => ({
        user: usuario.nomeUsuario,
        password: usuario.senhaUsuario
    }));
    return jsonUser;
}



module.exports = {
    buscarListagem,
    buscaUser
};