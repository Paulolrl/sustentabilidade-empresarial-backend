'use strict';
module.exports = function(app) {
  var dimension = require('../controllers/dimensionController');

  app.route('/dimension')
    .post(dimension.add)
    .get(dimension.listAll)
    .delete(dimension.deleteAll);

    app.route('/dimension/:dimensionId')
    .get(dimension.get)
    .put(dimension.update)
    .delete(dimension.delete);
};
