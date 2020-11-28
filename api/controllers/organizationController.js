'use strict';


var mongoose = require('mongoose'),
  user = require('./userController'),
  Organization = mongoose.model('Organizations');

exports.listAll = function(req, res) {
  Organization.find({}, function(err, organization) {
    if (organization) {
      res.status(200).json(organization);
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
  Organization.findById(req.params.orgId, function(err, organization) {
    if (organization) {
      res.status(200).json(organization);
    } else if (organization == null) {
      res.status(404).json({message: 'Organization id not found', error: err});
    } else {
      res.status(500).json({message: 'Unable to get organization', error: err});
    }
  });
};

exports.getMine = function(req, res) {
  Organization.findById(req.user.orgId, function(err, organization) {
    if (organization) {
      res.status(200).json(organization);
    } else if (organization == null) {
      res.status(404).json({message: 'This user does not have an organization', error: err});
    } else {
      res.status(500).json({message: 'Unable to get organization', error: err});
    }
  });
};


exports.update = function(req, res) {
  Organization.findByIdAndUpdate(req.params.orgId, {$set: req.body}, function(err, organization) {
    if (organization) {
      res.status(200).send({...organization._doc, ...req.body});
    } else if (organization == null) {
      res.status(404).json({message: 'Organization id not found', error: err});
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
  Organization.findByIdAndDelete(req.params.orgId, function(err, organization) {
    if (organization) {
      res.status(200).json({message: 'Organization successfully deleted'});
    } else if (organization == null) {
      res.status(404).json({message: 'Organization id not found', error: err});
    } else {
      res.status(500).json({message: 'Unable to delete organization', error: err});
    }
  });
};

exports.deleteMine = function(req, res) {
  Organization.findByIdAndDelete(req.user.orgId, function(err, organization) {
    if (organization) {
      res.status(200).json({message: 'Organization successfully deleted'});
    } else if (organization == null) {
      res.status(404).json({message: 'This user does not have an organization', error: err});
    } else {
      res.status(500).send({message: 'Unknown error', error: err});
    }
  });
};
