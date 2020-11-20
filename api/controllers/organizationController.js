'use strict';


var mongoose = require('mongoose'),
  user = require('./userController'),
  Organization = mongoose.model('Organizations');

exports.listAll = function(req, res) {
  Organization.find({}, function(err, organization) {
    if (err)
      res.send(err);
    else{
      res.json(organization);
    }
  });
};

exports.add = function(req, res) {
  var newOrg = new Organization(req.body);
  newOrg.save(function(err, organization) {
    if (err)
      res.send(err);
    else{
      user.setOrgId(req.uid, organization._id);
      res.json(organization);
    }
  });
}

exports.get = function(req, res) {
  Organization.findById(req.params.orgId, function(err, organization) {
    if (err)
      res.send(err);
    res.json(organization);
  });
};

exports.getMine = function(req, res) {
  Organization.findById(req.user.orgId, function(err, organization) {
    if (err)
      res.send(err);
    res.json(organization);
  });
};


exports.update = function(req, res) {
  Organization.findByIdAndUpdate(req.params.orgId, {$set: req.body}, function(err, organization) {
    if (err)
      res.send(err);
    else
      res.send({...organization._doc, ...req.body});
  });
};

exports.updateMine = function(req, res) {
  Organization.findByIdAndUpdate(req.user.orgId, {$set: req.body}, function(err, organization) {
    if (err)
      res.send(err);
    else
      res.send({...organization._doc, ...req.body});
  });
};

exports.delete = function(req, res) {
  Organization.findByIdAndDelete(req.params.orgId, function(err, organization) {
    if (err)
      res.send(err);
    res.json({ message: 'Organization successfully deleted' });
  });
};

exports.deleteMine = function(req, res) {
  Organization.findByIdAndDelete(req.user.orgId, function(err, organization) {
    if (err)
      res.send(err);
    res.json({ message: 'Organization successfully deleted' });
  });
};
