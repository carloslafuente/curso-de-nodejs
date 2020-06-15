const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.get('/', (req, res) => {
  const filterMessage = req.query.chat || null;
  controller
    .getMessages(filterMessage)
    .then((result) => {
      response.success(req, res, result, 200);
    })
    .catch((err) => {
      response.error(req, res, 'No se pudieron obtener los mensajes', 500, err);
    });
});

router.post('/', (req, res) => {
  body = req.body;
  controller
    .addMessage(body.chat, body.user, body.message)
    .then((result) => {
      response.success(req, res, result, 201);
    })
    .catch((err) => {
      response.error(
        req,
        res,
        'Informacion invalida',
        500,
        'Error en el controlador'
      );
    });
});

router.patch('/:id', (req, res) => {
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
