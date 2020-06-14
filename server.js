const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const response = require('./network/response');
let app = express();

// El app.use del bodyParser.json() debe ser declarado antes para que funcione
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: false }));
app.use(router);

router.get('/message', (req, res) => {
  console.log(req.headers);
  res.header({
    'custom-header': 'Header personalizado',
  });
  // res.send('Lista de mensajes');
  response.success(req, res, 'Lista de mensajes');
});
router.post('/message', (req, res) => {
  console.log(req.query);
  console.log(req.body);
  // res.status(201).send({
  //   error: '',
  //   message: 'Creado correctamente',
  //   value: req.body,
  // });
  if (req.query.error == 'ok') {
    response.error(req, res, 'Error simulado', 400);
  } else {
    response.success(req, res, 'Creado correctamente', 201);
  }
});

// app.use('/', (req, res) => {
//   res.send('Hola');
// });

app.listen(3000);
console.log('La aplicacion esta escuchando en el puerto 3000');
