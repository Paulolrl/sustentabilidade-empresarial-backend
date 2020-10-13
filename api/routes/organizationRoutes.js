'use strict';
module.exports = function(app) {
  var organizations = require('../controllers/organizationController');

  // todoList Routes
  app.route('/organizations')
    .get(organizations.teste)
};
