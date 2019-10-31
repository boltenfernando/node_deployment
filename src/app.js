const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Importar variables de entorno locales
require('dotenv').config({path: 'variables.env'});
console.log(process.env.DB_URL);

//Leer localhost de variables y puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT  || 3000;



const app = express();

// connection to db
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));

// importing routes
const indexRoutes = require('./routes/index');

// settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))

// routes
app.use('/', indexRoutes);


app.listen(port, host, () => {
  console.log(`El servidor esta funcionando en el port ${port}`);
});
