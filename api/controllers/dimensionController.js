'use strict';

var mongoose = require('mongoose'),
  Dimension = mongoose.model('Dimension');

exports.add = function(req, res) {
  const newDimension = new Dimension(req.body);
  newDimension.save(function(err, dimension) {
    if (err) {
      res.send(err);
    } else {
      res.json(dimension);
    }
  });
};

exports.update = function(req, res) {
  Dimension.findByIdAndUpdate(req.params.dimensionId, req.body, function(err, dimension) {
    if (err) {
      res.send(err);
    } else if (!dimension) {
      res.status(404).send("Dimension not found!");
    } else {
      res.send("Dimension matching the ID was modified!");
    }
  });
};

exports.get = function(req, res) {
  Dimension.findById(req.params.dimensionId, function(err, dimension) {
    if (err) {
      res.send(err);
    } else {
      res.json(dimension);
    }
  });
};

exports.listAll = function(req, res) {
  Dimension.find({}, function(err, dimension) {
    if (err) {
      res.send(err);
    } else {
      res.json(dimension);
    }
  });
};

exports.delete = function(req, res) {
  Dimension.findByIdAndDelete(req.params.dimensionId, function(err, dimension) {
    if (err) {
      res.send(err);
    } else if (!dimension) {
      res.status(404).send("Dimension not found!");
    } else {
      res.send("Dimension matching the ID was deleted!");
    }
  });
};

// TODO: remove this before production
exports.deleteAll = function(req, res) {
  Dimension.deleteMany({}, function(err, dimension) {
    if (err) {
      res.send(err);
    } else {
      res.send("All dimensions deleted!");
    }
  });
};
