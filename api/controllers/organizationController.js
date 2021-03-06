'use strict';


var mongoose = require('mongoose'),
  user = require('./userController'),
  Organization = mongoose.model('Organizations');

exports.listAll = function(req, res) {
  let page = parseInt(req.query.page || 0);
  let limit = parseInt(req.query.pageSize) || 10;
  let skip = page * limit;

  if(req.query.name && req.query.name != '')
    req.query.$text = {$search: req.query.name};

  delete req.query.name;
  delete req.query.pageSize;
  delete req.query.page;

  Organization.find(req.query)
  .skip(skip).limit(limit).exec(function(err, organization) {
    if (organization) {
      Organization.countDocuments(req.query).exec((count_error, count) => {
        if (err) {
          res.status(500).json({message: 'Unable to count list', error: count_error});
        } else {
          res.status(200).json({
            total: count,
            page,
            pageSize: organization.length,
            results: organization
          });
        }
      });
    } else {
      res.status(500).json({message: 'Unable to list all organizations', error: err});
    }
  });
};

exports.add = function(req, res) {
  var newOrg = new Organization(req.body);
  newOrg.save(function(err, organization) {
    if (organization) {
      user.setOrgId(req.uid, organization._id);
      res.status(200).json(organization);
    } else {
      res.status(500).json({message: 'Unable to register organization', error: err});
    }
  });
}

exports.get = function(req, res) {
  const isValidId = mongoose.Types.ObjectId.isValid(req.params.orgId);
  if (!isValidId) return res.status(404).json({message: 'Organization id not found'});

  Organization.findById(req.params.orgId, function(err, organization) {
    if (organization) {
      res.status(200).json(organization);
    } else if (organization == null && err == null) {
      res.status(404).json({message: 'Organization id not found'});
    } else {
      res.status(500).json({message: 'Unable to get organization', error: err});
    }
  });
};

exports.getMine = function(req, res) {
  Organization.findById(req.user.orgId, function(err, organization) {
    if (organization) {
      res.status(200).json(organization);
    } else if (organization == null && err == null) {
      res.status(404).json({message: 'This user does not have an organization'});
    } else {
      res.status(500).json({message: 'Unable to get organization', error: err});
    }
  });
};


exports.update = function(req, res) {
  const isValidId = mongoose.Types.ObjectId.isValid(req.params.orgId);
  if (!isValidId) return res.status(404).json({message: 'Organization id not found'});

  Organization.findByIdAndUpdate(req.params.orgId, {$set: req.body}, function(err, organization) {
    if (organization) {
      res.status(200).send({...organization._doc, ...req.body});
    } else if (organization == null && err == null) {
      res.status(404).json({message: 'Organization id not found'});
    } else {
      res.status(500).json({message: 'Unable to update organization', error: err});
    }
  });
};

exports.updateMine = function(req, res) {
  Organization.findByIdAndUpdate(req.user.orgId, {$set: req.body}, function(err, organization) {
    if (organization) {
      res.status(200).send({...organization._doc, ...req.body});
    } else if (organization == null) {
      res.status(404).json({message: 'This user does not have an organization', error: err});
    } else {
      res.status(500).json({message: 'Unable to update organization', error: err});
    }
  });
};

exports.delete = function(req, res) {
  const isValidId = mongoose.Types.ObjectId.isValid(req.params.orgId);
  if (!isValidId) return res.status(404).json({message: 'Organization id not found'});

  Organization.deleteOne({_id: req.params.orgId}, function(err, organization) {
    if (organization) {
      res.status(200).json({message: 'Organization successfully deleted'});
    } else if (organization == null && err == null) {
      res.status(404).json({message: 'Organization id not found'});
    } else {
      res.status(500).json({message: 'Unable to delete organization', error: err});
    }
  });
};

exports.deleteMine = function(req, res) {
  Organization.deleteOne({_id: req.user.orgId}, function(err, organization) {
    if (organization) {
      res.status(200).json({message: 'Organization successfully deleted'});
    } else if (organization == null) {
      res.status(404).json({message: 'This user does not have an organization', error: err});
    } else {
      res.status(500).json({message: 'Unable to delete organization', error: err});
    }
  });
};
