'use strict';

/**
 * @swagger
 * /user:
 *   get:
 *     tags: [User]
 *     summary: Gets the list of all users
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/ListOfUsers'
 * 
 *   post:
 *     tags: [User]
 *     summary: Registers a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/User'
 *     responses:
 *       200:
 *         description: The registered user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/UserMongo'
 * 
 *   delete:
 *     tags: [User]
 *     summary: Deletes all users
 *     responses:
 *       200:
 *         description: Delete was successful
 * 
 * /user/{userId}:
 *   get:
 *     tags: [User]
 *     summary: Gets a user by id
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *           required: true
 *           description: The user id
 *     responses:
 *       200:
 *         description: The user object matching the id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/UserMongo'
 *       404:
 *         description: User id not found
 * 
 *   put:
 *     tags: [User]
 *     summary: Updates a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *           required: true
 *           description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/User'
 *     responses:
 *       200:
 *         description: Update was successful
 * 
 *   delete:
 *     tags: [User]
 *     summary: Deletes a user by id
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *           required: true
 *           description: The user id
 *     responses:
 *       200:
 *         description: Delete was successful
 * 
 * components:
 *   $ref: '../models/userModel.js'
 */
module.exports = function(app) {
  var user = require('../controllers/userController');
  var fbAuth = require('../../firebaseAuth');

  app.route('/user')
    .post(fbAuth, user.add);
    // .get(fbAuth, user.listAll)
    // .delete(fbAuth, user.deleteAll);

  app.route('/user/me')
    .get(fbAuth, user.get)
    .put(fbAuth, user.update)
    .delete(fbAuth, user.delete);
};
