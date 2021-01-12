'use strict';

var mongoose = require('mongoose'),
  email = require('./emailController'),
  Evaluation = mongoose.model('Evaluation');

exports.addMine = function(req, res) {
  req.body.orgId = req.user.orgId;

  // Assuming users will not have ghost organizations
  if(!req.body.orgId) {
    return res.status(404).json({message: 'User does not have an organization associated'});
  }

  req.body.finished = false;
  req.body.lastEditEmail = req.email;

  const newEvaluation = new Evaluation(req.body);
  newEvaluation.save(function(err, evaluation) {
    if (evaluation) {
      res.status(200).json(evaluation);
    } else {
      res.status(500).json({message: 'Unable to register evaluation', error: err});
    }
  });
};

exports.updateMine = async function(req, res) {
  // Assuming users will not have ghost organizations
  if(!req.user.orgId) {
    return res.status(404).json({message: 'User does not have an organization associated'});
  }

  let isValidId = mongoose.Types.ObjectId.isValid(req.params.evaluationId);
  if (!isValidId) return res.status(404).json({message: 'Evaluation id not valid'});

  const ev = await Evaluation.findById(req.params.evaluationId);
  if (ev == null) return res.status(404).json({message: 'Evaluation id not found'});

  req.body.lastEditEmail = req.email;

  if (ev.orgId.toString() === req.user.orgId.toString()) {
    Evaluation.findByIdAndUpdate(req.params.evaluationId, {$set: req.body}, function(err, evaluation) {
      if (evaluation) {
        res.status(200).send({...evaluation._doc, ...req.body});
      } else if (evaluation == null && err == null) { // Unlikely scenario because we found it before
        res.status(404).json({message: 'Evaluation id not found'});
      } else {
        res.status(500).json({message: 'Unable to update evaluation', error: err});
      }
    });
  } else {
    res.status(404).json({message: 'Evaluation id not found for this organization'});
  }

};

exports.validate = async function(req, res) {
  let isValidId = mongoose.Types.ObjectId.isValid(req.params.orgId);
  if (!isValidId) return res.status(404).json({message: 'Organization id not valid'});

  const org = await Organization.findById(req.params.orgId);
  if (org == null) return res.status(404).json({message: 'Organization id not found'});

  isValidId = mongoose.Types.ObjectId.isValid(req.params.evaluationId);
  if (!isValidId) return res.status(404).json({message: 'Evaluation id not valid'});

  const ev = await Evaluation.findById(req.params.evaluationId);
  if (ev == null) return res.status(404).json({message: 'Evaluation id not found'});

  if (ev.orgId.toString() !== req.params.orgId)
    return res.status(404).json({message: 'Evaluation id not found for this organization'});

  Evaluation.findByIdAndUpdate(req.params.evaluationId, {$set: {validated: true}}, async function(err, evaluation) {
    if (evaluation) {
      const loginURL = req.protocol + '://' + req.hostname + ':3001' + '/login';
      const message = {
        to: evaluation.lastEditEmail,
        from: 'HIDS Sustentabilidade Corporativa <sustentabilidade.unicamp@gmail.com>',
        subject: 'A avaliação de sua organização foi validada',
        text: `
          A avaliação editada por você para a sua organização foi validada.
          Para visualizá-la, acesse ` + loginURL + `.
        `,
        html: `
          <p>
            A avaliação editada por você para a sua organização foi <b>validada</b>.
          </p>
          <p>
            Para visualizá-la, <a href=` + loginURL + `>acesse o sistema</a>. 
          </p>
        `
      };

      await email.sendMail(message);

      res.status(200).send({...evaluation._doc, validated: true});
    } else if (evaluation == null && err == null) { // Unlikely scenario because we found it before
      res.status(404).json({message: 'Evaluation id not found'});
    } else {
      res.status(500).json({message: 'Unable to validate evaluation', error: err});
    }
  });

};

exports.finish = async function(req, res) {
  let isValidId = mongoose.Types.ObjectId.isValid(req.params.evaluationId);
  if (!isValidId) return res.status(404).json({message: 'Evaluation id not valid'});

  const ev = await Evaluation.findById(req.params.evaluationId);
  if (ev == null) return res.status(404).json({message: 'Evaluation id not found'});

  if (ev.orgId.toString() !== req.user.orgId.toString())
    return res.status(404).json({message: 'Evaluation id not found for this organization'});

  Evaluation.findByIdAndUpdate(req.params.evaluationId, {$set: {finished: true}}, function(err, evaluation) {
    if (evaluation) {
      res.status(200).send({...evaluation._doc, finished: true});
    } else if (evaluation == null && err == null) { // Unlikely scenario because we found it before
      res.status(404).json({message: 'Evaluation id not found'});
    } else {
      res.status(500).json({message: 'Unable to finish evaluation', error: err});
    }
  });
}

exports.invalidate = async function(req, res) {
  let isValidId = mongoose.Types.ObjectId.isValid(req.params.orgId);
  if (!isValidId) return res.status(404).json({message: 'Organization id not valid'});

  const org = await Organization.findById(req.params.orgId);
  if (org == null) return res.status(404).json({message: 'Organization id not found'});

  isValidId = mongoose.Types.ObjectId.isValid(req.params.evaluationId);
  if (!isValidId) return res.status(404).json({message: 'Evaluation id not valid'});

  const ev = await Evaluation.findById(req.params.evaluationId);
  if (ev == null) return res.status(404).json({message: 'Evaluation id not found'});

  if (ev.orgId.toString() !== req.params.orgId)
    return res.status(404).json({message: 'Evaluation id not found for this organization'});

  Evaluation.findByIdAndUpdate(req.params.evaluationId, {$set: {validated: false}}, async function(err, evaluation) {
    if (evaluation) {
      const loginURL = req.protocol + '://' + req.hostname + ':3001' + '/login';
      const message = {
        to: evaluation.lastEditEmail,
        from: 'HIDS Sustentabilidade Corporativa <sustentabilidade.unicamp@gmail.com>',
        subject: 'A avaliação de sua organização foi invalidada',
        text: `
          A avaliação editada por você para a sua organização foi invalidada.
          Para visualizá-la, acesse ` + loginURL + `.
        `,
        html: `
          <p>
            A avaliação editada por você para a sua organização foi <b>invalidada</b>.
          </p>
          <p>
            Para visualizá-la, <a href=` + loginURL + `>acesse o sistema</a>. 
          </p>
        `
      };

      await email.sendMail(message);

      res.status(200).send({...evaluation._doc, validated: false});
    } else if (evaluation == null && err == null) { // Unlikely scenario because we found it before
      res.status(404).json({message: 'Evaluation id not found'});
    } else {
      res.status(500).json({message: 'Unable to invalidate evaluation', error: err});
    }
  });
};

exports.getMine = function(req, res) {
  // Assuming users will not have ghost organizations
  if(!req.user.orgId){
    return res.status(404).json({message: 'User does not have an organization associated'});
  }

  let isValidId = mongoose.Types.ObjectId.isValid(req.params.evaluationId);
  if (!isValidId) return res.status(404).json({message: 'Evaluation id not valid'});

  Evaluation.findById(req.params.evaluationId, function(err, evaluation) {
    if (evaluation && evaluation.orgId.toString() === req.user.orgId.toString()) {
      res.status(200).json(evaluation);
    } else if (evaluation == null && err == null) {
      res.status(404).json({message: 'Evaluation id not found for this organization'});
    } else {
      res.status(500).json({message: 'Unable to get evaluation', error: err});
    }
  });
};

exports.get = async function(req, res) {
  let isValidId = mongoose.Types.ObjectId.isValid(req.params.orgId);
  if (!isValidId) return res.status(404).json({message: 'Organization id not valid'});

  const org = await Organization.findById(req.params.orgId);
  if (org == null) return res.status(404).json({message: 'Organization id not found'});

  isValidId = mongoose.Types.ObjectId.isValid(req.params.evaluationId);
  if (!isValidId) return res.status(404).json({message: 'Evaluation id not valid'});

  Evaluation.findById(req.params.evaluationId, function(err, evaluation) {
    if (evaluation && evaluation.orgId.toString() === req.params.orgId) {
      res.status(200).json(evaluation);
    } else if ((evaluation == null && err == null) || (evaluation && evaluation.orgId.toString() !== req.params.orgId)) {
      res.status(404).json({message: 'Evaluation id not found'});
    } else {
      res.status(500).json({message: 'Unable to get evaluation', error: err});
    }
  });
};

exports.listAllFromOrg = async function(req, res) {
  let isValidId = mongoose.Types.ObjectId.isValid(req.params.orgId);
  if (!isValidId) return res.status(404).json({message: 'Organization id not valid'});

  const org = await Organization.findById(req.params.orgId);
  if (org == null) return res.status(404).json({message: 'Organization id not found'});

  Evaluation.find({...req.query, orgId: req.params.orgId}, function(err, evaluation) {
    if (evaluation) {
      res.status(200).json(evaluation);
    } else {
      res.status(500).json({message: 'Unable to list all evaluations from this organization', error: err});
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
            results.push({
              _id: ev._id,
              organization: org,
              year: ev.year,
              validated: ev.validated,
              finished: ev.finished
            })
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
  // Assuming users will not have ghost organizations
  if(!req.user.orgId){
    return res.status(404).json({message: 'User does not have an organization associated'});
  }

  Evaluation.find({...req.query, orgId: req.user.orgId}, function(err, evaluation) {
    if (evaluation) {
      res.status(200).json(evaluation);
    } else {
      res.status(500).json({message: 'Unable to list all evaluations from this organization', error: err});
    }
  });
};

exports.deleteMine = async function(req, res) {
  // Assuming users will not have ghost organizations
  if(!req.user.orgId){
    return res.status(404).json({message: 'User does not have an organization associated'});
  }

  let isValidId = mongoose.Types.ObjectId.isValid(req.params.evaluationId);
  if (!isValidId) return res.status(404).json({message: 'Evaluation id not valid'});

  let ev = await Evaluation.findById(req.params.evaluationId);
  if (ev == null) return res.status(404).json({message: 'Evaluation id not found'});

  if(ev.orgId.toString() === req.user.orgId.toString()){
    Evaluation.deleteOne({_id: req.params.evaluationId}, function(err, evaluation) {
      if (evaluation) {
        res.status(200).json({message: 'Evaluation successfully deleted'});
      } else if (evaluation == null && err == null) {
        res.status(404).json({message: 'Evaluation id not found'});
      } else {
        res.status(500).json({message: 'Unable to delete evaluation', error: err});
      }
    });
  } else {
    res.status(404).json({message: 'Evaluation id not found for this organization'});
  }
};

exports.delete = async function(req, res) {
  let isValidId = mongoose.Types.ObjectId.isValid(req.params.orgId);
  if (!isValidId) return res.status(404).json({message: 'Organization id not valid'});

  const org = await Organization.findById(req.params.orgId);
  if (org == null) return res.status(404).json({message: 'Organization id not found'});

  isValidId = mongoose.Types.ObjectId.isValid(req.params.evaluationId);
  if (!isValidId) return res.status(404).json({message: 'Evaluation id not valid'});

  let ev = await Evaluation.findById(req.params.evaluationId);
  if (ev == null) return res.status(404).json({message: 'Evaluation id not found'});

  if(ev.orgId.toString() === req.params.orgId){
    Evaluation.deleteOne({_id: req.params.evaluationId}, function(err, evaluation) {
      if (evaluation) {
        res.status(200).json({message: 'Evaluation successfully deleted'});
      } else if (evaluation == null && err == null) { // Unlikely scenario because we found it before
        res.status(404).json({message: 'Evaluation id not found'});
      } else {
        res.status(500).json({message: 'Unable to delete evaluation', error: err});
      }
    });
  } else {
    res.status(404).json({message: 'Evaluation id not found for this organization'});
  }
};
