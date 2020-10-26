'use strict';

const mongoose = require('mongoose'),
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

exports.listAll = function(req, res) {
  User.find({}, function(err, user) {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });
};

exports.deleteAll = function(req, res) {
  User.deleteMany({}, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.send("Users matching requisition were deleted!");
    }
  });
};