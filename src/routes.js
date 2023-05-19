// Gerenciar rotas
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const Controllers = require('./controllers/Controllers');

const { cadastrarProdutor, cadastrarPropriedade } = require('./services/Service');


router.use(bodyParser.json());

// Rota publica
router.get('/', async (req, res)=>{
    res.json({ message: "Tudo ok por aqui!" });
});

// verificar JWT
const SECRET = 'felipetools'; // Chave secreta utilizada para assinar e verificar o JWT

const blacklist = [];

const verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token']; // Obtém o token do cabeçalho da requisição

    const index = blacklist.findIndex(item => item === token); // Verifica se o token está na lista negra (blacklist)
    if(index !== -1) return res.status(401).end(); // Se o token estiver na lista negra, retorna status 401 (Não autorizado) e encerra a requisição

    jwt.verify(token, SECRET, (err, decoded) => { // Verifica a validade e integridade do token JWT utilizando a chave secreta
        if(err) return res.status(401).end(); // Se houver um erro na verificação, retorna status 401 (Não autorizado) e encerra a requisição

        req.userId = decoded.userId; // Se o token for válido, extrai o userId (ou qualquer outra informação útil) do payload do token e armazena no objeto de requisição (req)
        next(); // Chama a próxima função/middleware na cadeia de tratamento de requisições
    })
};

// Rota login
router.post('/login', async (req, res)=>{
    const usuarios = await Controllers.buscaUser(); // Busca todos os usuários do sistema (provavelmente no banco de dados) usando o controlador "Controllers.buscaUser()"
    
    const verificaUsuarios = usuarios.some(obj => obj.user === req.body.user && obj.password === req.body.password); // Verifica se existe algum usuário cujo nome de usuário (user) e senha (password) correspondem aos enviados na requisição

    if (verificaUsuarios) { // Se existir um usuário com as credenciais corretas
        const token = jwt.sign({userId: 1}, SECRET, { expiresIn: 300 }); // Gera um token JWT usando a função "jwt.sign()", passando um objeto payload ({userId: 1} no exemplo) e a chave secreta (SECRET). O token tem uma validade de 300 segundos (5 minutos).
        return res.json({ auth: true, token }); // Retorna um JSON com a propriedade "auth" definida como true e o token gerado
    }

    res.status(401).json({ message: "Usuário não encontrado!" }); // Se as credenciais estiverem incorretas ou não houver usuário correspondente, retorna um status 401 (Não autorizado) e um JSON com a mensagem de "Usuário não encontrado!"
});



// Rota logout
router.post('/logout', (req, res) => {
    blacklist.push(req.headers['x-access-token']); // Adiciona o token presente no cabeçalho da requisição à lista negra (blacklist)
    res.json({message: "Logout realizado com sucesso!"}); // Retorna um JSON com a mensagem de "Logout realizado com sucesso!"
});

// Rota de busca
router.get('/buscar', verifyJWT, async (req, res) => {
    const idProdutor = req.query.idProdutor; // Obtém o parâmetro idProdutor da URL de consulta
    const idPropriedade = req.query.idPropriedade; // Obtém o parâmetro idPropriedade da URL de consulta

    let resultado = {}; // Objeto para armazenar os resultados da busca

    if (idProdutor) {
        const produtor = await Controllers.buscaPorIdProdutor(idProdutor); // Busca um produtor pelo idProdutor usando o controlador "Controllers.buscaPorIdProdutor()"
        if (produtor) {
            resultado.produtor = produtor; // Se o produtor for encontrado, armazena no objeto resultado
        } else {
            resultado.produtor = "Produtor não encontrado!"; // Se o produtor não for encontrado, armazena uma mensagem de erro no objeto resultado
        }
    }

    if (idPropriedade) {
        const propriedade = await Controllers.buscaPorIdPropriedade(idPropriedade); // Busca uma propriedade pelo idPropriedade usando o controlador "Controllers.buscaPorIdPropriedade()"
        if (propriedade) {
            resultado.propriedade = propriedade; // Se a propriedade for encontrada, armazena no objeto resultado
        } else {
            resultado.propriedade = "Propriedade não encontrada"; // Se a propriedade não for encontrada, armazena uma mensagem de erro no objeto resultado
        }
    }

    if (idProdutor || idPropriedade) {
        res.json(resultado); // Se pelo menos um dos parâmetros (idProdutor ou idPropriedade) estiver presente, retorna o objeto resultado em formato JSON
    } else {
        res.status(400).json({ message: "Você deve fornecer idProdutor e/ou idPropriedade" }); // Se nenhum dos parâmetros estiver presente, retorna um status 400 (Requisição inválida) e uma mensagem de erro em formato JSON
    }
});


// Rota Cadastro
router.post('/cadastro', verifyJWT, async (req, res) => {
    const { nomeProdutor, cpfProdutor, nomePropriedade, cadastroRural } = req.body; // Extrai as informações de cadastro (nomeProdutor, cpfProdutor, nomePropriedade, cadastroRural) do corpo da requisição

    try {
        // Se nenhum conjunto de parâmetros foi fornecido, retorna um erro
        if (!nomeProdutor && !cpfProdutor && !nomePropriedade && !cadastroRural) {
            return res.status(400).json({ message: "Erro: nenhuma informação de cadastro foi fornecida!" });
        }

        // Se nomeProdutor e cpfProdutor foram fornecidos, cadastra produtor
        if (nomeProdutor && cpfProdutor) {
            await cadastrarProdutor(nomeProdutor, cpfProdutor); // Chama uma função "cadastrarProdutor()" passando nomeProdutor e cpfProdutor para realizar o cadastro do produtor
        }

        // Se nomePropriedade e cadastroRural foram fornecidos, cadastra propriedade
        if (nomePropriedade && cadastroRural) {
            await cadastrarPropriedade(nomePropriedade, cadastroRural); // Chama uma função "cadastrarPropriedade()" passando nomePropriedade e cadastroRural para realizar o cadastro da propriedade
        }

        res.json({ message: "Query feita para o BD!" }); // Retorna um JSON com a mensagem de "Query feita para o BD!"
    } catch (error) {
        res.status(500).json({ message: "Erro ao realizar cadastro!", error: error.message }); // Se ocorrer algum erro durante o cadastro, retorna um status 500 (Erro interno do servidor) e um JSON com a mensagem de erro
    }
});


module.exports = router;