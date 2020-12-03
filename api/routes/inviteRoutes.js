'use strict';

module.exports = function(app) {
  var invite = require('../controllers/inviteController');
  var auth = require('../auth/auth');

  app.route('/organization/mine/invite')
    .get(auth.verifyToken, invite.listMyInvites)
    .post(auth.verifyToken, invite.add);

  app.route('/organization/mine/invite/:inviteId')
    .get(auth.verifyToken, invite.get)
    .delete(auth.verifyToken, invite.delete);

  app.route('/organization/mine/invite/:inviteId/mark')
      .put(auth.verifyToken, invite.markInviteAsSeen);

  app.route('/organization/mine/invite/:inviteId/accept')
      .put(auth.verifyToken, invite.acceptInvite);
};
