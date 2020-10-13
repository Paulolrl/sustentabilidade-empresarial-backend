'use strict';


var mongoose = require('mongoose'),
  Organization = mongoose.model('Organizations');

exports.teste = function(req, res) {
  Organization.find({}, function(err, organization) {
    if (err)
      res.send(err);
    res.json(organization);
  });
};
