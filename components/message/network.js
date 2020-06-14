const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.get('/', (req, res) => {
  res.header({
    'custom-header': 'Header personalizado',
  });
  response.success(req, res, 'Lista de mensajes');
});

router.post('/', (req, res) => {
  body = req.body;
  controller
    .addMessage(body.user, body.message)
    .then((result) => {
      response.success(req, res, result, 201);
    })
    .catch((err) => {
      response.error(
        req,
        res,
        'Informacion invalida',
        400,
        'Error en el controlador'
      );
    });
});

module.exports = router;
