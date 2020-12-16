'use strict';

/**
 * @swagger
 * /organization/mine/invite:
 *   get:
 *     tags: [Invite]
 *     summary: Gets the list of sent invites
 *     description: "Gets a JSON list containing all invite entries sent from this user
 *       inside the database. The invites are related to this user's organization"
 *     responses:
 *       200:
 *         description: List of invite objects
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/ListOfInvites'
 *       401:
 *         description: No authorization token provided or authentication failed
 *       500:
 *         description: Unable to list all invites
 * 
 *   post:
 *     tags: [Invite]
 *     summary: Sends an invite
 *     description: "Sends an invite to someone's email. This invite will link the person to a signup screen and, after creation,
 *       the person will have an account with this user's organization. The invite will also be saved on the database"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/InvitePost'
 *     responses:
 *       200:
 *         description: The registered invite JSON object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/InviteMongo'
 *       400:
 *         description: JSON body with syntax error
 *       401:
 *         description: Authentication with token failed
 *       404:
 *         description: This user does not have an organization
 *       500:
 *         description: Unable to send and/or add invite
 * 
 * components:
 *   $ref: '../models/inviteModel.js'
 */
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
