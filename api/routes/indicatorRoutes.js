'use strict';
module.exports = function(app) {
  var indicator = require('../controllers/indicatorController');

  app.route('/dimension/:dimensionId/criteria/:criteriaId/indicator')
    .post(indicator.add)
    .get(indicator.listAll)
    .delete(indicator.deleteAll);

  app.route('/dimension/:dimensionId/criteria/:criteriaId/indicator/:indicatorId')
    .get(indicator.get)
    .put(indicator.update)
    .delete(indicator.delete);

  app.route('/indicator/:indicatorId')
    .get(indicator.get)
};
