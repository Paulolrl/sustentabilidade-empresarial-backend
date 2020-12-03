'use strict';

var mongoose = require('mongoose'),
  Invite = mongoose.model('Invite');

exports.add = async function(req, res) {
  let userInvited = await User.findOne({email: req.body.email});

  if (req.user.orgId == null) return res.status(500).json({message: 'User does not have organization associated'});
  if (userInvited == null) return res.status(404).json({message: 'User email not found'});

  let body = {
    toUserId: userInvited._id,
    fromUserId: req.user._id,
    orgId: req.user.orgId,
    seen: false,
    accepted: false
  }

  const newInvite = new Invite(body);
  newInvite.save(function(err, invite) {
    if (invite) {
      res.status(200).json(invite);
    } else {
      res.status(500).json({message: 'Unable to register invite', error: err});
    }
  });
};

exports.get = function(req, res) {
  Invite.findById(req.params.inviteId, function(err, invite) {
    if (invite && (invite.fromUserId.toString() == req.user._id || invite.toUserId.toString() == req.user._id)) {
      res.status(200).json(invite);
    } else if (invite == null && err == null) {
      res.status(404).json({message: 'Invite id not found'});
    } else {
      res.status(500).json({message: 'Unable to get invite', error: err});
    }
  });
};

exports.acceptInvite = function(req, res) {


  Invite.findByIdAndUpdate(req.params.inviteId, {$set: {seen: true, accepted: true}}, function(err, invite) {
    if (invite && invite.toUserId.toString() == req.user._id) {
      User.findByIdAndUpdate(invite.toUserId, {$set: {orgId: invite.orgId}}, function(err, user) {
        if (user) {
          res.status(200).send({message: 'Invite accepted'});
        } else if (invite == null && err == null) {
          res.status(404).json({message: 'User id not found'});
        } else {
          res.status(500).json({message: 'Unable to update user', error: err});
        }
      });
    } else if (invite == null && err == null) {
      res.status(404).json({message: 'Invite id not found'});
    } else {
      res.status(500).json({message: 'Unable to accept invite', error: err});
    }
  });
};

exports.markInviteAsSeen = async function(req, res) {

  const inv = await Invite.findById(req.params.inviteId);
  if (inv == null) return res.status(404).json({message: 'Invite id not found'});

  if(inv.toUserId.toString() == req.user._id){
    Invite.findByIdAndUpdate(req.params.inviteId, {$set: {seen: true}}, function(err, invite) {
      if (invite) {
        res.status(200).json({...invite._doc, seen: true});
      } else if (invite == null && err == null) {
        res.status(404).json({message: 'Invite id not found'});
      } else {
        res.status(500).json({message: 'Unable to update invite', error: err});
      }
    });
  } else {
    res.status(401).json({message: 'Unable to update invite'});
  }

};

exports.listMyInvites = function(req, res) {
  Invite.find({ $or: [{toUserId: req.user._id}, {fromUserId: req.user._id}]}, function(err, invite) {
    if (invite) {
      res.status(200).json(invite);
    } else {
      res.status(500).json({message: 'Unable to list all dimensions', error: err});
    }
  });
};

exports.delete = async function(req, res) {
  const inv = await Invite.findById(req.params.inviteId);
  if (inv == null) return res.status(404).json({message: 'Invite id not found'});


  if(inv.toUserId.toString() == req.user._id || inv.fromUserId.toString() == req.user._id){
    Invite.deleteOne({_id: req.params.inviteId}, function(err, invite) {
      if (invite) {
        res.status(200).json({message: 'Invite successfully deleted'});
      } else if (dimension == null && err == null) {
        res.status(404).json({message: 'Invite id not found'});
      } else {
        res.status(500).json({message: 'Unable to delete invite', error: err});
      }
    });
  } else {
    res.status(401).json({message: 'Unable to delete invite'});
  }

};
