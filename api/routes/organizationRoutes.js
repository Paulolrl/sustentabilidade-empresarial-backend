'use strict';
module.exports = function(app) {
  var organizations = require('../controllers/organizationController');
  var fbAuth = require('../../firebaseAuth');

  // todoList Routes
  app.route('/organization')
    .get(fbAuth, organizations.listAll)
    .post(fbAuth, organizations.add)

  app.route('/organization/:orgId')
    .get(fbAuth, organizations.get)
    .put(fbAuth, organizations.update)
    .delete(fbAuth, organizations.delete);
};
