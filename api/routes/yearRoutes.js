'use strict';

module.exports = function(app) {
  var year = require('../controllers/yearController');
  var auth = require('../auth/auth');

  app.route('/year')
    .get(auth.verifyToken, year.listAll)
    .post(auth.verifyToken, auth.verifyAdmin, year.add);

  app.route('/year/:yearId')
    .get(auth.verifyToken, year.get)
    .put(auth.verifyToken, auth.verifyAdmin, year.update)
    .delete(auth.verifyToken, auth.verifyAdmin, year.delete);
};
