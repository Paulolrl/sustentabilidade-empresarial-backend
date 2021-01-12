'use strict';

var mongoose = require('mongoose'),
  email = require('./emailController'),
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
  newInvite.save(async function(err, invite) {
    if (invite) {
      const loginURL = req.protocol + '://' + req.hostname + ':3001' + '/login';
      const message = {
        to: req.body.email,
        from: 'HIDS Sustentabilidade Corporativa <sustentabilidade.unicamp@gmail.com>',
        subject: 'Convite Para Colaborar Em Organização',
        text: `
          Você foi convidado por ` + req.email + ` para colaborar com a 
          avaliação da organização ` + org.name + ` no sistema de avaliação de 
          sustentabilidade corporativa do HIDS (Hub Internacional para o 
          Desenvolvimento Sustentável). 
          Para começar, acesse o sistema em ` + loginURL + `.
        `,
        html: `
          <p>
            Você foi convidado por ` + req.email + ` para colaborar com a
            avaliação da organização <b>` + org.name + `</b> no sistema de
            avaliação de sustentabilidade corporativa do HIDS (Hub Internacional
            para o Desenvolvimento Sustentável).
          </p>
          <p>
            Para começar, <a href=` + loginURL + `>acesse o sistema</a>.
          </p>
        `
      };

      await email.sendMail(message);

      res.status(200).json(invite);
    } else {
      res.status(500).json({message: 'Unable to register invite', error: err});
    }
  });
};

exports.get = function(req, res) {
  Invite.findById(req.params.inviteId, async function(err, invite) {
    if (invite && (invite.fromUserId.toString() == req.user._id || invite.toUserEmail == req.user.email)) {
      let org = await Organization.findById(invite.orgId);
      let fromUser = await User.findById(invite.fromUserId);
      res.status(200).json({...invite._doc, organization: org, fromUserEmail: fromUser.email});
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
            res.status(200).send({...invite._doc, seen: true, accepted: true});
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
