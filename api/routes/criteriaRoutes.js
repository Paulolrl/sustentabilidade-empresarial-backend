'use strict';
module.exports = function(app) {
  var criteria = require('../controllers/criteriaController');

  app.route('/criteria')
    .post(criteria.add)
    .get(criteria.listAll)
    .delete(criteria.deleteAll)
};
