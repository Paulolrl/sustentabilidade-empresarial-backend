'use strict';

var mongoose = require('mongoose'),
  Criteria = mongoose.model('Criteria');

exports.add = async function(req, res) {
  let isValidId = mongoose.Types.ObjectId.isValid(req.params.dimensionId);
  if (!isValidId) return res.status(404).json({message: 'Dimension id not valid'});

  const dimension = await Dimension.findById(req.params.dimensionId);
  if (dimension == null) return res.status(404).json({message: 'Dimension id not found'});

  req.body.dimensionId = req.params.dimensionId;
  const newCriteria = new Criteria(req.body);
  newCriteria.save(function(err, criteria) {
    if (criteria) {
      res.status(200).json(criteria);
    } else {
      res.status(500).json({message: 'Unable to register criterion', error: err});
    }
  });
};

exports.update = async function(req, res) {
  let isValidId = mongoose.Types.ObjectId.isValid(req.params.dimensionId);
  if (!isValidId) return res.status(404).json({message: 'Dimension id not valid'});

  const dimension = await Dimension.findById(req.params.dimensionId);
  if (dimension == null) return res.status(404).json({message: 'Dimension id not found'});

  isValidId = mongoose.Types.ObjectId.isValid(req.params.criteriaId);
  if (!isValidId) return res.status(404).json({message: 'Criterion id not valid'});

  req.body.dimensionId = req.params.dimensionId;
  Criteria.findByIdAndUpdate(req.params.criteriaId, req.body, function(err, criteria) {
    if (criteria) {
      res.status(200).send({...criteria._doc, ...req.body});
    } else if (criteria == null && err == null) {
      res.status(404).json({message: 'Criterion id not found'});
    } else {
      res.status(500).json({message: 'Unable to update criterion', error: err});
    }
  });
};

exports.getFromDimension = async function(req, res) {
  let isValidId = mongoose.Types.ObjectId.isValid(req.params.dimensionId);
  if (!isValidId) return res.status(404).json({message: 'Dimension id not valid'});

  const dimension = await Dimension.findById(req.params.dimensionId);
  if (dimension == null) return res.status(404).json({message: 'Dimension id not found'});

  isValidId = mongoose.Types.ObjectId.isValid(req.params.criteriaId);
  if (!isValidId) return res.status(404).json({message: 'Criterion id not valid'});

  Criteria.findById(req.params.criteriaId, function(err, criteria) {
    if (criteria) {
      res.status(200).json(criteria);
    } else if (criteria == null && err == null) {
      res.status(404).json({message: 'Criterion id not found'});
    } else {
      res.status(500).json({message: 'Unable to get criterion', error: err});
    }
  });
};

exports.get = async function(req, res) {
  let isValidId = mongoose.Types.ObjectId.isValid(req.params.criteriaId);
  if (!isValidId) return res.status(404).json({message: 'Criterion id not valid'});

  Criteria.findById(req.params.criteriaId, function(err, criteria) {
    if (criteria) {
      res.status(200).json(criteria);
    } else if (criteria == null && err == null) {
      res.status(404).json({message: 'Criterion id not found'});
    } else {
      res.status(500).json({message: 'Unable to get criterion', error: err});
    }
  });
};

exports.listAll = async function(req, res) {
  let isValidId = mongoose.Types.ObjectId.isValid(req.params.dimensionId);
  if (!isValidId) return res.status(404).json({message: 'Dimension id not valid'});

  const dimension = await Dimension.findById(req.params.dimensionId);
  if (dimension == null) return res.status(404).json({message: 'Dimension id not found'});

  Criteria.find({dimensionId: req.params.dimensionId}, function(err, criteria) {
    if (criteria) {
      res.status(200).json(criteria);
    } else {
      res.status(500).json({message: 'Unable to list all criteria', error: err});
    }
  });
};

exports.delete = async function(req, res) {
  let isValidId = mongoose.Types.ObjectId.isValid(req.params.dimensionId);
  if (!isValidId) return res.status(404).json({message: 'Dimension id not valid'});

  const dimension = await Dimension.findById(req.params.dimensionId);
  if (dimension == null) return res.status(404).json({message: 'Dimension id not found'});

  isValidId = mongoose.Types.ObjectId.isValid(req.params.criteriaId);
  if (!isValidId) return res.status(404).json({message: 'Criterion id not valid'});

  Criteria.deleteOne({_id: req.params.criteriaId}, function(err, criteria) {
    if (criteria) {
      res.status(200).json({message: 'Criterion successfully deleted'});
    } else if (criteria == null && err == null) {
      res.status(404).json({message: 'Criterion id not found'});
    } else {
      res.status(500).json({message: 'Unable to delete criterion', error: err});
    }
  });
};
