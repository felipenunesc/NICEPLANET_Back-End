// Gerenciar rotas
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const Controllers = require('./controllers/Controllers');

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


// Rota login
router.post('/login', async (req, res)=>{
    const usuarios = await Controllers.buscaUser();
    const verificaUsuarios = usuarios.some(obj => obj.user === req.body.user && obj.password === req.body.password);

    if (verificaUsuarios) {
        const token = jwt.sign({userId: 1}, SECRET, { expiresIn: 300 });
        return res.json({ auth: true, token });
    }
    res.status(401).end();
});

// BlackList
const blacklist = [];

// Rota logout
router.post('/logout', (req, res) => {
    blacklist.push(req.headers['x-access-token']);
    res.json({message: "Logout realizado com sucesso!"});
})

module.exports = router;