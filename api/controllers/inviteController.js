'use strict';

var mongoose = require('mongoose'),
  nodemailer = require('nodemailer'),
  transporterConfig = require('../nodemailer/transporterConfig'),
  Invite = mongoose.model('Invite'),
  Organization = mongoose.model('Organizations');


exports.add = async function(req, res) {
  const org = await Organization.findById(req.user.orgId);
  if (org == null) {
    return res.status(404).json({message: 'Organization id not found'});
  }

  let body = {
    toUserEmail: req.body.email,
    fromUserId: req.user._id,
    orgId: req.user.orgId,
    seen: false,
    accepted: false
  }

  const newInvite = new Invite(body);
  newInvite.save(function(err, invite) {
    if (invite) {
      const transporter = nodemailer.createTransport(transporterConfig);

      // Verify connection configuration.
      transporter.verify(function(error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });

      const message = {
        from: 'Sustentabilidade Corporativa HIDS <sustentabilidade.unicamp@gmail.com>',
        to: req.body.email,
        subject: 'Convite Para Colaborar Em Organização',
        html: `
          <p>
            Você foi convidado por ` + req.email + ` para colaborar com a
            avaliação da organização <b>` + org.name + `</b> no sistema de
            avaliação de sustentabilidade corporativa do HIDS (Hub Internacional
            para o Desenvolvimento Sustentável).
          </p>
          <p>
            Para começar, <a href="#">acesse o sistema</a>.
          </p>
        `
      };

      transporter.sendMail(message, (err, info) => {
        if (err) {
            return console.log(err);
        }
        console.log('Message sent: %s', info.messageId);
      });

      res.status(200).json(invite);
    } else {
      res.status(500).json({message: 'Unable to register invite', error: err});
    }
  });
};

exports.get = function(req, res) {
  Invite.findById(req.params.inviteId, function(err, invite) {
    if (invite && (invite.fromUserId.toString() == req.user._id || invite.toUserEmail == req.user.email)) {
      res.status(200).json(invite);
    } else if (invite == null && err == null) {
      res.status(404).json({message: 'Invite id not found'});
    } else {
      res.status(500).json({message: 'Unable to get invite', error: err});
    }
  });
};

exports.acceptInvite = async function(req, res) {

  const inv = await Invite.findById(req.params.inviteId);
  if (inv == null) return res.status(404).json({message: 'Invite id not found'});

  if(inv.toUserEmail == req.user.email && !inv.accepted){
    Invite.findByIdAndUpdate(req.params.inviteId, {$set: {seen: true, accepted: true}}, function(err, invite) {
      if (invite) {
        User.findByIdAndUpdate(req.user._id, {$set: {orgId: invite.orgId}}, function(err, user) {
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
  } else {
    res.status(401).json({message: 'Unable to accept invite'});
  }
};

exports.markInviteAsSeen = async function(req, res) {

  const inv = await Invite.findById(req.params.inviteId);
  if (inv == null) return res.status(404).json({message: 'Invite id not found'});

  if(inv.toUserEmail == req.user.email){
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
  Invite.find({ $or: [{toUserEmail: req.user.email}, {fromUserId: req.user._id}]}, async function(err, invite) {
    if (invite) {
      let results = [];
      for(let i = 0; i < invite.length; i++){
        let inv = invite[i];
        let org = await Organization.findById(inv.orgId);
        let fromUser = await User.findById(inv.fromUserId);
        results.push({
          ...inv._doc,
          fromUserEmail: fromUser.email,
          organization: org
        });
      }
      res.status(200).json(results);
    } else {
      res.status(500).json({message: 'Unable to list all dimensions', error: err});
    }
  });
};

exports.delete = async function(req, res) {
  const inv = await Invite.findById(req.params.inviteId);
  if (inv == null) return res.status(404).json({message: 'Invite id not found'});

  if(inv.toUserEmail == req.user.email || inv.fromUserId.toString() == req.user._id){
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
