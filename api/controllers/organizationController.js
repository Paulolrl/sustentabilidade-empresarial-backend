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


exports.update = function(req, res) {
  Organization.findOneAndUpdate({_id: req.params.orgId}, req.body, {new: true}, function(err, organization) {
    if (err)
      res.send(err);
    res.json(organization);
  });
};


exports.delete = function(req, res) {
  Organization.remove({
    _id: req.params.orgId
  }, function(err, organization) {
    if (err)
      res.send(err);
    res.json({ message: 'Organization successfully deleted' });
  });
};
