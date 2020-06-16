const express = require('express');
const app = express();
const server = require('http').Server(app);

const cors = require('cors');
const bodyParser = require('body-parser');
const socket = require('./socket');

require('dotenv').config();
const db = require('./bd');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
db(uri);

const router = require('./network/routes');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: false }));

socket.connect(server);

router(app);

app.use('/app', express.static('public'));

server.listen(3000, () => {
	console.log('La aplicacion esta escuchando en el puerto 3000');
});
