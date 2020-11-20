'use strict';

/**
 * @swagger
 * /user/me:
 *   get:
 *     tags: [User]
 *     summary: Gets an user by their Firebase authentication token
 *     responses:
 *       200:
 *         description: The user object matching the id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/UserMongo'
 *       401:
 *         description: Authentication with token failed
 * 
 *   put:
 *     tags: [User]
 *     summary: Updates an user by their Firebase authentication token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/User'
 *     responses:
 *       200:
 *         description: Update was successful
 *       401:
 *         description: Authentication with token failed
 * 
 *   delete:
 *     tags: [User]
 *     summary: Deletes an user by their Firebase authentication token
 *     responses:
 *       200:
 *         description: Delete was successful
 *       401:
 *         description: Authentication with token failed
 * 
 * components:
 *   $ref: '../models/userModel.js'
 */
module.exports = function(app) {
  var user = require('../controllers/userController');
  var auth = require('../auth/auth');

  app.route('/user')
    .post(auth.verifyToken, user.add)
    .get(auth.verifyToken, auth.verifyAdmin, user.listAll)
    .delete(auth.verifyToken, auth.verifyAdmin, user.deleteAll);

  app.route('/user/me')
    .get(auth.verifyToken, user.getMe)
    .put(auth.verifyToken, user.updateMe)
    .delete(auth.verifyToken, user.deleteMe);

  app.route('/user/:userId')
    .get(auth.verifyToken, auth.verifyAdmin, user.get)
    .put(auth.verifyToken, auth.verifyAdmin, user.update)
    .delete(auth.verifyToken, auth.verifyAdmin, user.delete);
};
