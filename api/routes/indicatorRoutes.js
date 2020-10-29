'use strict';
module.exports = function(app) {
  var indicator = require('../controllers/indicatorController');

  app.route('/indicator')
    .post(indicator.add)
    .get(indicator.listAll)
    .delete(indicator.deleteAll);
  
  app.route('/indicator/:indicatorId')
    .get(indicator.get)
    .put(indicator.update)
    .delete(indicator.delete);
};
