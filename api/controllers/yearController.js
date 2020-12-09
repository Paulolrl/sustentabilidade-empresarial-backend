'use strict';

var mongoose = require('mongoose'),
  Year = mongoose.model('Year');

exports.add = function(req, res) {
  const newYear = new Year(req.body);
  newYear.save(function(err, year) {
    if (year) {
      res.status(200).json(year);
    } else {
      res.status(500).json({message: 'Unable to register Year', error: err});
    }
  });
};

exports.update = function(req, res) {
  const isValidId = mongoose.Types.ObjectId.isValid(req.params.yearId);
  if (!isValidId) return res.status(404).json({message: 'Year id not found'});

  Year.findByIdAndUpdate(req.params.yearId, req.body, function(err, year) {
    if (year) {
      res.status(200).send({...year._doc, ...req.body});
    } else if (year == null && err == null) {
      res.status(404).json({message: 'Year id not found'});
    } else {
      res.status(500).json({message: 'Unable to update Year', error: err});
    }
  });
};

exports.get = function(req, res) {
  const isValidId = mongoose.Types.ObjectId.isValid(req.params.yearId);
  if (!isValidId) return res.status(404).json({message: 'Year id not found'});

  Year.findById(req.params.yearId, function(err, year) {
    if (year) {
      res.status(200).json(year);
    } else if (year == null && err == null) {
      res.status(404).json({message: 'Year id not found'});
    } else {
      res.status(500).json({message: 'Unable to get Year', error: err});
    }
  });
};

exports.listAll = function(req, res) {
  Year.find({}).sort('year').exec(function(err, year) {
    if (year) {
      res.status(200).json(year);
    } else {
      res.status(500).json({message: 'Unable to list all Years', error: err});
    }
  });
};

exports.delete = function(req, res) {
  const isValidId = mongoose.Types.ObjectId.isValid(req.params.yearId);
  if (!isValidId) return res.status(404).json({message: 'Year id not found'});

  Year.deleteOne({_id: req.params.yearId}, function(err, year) {
    if (year) {
      res.status(200).json({message: 'Year successfully deleted'});
    } else if (year == null && err == null) {
      res.status(404).json({message: 'Year id not found'});
    } else {
      res.status(500).json({message: 'Unable to delete Year', error: err});
    }
  });
};
