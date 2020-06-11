const express = require('express');
const router = express.Router();
let app = express();

app.use(router);

router.get('/message', (req, res) => {
  res.send('Lista de mensajes');
});
router.post('/message', (req, res) => {
  res.send('Mensaje agregado correctamente');
});

// app.use('/', (req, res) => {
//   res.send('Hola');
// });

app.listen(3000);
console.log('La aplicacion esta escuchando en el puerto 3000');
