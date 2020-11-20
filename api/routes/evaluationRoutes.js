'use strict';

module.exports = function(app) {
  var evaluation = require('../controllers/evaluationController');

  app.route('/organization/:orgId/evaluation')
    .post(evaluation.add)
    .get(evaluation.listAll)
    .delete(evaluation.deleteAll);

  app.route('/organization/:orgId/evaluation/:evaluationId')
    .get(evaluation.get)
    .put(evaluation.update)
    .delete(evaluation.delete);

  app.route('/evaluation/:evaluationId')
    .get(evaluation.get)
};
