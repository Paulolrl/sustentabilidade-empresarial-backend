'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User');

exports.add = function(req, res) {
  req.body.uid = req.uid;
  req.body.isAdmin = false;
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
  User.findOneAndUpdate({uid: req.uid}, req.body, function(err, user) {
    if (err) {
      res.send(err);
    } else if (!user) {
      res.status(404).send("User not found!");
    } else {
      res.send(user);
    }
  });
};

exports.get = function(req, res) {
  User.findOne({uid: req.uid}, function(err, user) {
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
  User.findOneAndDelete({uid: req.uid}, function(err, user) {
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
