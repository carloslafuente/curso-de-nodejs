const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;

let uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

const db = require('./bd');

const router = require('./network/routes');

db(uri);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: false }));

router(app);

app.use('/app', express.static('public'));

app.listen(3000);
console.log('La aplicacion esta escuchando en el puerto 3000');
