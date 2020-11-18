'use strict';

module.exports = function(app) {
  var user = require('../controllers/userController');
  var auth = require('../auth/auth');

  app.route('/user')
    .post(auth.verifyToken, user.add)
    .get(auth.verifyToken, auth.verifyAdmin, user.listAll)
    .delete(auth.verifyToken, auth.verifyAdmin, user.deleteAll);

  app.route('/user/me')
    .get(auth.verifyToken, user.getMe)
    .put(auth.verifyToken, user.updateMe)
    .delete(auth.verifyToken, user.deleteMe);

  app.route('/user/:userId')
    .get(auth.verifyToken, auth.verifyAdmin, user.get)
    .put(auth.verifyToken, auth.verifyAdmin, user.update)
    .delete(auth.verifyToken, auth.verifyAdmin, user.delete);
};
