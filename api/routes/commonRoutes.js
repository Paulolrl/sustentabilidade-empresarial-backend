module.exports = function(app) {
  var common = require('../controllers/commonController');

  app.route('/common/categories')
    .get(common.getCategories);

  app.route('/common/sectors')
    .get(common.getSectors);

  app.route('/common/sizes')
    .get(common.getSizes);
};
