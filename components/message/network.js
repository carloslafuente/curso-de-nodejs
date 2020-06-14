const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.get('/', (req, res) => {
  const filterMessage = req.query.user || null;
  // req.query trae los valores de la url despues del signo ?
  // console.log(req.query);
  // req.body trae los valores body de la peticion
  // console.log(req.body);
  controller
    .getMessages(filterMessage)
    .then((result) => {
      response.success(req, res, result, 200);
    })
    .catch((err) => {
      response.error(
        req,
        res,
        'No se pudieron obtener los mensajes',
        400,
        'Error en el controlador'
      );
    });
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

router.patch('/:id', (req, res) => {
  // Trae el id de la ruta que se esta solicitando
  // console.log(req.params);
  controller
    .updateMessage(req.params.id, req.body.message)
    .then((result) => {
      response.success(req, res, result, 202);
    })
    .catch((err) => {
      response.error(req, res, 'Error interno', 300, err);
    });
});

router.delete('/:id', (req, res) => {
  controller
    .deleteMessage(req.params.id)
    .then((result) => {
      response.success(req, res, `Mensaje ${req.params.id} eliminado`, 200);
    })
    .catch((err) => {
      response.error(req, res, 'Error interno', 300, err);
    });
});

module.exports = router;
