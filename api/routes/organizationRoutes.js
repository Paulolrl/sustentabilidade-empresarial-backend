'use strict';
module.exports = function(app) {
  var organizations = require('../controllers/organizationController');

  // todoList Routes
  app.route('/organizations')
    .get(organizations.listAll)
    .post(organizations.create)

  app.route('/organizations/:orgId')
    .get(organizations.get)
    .put(organizations.update)
    .delete(organizations.delete);
};
