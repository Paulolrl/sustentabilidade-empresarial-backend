'use strict';

var mongoose = require('mongoose'),
  Evaluation = mongoose.model('Evaluation');

  exports.add = function(req, res) {
    req.body.orgId = req.params.orgId;
    const newEvaluation = new Evaluation(req.body);
    newEvaluation.save(function(err, evaluation) {
      if (err) {
        res.send(err);
      } else {
        res.json(evaluation);
      }
    });
  };
  
  exports.update = function(req, res) {
    req.body.orgId = req.params.orgId;
    Evaluation.findByIdAndUpdate(req.params.evaluationId, req.body, function(err, evaluation) {
      if (err) {
        res.send(err);
      } else if (!evaluation) {
        res.status(404).send("Evaluation not found!");
      } else {
        res.send("Evaluation matching the ID was modified!");
      }
    });
  };

exports.get = function(req, res) {
  Evaluation.findById(req.params.evaluationId, function(err, evaluation) {
    if (err) {
      res.send(err);
    } else {
      res.json(evaluation);
    }
  });
};

exports.listAll = function(req, res) {
  Evaluation.find({}, function(err, evaluation) {
    if (err) {
      res.send(err);
    } else {
      res.json(evaluation);
    }
  });
};

exports.delete = function(req, res) {
  Evaluation.findByIdAndDelete(req.params.evaluationId, function(err, evaluation) {
    if (err) {
      res.send(err);
    } else if (!evaluation) {
      res.status(404).send("Evaluation not found!");
    } else {
      res.send("Evaluation matching the ID was deleted!");
    }
  });
};

// TODO: remove this before production
exports.deleteAll = function(req, res) {
  Evaluation.deleteMany({}, function(err, evaluation) {
    if (err) {
      res.send(err);
    } else {
      res.send("All evaluation deleted!");
    }
  });
};