const db = require('mongoose');
require('dotenv').config();
const Model = require('./model');

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;

let uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

db.Promise = global.Promise;
db.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log('[Database] conectada con exito');

function addMessage(message) {
  const myMessage = new Model(message);
  myMessage.save();
}

async function getMessages(filterUser) {
  let filter = {};
  if (filterUser !== null) {
    filter = {
      user: filterUser,
    };
  }
  const messages = await Model.find(filter);
  return messages;
}

async function updateMessage(id, message) {
  const foundMessage = await Model.findOne({
    _id: id,
  });
  foundMessage.message = message;
  const newMessage = await foundMessage.save();
  return newMessage;
}

function deleteMessage(id) {
  return Model.deleteOne({ _id: id });
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage,
};
