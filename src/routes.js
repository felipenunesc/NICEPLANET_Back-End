// Gerenciar rotas
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const Controllers = require('./controllers/Controllers');

const { cadastrarProdutor, cadastrarPropriedade } = require('./services/Service');

const SECRET = 'felipetools';

router.use(bodyParser.json());

// Rota publica
router.get('/', async (req, res)=>{
    res.json({ message: "Tudo ok por aqui!" });
});

// Rota para verificar JWT
const verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token'];
    const index = blacklist.findIndex(item => item === token);
    if(index !== -1) return res.status(401).end();

    jwt.verify(token, SECRET, (err, decoded) => {
        if(err) return res.status(401).end();

        req.userId = decoded.userId;
        next();
    })
};

// Rota produto e propriedade
router.get('/listagem', verifyJWT, (req, res) => {
    console.log('Id:' + req.userId + ' fez esta chamada!');
    Controllers.buscarListagem(req,res);
});


// Rota login //
router.post('/login', async (req, res)=>{
    const usuarios = await Controllers.buscaUser();
    const verificaUsuarios = usuarios.some(obj => obj.user === req.body.user && obj.password === req.body.password);

    if (verificaUsuarios) {
        const token = jwt.sign({userId: 1}, SECRET, { expiresIn: 300 });
        return res.json({ auth: true, token });
    }
    res.status(401).json({ message: "Usuário não encontrado!" });
});

// BlackList
const blacklist = [];

// Rota logout
router.post('/logout', (req, res) => {
    blacklist.push(req.headers['x-access-token']);
    res.json({message: "Logout realizado com sucesso!"});
});

// Rota de busca
router.get('/buscar', verifyJWT, async (req, res) => {
    const idProdutor = req.query.idProdutor;
    const idPropriedade = req.query.idPropriedade;

    let resultado = {};

    if (idProdutor) {
        const produtor = await Controllers.buscaPorIdProdutor(idProdutor);
        if (produtor) {
            resultado.produtor = produtor;
        } else {
            resultado.produtor = "Produtor não encontrado!";
        }
    }
    if (idPropriedade) {
        const propriedade = await Controllers.buscaPorIdPropriedade(idPropriedade);
        if (propriedade) {
            resultado.propriedade = propriedade;
        } else {
            resultado.propriedade = "Propriedade não encontrada"
        }
    }
    
    if (idProdutor || idPropriedade) {
        res.json(resultado)
    } else {
        res.status(400).json({ message: "Você deve fornecer idProdutor e/ou idPropriedade" })
    }
})

// Rota Cadastro
router.post('/cadastro', verifyJWT, async (req,res) => {
    const { nomeProdutor, cpfProdutor, nomePropriedade, cadastroRural } = req.body;

    try {
        // Cadastra produtor
        await cadastrarProdutor(nomeProdutor, cpfProdutor);

        // Cadastrar propriedade
        await cadastrarPropriedade(nomePropriedade, cadastroRural);

        res.json({ message: "Cadastro realizado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao realizar cadastro!", error: error.message });
    }
});

module.exports = router;