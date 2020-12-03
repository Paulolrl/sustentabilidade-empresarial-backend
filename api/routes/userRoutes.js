'use strict';

/**
 * @swagger
 * /user:
 *   get:
 *     tags: [User]
 *     summary: Gets the list of registered users
 *     description: "Gets a JSON list containing all user entries
 *       inside the database. Your authorization token must have admin access."
 *     responses:
 *       200:
 *         description: List of user objects
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/ListOfUsers'
 *       401:
 *         description: No authorization token provided or authentication failed
 *       403:
 *         description: User does not have enough privileges
 *       500:
 *         description: Unable to list all users
 *
 *   post:
 *     tags: [User]
 *     summary: Registers an user
 *     description: "Receives an user object and Firebase token and save this combination into the database.
 *                 The Firebase token provided as the header will be the user \"uid\" field."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/User'
 *     responses:
 *       200:
 *         description: The registered user JSON object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/UserMongo'
 *       400:
 *         description: JSON body is not valid
 *       401:
 *         description: Authentication with token failed
 *       500:
 *         description: Unable to register user
 *
 * /user/me:
 *   get:
 *     tags: [User]
 *     summary: Gets this user data.
 *     description: "Gets the user object that was registered using this user token."
 *     responses:
 *       200:
 *         description: The user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/UserMongo'
 *       401:
 *         description: Authentication with token failed
 *       404:
 *         description: This user does not exist in the database (but has a valid token)
 *
 *   put:
 *     tags: [User]
 *     summary: Updates this user
 *     description: "Updates the user object that was registered using this user token."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/User'
 *     responses:
 *       200:
 *         description: The updated user object
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#components/UserMongo'
 *       400:
 *         description: JSON body with syntax error
 *       401:
 *         description: Authentication with token failed
 *       404:
 *         description: This user does not exist in the database (but has a valid token)
 *       500:
 *         description: Unable to update user
 *
 *   delete:
 *     tags: [User]
 *     summary: Deletes this user
 *     description: "Deletes the user object that was registered using this user token."
 *     responses:
 *       200:
 *         description: Delete was successful
 *       401:
 *         description: Authentication with token failed
 *       404:
 *         description: This user does not exist in the database (but has a valid token)
 *       500:
 *         description: Unable to delete user
 *
 * /user/{userId}:
 *   parameters:
 *     - in: path
 *       name: userId
 *       schema:
 *         type: string
 *         required: true
 *         description: The user id
 *   get:
 *     tags: [User]
 *     summary: Gets an user by id
 *     description: "Gets an user object by its id from
 *       inside the database. Your authorization token must have admin access."
 *     responses:
 *       200:
 *         description: The user object matching the id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/UserMongo'
 *       401:
 *         description: Authentication with token failed
 *       403:
 *         description: User does not have enough privileges
 *       404:
 *         description: User id not found
 *       500:
 *         description: Unable to get user
 *
 *   put:
 *     tags: [User]
 *     summary: Updates an user
 *     description: "Updates an user object by its id.
 *       Your authorization token must have admin access."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/User'
 *     responses:
 *       200:
 *         description: The updated user object
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#components/UserMongo'
 *       400:
 *         description: JSON body with syntax error
 *       401:
 *         description: Authentication with token failed
 *       403:
 *         description: User does not have enough privileges
 *       404:
 *         description: User id not found
 *       500:
 *         description: Unable to update user
 *
 *   delete:
 *     tags: [User]
 *     summary: Deletes a user by id
 *     description: "Deletes an user object by its id.
 *       Your authorization token must have admin access."
 *     responses:
 *       200:
 *         description: Delete was successful
 *       401:
 *         description: Authentication with token failed
 *       403:
 *         description: User does not have enough privileges
 *       404:
 *         description: User id not found
 *       500:
 *         description: Unable to delete user
 * 
 * /user/{userId}/grant-admin-permission:
 *   parameters:
 *     - in: path
 *       name: userId
 *       schema:
 *         type: string
 *         required: true
 *         description: The user id
 *   put:
 *     tags: [User]
 *     summary: Grants admin privileges to an user
 *     description: "Search user by its id and grant them admin privileges.
 *       Your authorization token must have admin access."
 *     responses:
 *       200:
 *         description: The updated user object
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#components/UserMongo'
 *       401:
 *         description: Authentication with token failed
 *       403:
 *         description: User does not have enough privileges
 *       404:
 *         description: User id not found
 *       500:
 *         description: Unable to update user
 * 
 * /user/{userId}/revoke-admin-permission:
 *   parameters:
 *     - in: path
 *       name: userId
 *       schema:
 *         type: string
 *         required: true
 *         description: The user id
 *   put:
 *     tags: [User]
 *     summary: Revokes admin privileges to an user
 *     description: "Search user by its id and grant them admin privileges.
 *       Your authorization token must have admin access."
 *     responses:
 *       200:
 *         description: The updated user object
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#components/UserMongo'
 *       401:
 *         description: Authentication with token failed
 *       403:
 *         description: User does not have enough privileges
 *       404:
 *         description: User id not found
 *       500:
 *         description: Unable to update user
 * 
 * components:
 *   $ref: '../models/userModel.js'
 */
module.exports = function(app) {
  var user = require('../controllers/userController');
  var auth = require('../auth/auth');

  app.route('/user')
    .post(auth.verifyToken, user.add)
    .get(auth.verifyToken, auth.verifyAdmin, user.listAll);

  app.route('/user/me')
    .get(auth.verifyToken, user.getMe)
    .put(auth.verifyToken, user.updateMe)
    .delete(auth.verifyToken, user.deleteMe);

  app.route('/user/:userId')
    .get(auth.verifyToken, auth.verifyAdmin, user.get)
    .put(auth.verifyToken, auth.verifyAdmin, user.update)
    .delete(auth.verifyToken, auth.verifyAdmin, user.delete);

  app.route('/user/:userId/grant-admin-permission')
    .put(auth.verifyToken, auth.verifyAdmin, user.grantAdmin);

  app.route('/user/:userId/revoke-admin-permission')
    .put(auth.verifyToken, auth.verifyAdmin, user.revokeAdmin);
};
