'use strict';
module.exports = function(app) {
  var organizations = require('../controllers/organizationController');
  var auth = require('../auth/auth');

  // todoList Routes
  app.route('/organization')
    .get(auth.verifyToken, auth.verifyAdmin, organizations.listAll)
    .post(auth.verifyToken, organizations.add)

  app.route('/organization/mine')
    .get(auth.verifyToken, organizations.getMine)
    .put(auth.verifyToken, organizations.updateMine)
    .delete(auth.verifyToken, organizations.deleteMine);

  app.route('/organization/:orgId')
    .get(auth.verifyToken, auth.verifyAdmin, organizations.get)
    .put(auth.verifyToken, auth.verifyAdmin, organizations.update)
    .delete(auth.verifyToken, auth.verifyAdmin, organizations.delete);
};
