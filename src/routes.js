// Gerenciar rotas
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const Controllers = require('./controllers/Controllers');

router.use(bodyParser.json());


// Rota produto e propriedade
router.get('/listagem', Controllers.buscarListagem);

// Rota publica
router.get('/', (req, res)=>{
    res.json({ message: "Tudo ok por aqui!" });
});

// Rota login
const SECRET = 'felipetools';
router.post('/login', (req, res)=>{
    if (req.body.user === 'felipe' && req.body.password === '12345') {
        const token = jwt.sign({userId: 1}, SECRET, { expiresIn: 300 });
        return res.json({ auth: true, token });
    }

    res.status(401).end();
});

// Rota logout
router.post('/logout', (req, res)=>{
    res.end();
})

module.exports = router;