const express = require('express');
const app = express();
const server = require('http').Server(app);

const cors = require('cors');
const bodyParser = require('body-parser');
const socket = require('./socket');

const db = require('./bd');
const config = require('./config');
const router = require('./network/routes');

db(config.uri);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: false }));

socket.connect(server);

router(app);

app.use(config.publicRoute, express.static('public'));

server.listen(config.port, () => {
	console.log(
		`La aplicacion esta escuchando en: ${config.host}:${config.port}`
	);
});
