'use strict';

var mongoose = require('mongoose'),
  Evaluation = mongoose.model('Evaluation');

exports.add = function(req, res) {
  req.body.orgId = req.user.orgId;

  if(!req.body.orgId){
    res.status(500).json({message: 'User does not have organization associated'});
    return;
  }

  const newEvaluation = new Evaluation(req.body);
  newEvaluation.save(function(err, evaluation) {
    if (evaluation) {
      res.status(200).json(evaluation);
    } else {
      res.status(500).json({message: 'Unable to register evaluation', error: err});
    }
  });
};

exports.update = async function(req, res) {
  let ev = await Evaluation.findById(req.params.evaluationId);

  if(ev.orgId.toString() == req.user.orgId){
    console.log('entrou');
    req.body.orgId = req.user.orgId;
    Evaluation.findByIdAndUpdate(req.params.evaluationId, {$set: req.body}, function(err, evaluation) {
      if (evaluation) {
        res.status(200).send({...evaluation._doc, ...req.body});
      } else if (dimension == null && err == null) {
        res.status(404).json({message: 'evaluation id not found'});
      } else {
        res.status(500).json({message: 'Unable to update evaluation', error: err});
      }
    });
  } else {
    res.status(500).json({message: 'Unable to update evaluation'});
  }

};

exports.validate = function(req, res) {

  Evaluation.findByIdAndUpdate(req.params.evaluationId, {$set: {validated: true}}, function(err, evaluation) {
    if (evaluation) {
      res.status(200).send({...evaluation._doc, validated: true});
    } else if (dimension == null && err == null) {
      res.status(404).json({message: 'evaluation id not found'});
    } else {
      res.status(500).json({message: 'Unable to validate evaluation', error: err});
    }
  });

};

exports.invalidate = function(req, res) {
  Evaluation.findByIdAndUpdate(req.params.evaluationId, {$set: {validated: false}}, function(err, evaluation) {
    if (evaluation) {
      res.status(200).send({...evaluation._doc, validated: false});
    } else if (dimension == null && err == null) {
      res.status(404).json({message: 'evaluation id not found'});
    } else {
      res.status(500).json({message: 'Unable to invalidate evaluation', error: err});
    }
  });
};

exports.get = function(req, res) {
  Evaluation.findById(req.params.evaluationId, function(err, evaluation) {
    if (evaluation && (evaluation.orgId.toString() == req.user.orgId || req.user.isAdmin)) {
      res.status(200).json(evaluation);
    } else if (evaluation == null && err == null) {
      res.status(404).json({message: 'Evaluation id not found'});
    } else {
      res.status(500).json({message: 'Unable to get evaluation', error: err});
    }
  });
};

exports.listAllFromOrg = function(req, res) {
  Evaluation.find({...req.query, orgId: req.params.orgId}, function(err, evaluation) {
    if (evaluation) {
      res.status(200).json(evaluation);
    } else {
      res.status(500).json({message: 'Unable to list all evaluations', error: err});
    }
  });
};

exports.listAll = function(req, res) {
  let page = parseInt(req.query.page || 0);
  let limit = parseInt(req.query.pageSize) || 10;
  let skip = page * limit;

  delete req.query.pageSize;
  delete req.query.page;

  Evaluation.find(req.query).skip(skip).limit(limit).exec(function(err, evaluation) {
    if (evaluation) {
      Evaluation.countDocuments(req.query).exec(async (count_error, count) => {
        if (err) {
          res.status(500).json({message: 'Unable to count list', error: count_error});
        } else {
          let results = [];
          for(let i = 0; i < evaluation.length; i++){
            let ev = evaluation[i];
            let org = await Organization.findById(ev.orgId);
            results.push({_id: ev._id, organization: org, year: ev.year})
          }
          res.status(200).json({
            total: count,
            page,
            pageSize: evaluation.length,
            results
          });
        }
      });
    } else {
      res.status(500).json({message: 'Unable to list all evaluations', error: err});
    }
  });
};

exports.listMine = function(req, res) {
  Evaluation.find({...req.query, orgId: req.user.orgId}, function(err, evaluation) {
    if (evaluation) {
      res.status(200).json(evaluation);
    } else {
      res.status(500).json({message: 'Unable to list all evaluations', error: err});
    }
  });
};

exports.delete = async function(req, res) {
  let ev = await Evaluation.findById(req.params.evaluationId);

  if(ev.orgId.toString() == req.user.orgId || req.user.isAdmin){
    Evaluation.deleteOne({_id: req.params.evaluationId}, function(err, evaluation) {
      if (evaluation) {
        res.status(200).json({message: 'Evaluation successfully deleted'});
      } else if (dimension == null && err == null) {
        res.status(404).json({message: 'Evaluation id not found'});
      } else {
        res.status(500).json({message: 'Unable to delete evaluation', error: err});
      }
    });
  } else {
    res.status(500).json({message: 'Unable to delete evaluation'});
  }

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
