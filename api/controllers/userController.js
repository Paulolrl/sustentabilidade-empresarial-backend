'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User');

async function findByUid(uid){
  let user = await User.findOne({uid});
  return user;
}

exports.getByUid = async function(uid){
  return await findByUid(uid);
}

exports.add = function(req, res) {
  req.body.uid = req.uid;
  req.body.isAdmin = false;
  const newUser = new User(req.body);
  newUser.save(function(err, user) {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(500).json({message: 'Unable to register user', error: err});
    }
  });
};

exports.updateMe = function(req, res) {
  req.body.uid = req.uid;
  User.findOneAndUpdate({uid: req.uid}, {$set: req.body}, function(err, user) {
    if (user) {
      res.status(200).send({...user._doc, ...req.body});
    } else if (user == null && err == null) {
      res.status(404).json({message: 'This user does not exist'});
    } else {
      res.status(500).json({message: 'Unable to update user', error: err});
    }
  });
};

exports.update = function(req, res) {
  const isValidId = mongoose.Types.ObjectId.isValid(req.params.userId);
  if (!isValidId) return res.status(404).json({message: 'User id not found'});

  delete req.body.isAdmin;

  User.findByIdAndUpdate(req.params.userId, {$set: req.body}, function(err, user) {
    if (user) {
      res.status(200).send({...user._doc, ...req.body});
    } else if (user == null && err == null) {
      res.status(404).json({message: 'User id not found'});
    } else {
      res.status(500).json({message: 'Unable to update user', error: err});
    }
  });
};

exports.grantAdmin = function(req, res) {
  User.findByIdAndUpdate(req.params.userId, {$set: {isAdmin: true}}, function(err, user) {
    if (user) {
      res.status(200).send({...user._doc, isAdmin: true});
    } else if (user == null && err == null) {
      res.status(404).json({message: 'User id not found'});
    } else {
      res.status(500).json({message: 'Unable to update user', error: err});
    }
  });
};

exports.revokeAdmin = function(req, res) {
  User.findByIdAndUpdate(req.params.userId, {$set: {isAdmin: false}}, function(err, user) {
    if (user) {
      res.status(200).send({...user._doc, isAdmin: false});
    } else if (user == null && err == null) {
      res.status(404).json({message: 'User id not found'});
    } else {
      res.status(500).json({message: 'Unable to update user', error: err});
    }
  });
};

exports.getMe = async function(req, res) {
  if (req.user == null) {
    res.status(404).json({message: 'Valid token but unable to find user in database'});
  } else {
    res.json(req.user);
  }
};

exports.get = async function(req, res) {
  const isValidId = mongoose.Types.ObjectId.isValid(req.params.userId);
  if (!isValidId) return res.status(404).json({message: 'User id not found'});

  User.findById(req.params.userId, function(err, user) {
    if (user) {
      res.status(200).json(user);
    } else if (user == null && err == null) {
      res.status(404).json({message: 'User id not found'});
    } else {
      res.status(500).json({message: 'Unable to get user', error: err});
    }
  });
};

exports.listAll = function(req, res) {
  let page = parseInt(req.query.page || 0);
  let limit = parseInt(req.query.pageSize) || 10;
  let skip = page * limit;

  if(req.query.name && req.query.name != '')
    req.query.$text = {$search: req.query.name};

  delete req.query.name;
  delete req.query.pageSize;
  delete req.query.page;

  User.find(req.query)
  .skip(skip).limit(limit).exec(function(err, user) {
    if (user) {
      User.countDocuments(req.query).exec((count_error, count) => {
        if (err) {
          res.status(500).json({message: 'Unable to count list', error: count_error});
        } else {
          res.status(200).json({
            total: count,
            page,
            pageSize: user.length,
            results: user
          });
        }
      });
    } else {
      res.status(500).json({message: 'Unable to list all users', error: err});
    }
  });
};

exports.deleteMe = function(req, res) {
  User.findOneAndDelete({uid: req.uid}, function(err, user) {
    if (user) {
      res.status(200).json({message: 'User successfully deleted'});
    } else if (user == null && err == null) {
      res.status(404).json({message: 'This user does not exist'});
    } else {
      res.status(500).json({message: 'Unable to delete user', error: err});
    }
  });
};

exports.delete = function(req, res) {
  const isValidId = mongoose.Types.ObjectId.isValid(req.params.userId);
  if (!isValidId) return res.status(404).json({message: 'User id not found'});

  User.deleteOne({_id: req.params.userId}, function(err, user) {
    if (user) {
      res.status(200).json({message: 'User successfully deleted'});
    } else if (user == null && err == null) {
      res.status(404).json({message: 'User id not found'});
    } else {
      res.status(500).json({message: 'Unable to delete user', error: err});
    }
  });
};

exports.setOrgId = function(uid, orgId) {
  User.findOneAndUpdate({uid}, {$set: {orgId}}, function(err, user) {
    if (err) {
      console.log(err);
    }
  });
};
