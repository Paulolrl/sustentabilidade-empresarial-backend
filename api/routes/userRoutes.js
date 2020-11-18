'use strict';

module.exports = function(app) {
  var user = require('../controllers/userController');
  var fbAuth = require('../../firebaseAuth');

  app.route('/user')
    .post(fbAuth, user.add);
    // .get(fbAuth, user.listAll)
    // .delete(fbAuth, user.deleteAll);

  app.route('/user/me')
    .get(fbAuth, user.get)
    .put(fbAuth, user.update)
    .delete(fbAuth, user.delete);
};
