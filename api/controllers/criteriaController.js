'use strict';

var mongoose = require('mongoose'),
  Criteria = mongoose.model('Criteria');

exports.add = function(req, res) {
  const newCriteria = new Criteria(req.body);
  newCriteria.save(function(err, criteria) {
    if (err) {
      res.send(err);
    } else {
      res.json(criteria);
    }
  });
};

exports.listAll = function(req, res) {
  Criteria.find({}, function(err, criteria) {
    if (err) {
      res.send(err);
    } else {
      res.json(criteria);
    }
  });
};

exports.deleteAll = function(req, res) {
  Criteria.deleteMany({}, function(err, criteria) {
    if (err) {
      res.send(err);
    } else {
      res.send("Criteria matching requisition were deleted!");
    }
  });
};
