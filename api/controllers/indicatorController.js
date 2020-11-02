'use strict';

var mongoose = require('mongoose'),
  Indicator = mongoose.model('Indicator');

exports.add = function(req, res) {
  const newIndicator = new Indicator(req.body);
  newIndicator.save(function(err, indicator) {
    if (err) {
      res.send(err);
    } else {
      res.json(indicator);
    }
  });
};

exports.update = function(req, res) {
  Indicator.findByIdAndUpdate(req.params.indicatorId, req.body, function(err, indicator) {
    if (err) {
      res.send(err);
    } else if (!indicator) {
      res.status(404).send("Indicator not found!");
    } else {
      res.send("Indicator matching the ID was modified!");
    }
  });
};

exports.get = function(req, res) {
  Indicator.findById(req.params.indicatorId, function(err, indicator) {
    if (err) {
      res.send(err);
    } else {
      res.json(indicator);
    }
  });
};

exports.listAll = function(req, res) {
  Indicator.find({}, function(err, indicator) {
    if (err) {
      res.send(err);
    } else {
      res.json(indicator);
    }
  });
};

exports.delete = function(req, res) {
  Indicator.findByIdAndDelete(req.params.indicatorId, function(err, indicator) {
    if (err) {
      res.send(err);
    } else if (!indicator) {
      res.status(404).send("Indicator not found!");
    } else {
      res.send("Indicator matching the ID was deleted!");
    }
  });
};

// TODO: remove this before production
exports.deleteAll = function(req, res) {
  Indicator.deleteMany({}, function(err, indicator) {
    if (err) {
      res.send(err);
    } else {
      res.send("All indicators deleted!");
    }
  });
};
