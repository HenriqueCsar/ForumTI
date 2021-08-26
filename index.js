const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const discussaoModel = require('./database/Discussao');

connection
    .authenticate()
    .then(() => {
        console.log('')
        console.log(' - Conexão com Database Realizada com Sucesso');
    })
    .catch((Msgerro) =>{
        console.log(Msgerro)
    })

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));


// iniciando, o portal index
app.get('/', (req,res) => {
    discussaoModel.findAll({raw:true}).then(discussaos1 =>{
        res.render('index', {
            discussaos1: discussaos1
        })
})
})


app.get('/discussao', (req,res) => {
    discussaoModel.findAll({raw: true}).then(discussaos =>{
        discussaos = discussaos.reverse()
        res.render('discussao', {
            discussaos: discussaos
        })
    })
});


app.post('/abrirdiscussao', (req,res) => {
    var titulo = req.body.titulo;
    var opiniao = req.body.opiniao;
    var materia = req.body.materia;

    discussaoModel.create({
        titulo: titulo,
        opiniao: opiniao,
        materia: materia
    }).then(() => {
        res.redirect('/')
    })

})


app.get('/discussao-index', (req,res) => {
        discussaoModel.findAll({raw:true}).then(discussaos1 =>{
            res.render('discussao-index', {
                discussaos1: discussaos1
            })
    })
})

app.get('/erro', (req,res) => {
    res.send('Erro ao iniciar a discussão, os administradores já foram avisados.')
})



app.listen(3333, ()=>{
    console.log('Servidor rodando...');
});