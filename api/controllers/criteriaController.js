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

exports.update = function(req, res) {
  Criteria.findByIdAndUpdate(req.params.criteriaId, req.body, function(err, criteria) {
    if (err) {
      res.send(err);
    } else if (!criteria) {
      res.status(404).send("Criterion not found!");
    } else {
      res.send("Criterion matching the ID was modified!");
    }
  });
};

exports.get = function(req, res) {
  Criteria.findById(req.params.criteriaId, function(err, criteria) {
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

exports.delete = function(req, res) {
  Criteria.findByIdAndDelete(req.params.criteriaId, function(err, criteria) {
    if (err) {
      res.send(err);
    } else if (!criteria) {
      res.status(404).send("Criterion not found!");
    } else {
      res.send("Criterion matching the ID was deleted!");
    }
  });
};

// TODO: remove this before production
exports.deleteAll = function(req, res) {
  Criteria.deleteMany({}, function(err, criteria) {
    if (err) {
      res.send(err);
    } else {
      res.send("All criteria deleted!");
    }
  });
};
