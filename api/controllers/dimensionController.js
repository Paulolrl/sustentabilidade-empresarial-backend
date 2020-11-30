'use strict';

var mongoose = require('mongoose'),
  Dimension = mongoose.model('Dimension');

exports.add = function(req, res) {
  const newDimension = new Dimension(req.body);
  newDimension.save(function(err, dimension) {
    if (dimension) {
      res.status(200).json(dimension);
    } else {
      res.status(500).json({message: 'Unable to register dimension', error: err});
    }
  });
};

exports.update = function(req, res) {
  const isValidId = mongoose.Types.ObjectId.isValid(req.params.dimensionId);
  if (!isValidId) return res.status(404).json({message: 'Dimension id not found'});

  Dimension.findByIdAndUpdate(req.params.dimensionId, req.body, function(err, dimension) {
    if (dimension) {
      res.status(200).send({...dimension._doc, ...req.body});
    } else if (dimension == null && err == null) {
      res.status(404).json({message: 'Dimension id not found'});
    } else {
      res.status(500).json({message: 'Unable to update dimension', error: err});
    }
  });
};

exports.get = function(req, res) {
  const isValidId = mongoose.Types.ObjectId.isValid(req.params.dimensionId);
  if (!isValidId) return res.status(404).json({message: 'Dimension id not found'});

  Dimension.findById(req.params.dimensionId, function(err, dimension) {
    if (dimension) {
      res.status(200).json(dimension);
    } else if (dimension == null && err == null) {
      res.status(404).json({message: 'Dimension id not found'});
    } else {
      res.status(500).json({message: 'Unable to get dimension', error: err});
    }
  });
};

exports.listAll = function(req, res) {
  Dimension.find({}, function(err, dimension) {
    if (dimension) {
      res.status(200).json(dimension);
    } else {
      res.status(500).json({message: 'Unable to list all dimensions', error: err});
    }
  });
};

exports.delete = function(req, res) {
  const isValidId = mongoose.Types.ObjectId.isValid(req.params.dimensionId);
  if (!isValidId) return res.status(404).json({message: 'Dimension id not found'});

  Dimension.deleteOne({_id: req.params.dimensionId}, function(err, dimension) {
    if (dimension) {
      res.status(200).json({message: 'Dimension successfully deleted'});
    } else if (dimension == null && err == null) {
      res.status(404).json({message: 'Dimension id not found'});
    } else {
      res.status(500).json({message: 'Unable to delete dimension', error: err});
    }
  });
};
