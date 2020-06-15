const store = require('./store');

function addMessage(user, message) {
  return new Promise((resolve, reject) => {
    if (!user || !message) {
      console.error('[MessageController] No hay usuario o mensaje');
      reject('Los datos son incorrectos');
      return false;
    }
    const newMessage = {
      user,
      message,
      date: new Date(),
    };
    store.addMessage(newMessage);
    resolve(newMessage);
  });
}

function getMessages(filterUser) {
  return new Promise((resolve, reject) => {
    resolve(store.getMessages(filterUser));
  });
}

function updateMessage(id, message) {
  return new Promise(async (resolve, reject) => {
    if (!id || !message) {
      reject('Los datos son invalidos');
    }
    const result = await store.updateMessage(id, message);
    resolve(result);
  });
}

function deleteMessage(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject('Los datos son invalidos');
    }
    store
      .deleteMessage(id)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => reject(err));
  });
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage,
};
