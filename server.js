const express = require('express');
let app = express();

app.use('/', (req, res) => {
  res.send('Hola');
});

app.listen(3000);
console.log('La aplicacion esta escuchando en el puerto 3000');
