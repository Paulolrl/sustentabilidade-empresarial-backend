'use strict';

module.exports = function(app) {
  var user = require('../controllers/userController');

  app.route('/user')
    .post(user.add)
    .get(user.listAll)
    .delete(user.deleteAll);
  
  app.route('/user/:userId')
    .get(user.get)
    .put(user.update)
    .delete(user.delete);
};
