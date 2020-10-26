'use strict';

module.exports = function(app) {
  const user = require('../controllers/userController');

  app.route('/user')
    .post(user.add)
    .get(user.listAll)
    .delete(user.deleteAll)
};