'use strict';
module.exports = function(app) {
  var criteria = require('../controllers/indicatorController');

  app.route('/indicator')
    .post(criteria.add)
    .get(criteria.listAll)
    .delete(criteria.deleteAll);
  
  app.route('/indicator/:indicatorId')
    .get(criteria.get)
    .put(criteria.update)
    .delete(criteria.delete);
};
