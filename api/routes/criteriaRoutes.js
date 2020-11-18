'use strict';
module.exports = function(app) {
  var criteria = require('../controllers/criteriaController');

  app.route('/dimension/:dimensionId/criteria')
    .post(criteria.add)
    .get(criteria.listAll)
    .delete(criteria.deleteAll);

  app.route('/dimension/:dimensionId/criteria/:criteriaId')
    .get(criteria.get)
    .put(criteria.update)
    .delete(criteria.delete);

  app.route('/criteria/:criteriaId')
    .get(criteria.get)
};
