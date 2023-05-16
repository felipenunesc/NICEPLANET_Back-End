const Service = require('../services/Service');

// Modulo para buscar todos
module.exports = {
    buscarListagem: async (req, res) => {
        let json = {error:'', result:[]};

        let produtor = await Service.buscarProdutor();
        let propriedade = await Service.buscarPropriedade();

        for(let i in produtor){
            json.result.push({
                nomeProdutor: produtor[i].nomeProdutor,
                cpf: produtor[i].cpfProdutor
            });   
        }
        for(let i in propriedade){
            json.result.push({
                nomePropriedade: propriedade[i].nomePropriedade,
                cadastroRural: propriedade[i].cadastroRural
            });
        }
        res.json(json);
    }
};