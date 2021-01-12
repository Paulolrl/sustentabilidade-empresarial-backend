'use strict';

var mongoose = require('mongoose'),
  Indicator = mongoose.model('Indicator');

exports.add = async function(req, res) {
  let isValidId = mongoose.Types.ObjectId.isValid(req.params.dimensionId);
  if (!isValidId) return res.status(404).json({message: 'Dimension id not valid'});

  const dimension = await Dimension.findById(req.params.dimensionId);
  if (dimension == null) return res.status(404).json({message: 'Dimension id not found'});

  isValidId = mongoose.Types.ObjectId.isValid(req.params.criteriaId);
  if (!isValidId) return res.status(404).json({message: 'Criteria id not valid'});

  const criteria = await Criteria.findById(req.params.criteriaId);
  if (criteria == null) return res.status(404).json({message: 'Criteria id not found'});

  req.body.criteriaId = req.params.criteriaId;
  const newIndicator = new Indicator(req.body);
  newIndicator.save(function(err, indicator) {
    if (indicator) {
      res.status(200).json(indicator);
    } else {
      res.status(500).json({message: 'Unable to register indicator', error: err});
    }
  });
};

exports.update = async function(req, res) {
  let isValidId = mongoose.Types.ObjectId.isValid(req.params.dimensionId);
  if (!isValidId) return res.status(404).json({message: 'Dimension id not valid'});

  const dimension = await Dimension.findById(req.params.dimensionId);
  if (dimension == null) return res.status(404).json({message: 'Dimension id not found'});

  isValidId = mongoose.Types.ObjectId.isValid(req.params.criteriaId);
  if (!isValidId) return res.status(404).json({message: 'Criteria id not valid'});

  const criteria = await Criteria.findById(req.params.criteriaId);
  if (criteria == null) return res.status(404).json({message: 'Criteria id not found'});

  isValidId = mongoose.Types.ObjectId.isValid(req.params.indicatorId);
  if (!isValidId) return res.status(404).json({message: 'Indicator id not valid'});

  req.body.criteriaId = req.params.criteriaId;
  Indicator.findByIdAndUpdate(req.params.indicatorId, req.body, function(err, indicator) {
    if (indicator) {
      res.status(200).send({...indicator._doc, ...req.body});
    } else if (indicator == null && err == null) {
      res.status(404).json({message: 'Indicator id not found'});
    } else {
      res.status(500).json({message: 'Unable to update indicator', error: err});
    }
  });
};

exports.getFromCriteria = async function(req, res) {
  let isValidId = mongoose.Types.ObjectId.isValid(req.params.dimensionId);
  if (!isValidId) return res.status(404).json({message: 'Dimension id not valid'});

  const dimension = await Dimension.findById(req.params.dimensionId);
  if (dimension == null) return res.status(404).json({message: 'Dimension id not found'});

  isValidId = mongoose.Types.ObjectId.isValid(req.params.criteriaId);
  if (!isValidId) return res.status(404).json({message: 'Criteria id not valid'});

  const criteria = await Criteria.findById(req.params.criteriaId);
  if (criteria == null) return res.status(404).json({message: 'Criteria id not found'});

  isValidId = mongoose.Types.ObjectId.isValid(req.params.indicatorId);
  if (!isValidId) return res.status(404).json({message: 'Indicator id not valid'});

  Indicator.findById(req.params.indicatorId, function(err, indicator) {
    if (indicator) {
      res.status(200).json(indicator);
    } else if (indicator == null && err == null) {
      res.status(404).json({message: 'Indicator id not found'});
    } else {
      res.status(500).json({message: 'Unable to get indicator', error: err});
    }
  });
};

exports.get =  async function(req, res) {
  let isValidId = mongoose.Types.ObjectId.isValid(req.params.indicatorId);
  if (!isValidId) return res.status(404).json({message: 'Indicator id not valid'});

  Indicator.findById(req.params.indicatorId, function(err, indicator) {
    if (indicator) {
      res.status(200).json(indicator);
    } else if (indicator == null && err == null) {
      res.status(404).json({message: 'Indicator id not found'});
    } else {
      res.status(500).json({message: 'Unable to get indicator', error: err});
    }
  });
};

exports.listAll = async function(req, res) {
  let isValidId = mongoose.Types.ObjectId.isValid(req.params.dimensionId);
  if (!isValidId) return res.status(404).json({message: 'Dimension id not valid'});

  const dimension = await Dimension.findById(req.params.dimensionId);
  if (dimension == null) return res.status(404).json({message: 'Dimension id not found'});

  isValidId = mongoose.Types.ObjectId.isValid(req.params.criteriaId);
  if (!isValidId) return res.status(404).json({message: 'Criteria id not valid'});

  const criteria = await Criteria.findById(req.params.criteriaId);
  if (criteria == null) return res.status(404).json({message: 'Criteria id not found'});

  Indicator.find({criteriaId: req.params.criteriaId}, function(err, indicator) {
    if (indicator) {
      res.status(200).json(indicator);
    } else {
      res.status(500).json({message: 'Unable to list all indicators', error: err});
    }
  });
};

exports.delete = async function(req, res) {
  let isValidId = mongoose.Types.ObjectId.isValid(req.params.dimensionId);
  if (!isValidId) return res.status(404).json({message: 'Dimension id not valid'});

  const dimension = await Dimension.findById(req.params.dimensionId);
  if (dimension == null) return res.status(404).json({message: 'Dimension id not found'});

  isValidId = mongoose.Types.ObjectId.isValid(req.params.criteriaId);
  if (!isValidId) return res.status(404).json({message: 'Criteria id not valid'});

  const criteria = await Criteria.findById(req.params.criteriaId);
  if (criteria == null) return res.status(404).json({message: 'Criteria id not found'});

  isValidId = mongoose.Types.ObjectId.isValid(req.params.indicatorId);
  if (!isValidId) return res.status(404).json({message: 'Indicator id not valid'});

  Indicator.deleteOne({_id: req.params.indicatorId}, function(err, indicator) {
    if (indicator) {
      res.status(200).json({message: 'Indicator successfully deleted'});
    } else if (indicator == null && err == null) {
      res.status(404).json({message: 'Indicator id not found'});
    } else {
      res.status(500).json({message: 'Unable to delete indicator', error: err});
    }
  });
};
