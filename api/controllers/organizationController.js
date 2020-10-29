'use strict';


var mongoose = require('mongoose'),
  Organization = mongoose.model('Organizations');

exports.listAll = function(req, res) {
  Organization.find({}, function(err, organization) {
    if (err)
      res.send(err);
    res.json(organization);
  });
};

exports.create = function(req, res) {
  var new_task = new Organization(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
}

exports.get = function(req, res) {
  Organization.findById(req.params.orgId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update = function(req, res) {
  Organization.findOneAndUpdate({_id: req.params.orgId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete = function(req, res) {
  Organization.remove({
    _id: req.params.orgId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Organization successfully deleted' });
  });
};
