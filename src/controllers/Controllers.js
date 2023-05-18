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

// Modulo para buscar user ou/e propriedades
const buscaPorIdProdutor = async (id) => {
    try {
        const result = await Service.buscaPorIdProdutor(id);
        return result;
    } catch (error) {
        throw error;
    }
}

const buscaPorIdPropriedade = async (id) => {
    try {
        const result = await Service.buscaPorIdPropriedade(id);
        return result;
    } catch (error) {
        throw error;
    }
}

const cadastro = async (req,res) => {
    let json = {error:'', result:{}};

    let nomeProdutor = req.body.nomeProdutor;
    let cpfProdutor = req.body.cpfProdutor;

    if (nomeProdutor && cpfProdutor) {
        let idProdutor = await Service.cadastro(nomeProdutor, cpfProdutor);
        json.result = {
            id: idProdutor,
            nomeProdutor,
            cpfProdutor 
        };
    }else{
        json.error = "Campos não enviados!";
    }
}


module.exports = {
    buscarListagem,
    buscaUser,
    buscaPorIdProdutor,
    buscaPorIdPropriedade,
    cadastro
};