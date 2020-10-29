'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User');

exports.add = function(req, res) {
  const newUser = new User(req.body);
  newUser.save(function(err, user) {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });
};

exports.update = function(req, res) {
  User.findByIdAndUpdate(req.params.userId, req.body, function(err, user) {
    if (err) {
      res.send(err);
    } else if (!user) {
      res.status(404).send("User not found!");
    } else {
      res.send("User matching the ID was modified!");
    }
  });
};

exports.get = function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });
};

exports.listAll = function(req, res) {
  User.find({}, function(err, user) {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });
};

exports.delete = function(req, res) {
  User.findByIdAndDelete(req.params.userId, function(err, user) {
    if (err) {
      res.send(err);
    } else if (!user) {
      res.status(404).send("User not found!");
    } else {
      res.send("User matching the ID was deleted!");
    }
  });
};

// TODO: remove this before production
exports.deleteAll = function(req, res) {
  User.deleteMany({}, function(err, user) {
    if (err) {
      res.send(err);
    } else {
      res.send("All user deleted!");
    }
  });
};
