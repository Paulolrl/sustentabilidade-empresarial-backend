'use strict';
module.exports = function(app) {
  var organizations = require('../controllers/organizationController');
  var fbAuth = require('../../firebaseAuth');

  // todoList Routes
  app.route('/organizations')
    .get(fbAuth, organizations.listAll)
    .post(fbAuth, organizations.create)

  app.route('/organizations/:orgId')
    .get(organizations.get)
    .put(organizations.update)
    .delete(organizations.delete);
};
