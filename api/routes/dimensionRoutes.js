'use strict';
module.exports = function(app) {
  var dimension = require('../controllers/dimensionController');

  // todoList Routes
  app.route('/dimensions')
    .get(dimension.teste)
};
