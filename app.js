const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// ligar à base de dados
mongoose.connect(config.database);

//em conexao
mongoose.connection.on('ligado', () => {
  console.log('ligado à base de dados '+config.database);
});

// erro
mongoose.connection.on('erro', (err) => {
  console.log('erro de base de dados: '+err);
});

const app = express();

const users = require('./routes/users');

// numero do port
const port = process.env.PORT || 8080;

// cors
app.use(cors());

// diretorio estatico
app.use(express.static(path.join(__dirname, 'public')));

// body parser
app.use(bodyParser.json());

//passaporte
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// index route
app.get('/', (req, res) => {
  res.send('endpoint invalido');
});

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// iniciar server
app.listen(port, () => {
  console.log('server comecou no port '+port);
});



