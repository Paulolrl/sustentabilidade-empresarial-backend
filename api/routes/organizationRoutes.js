'use strict';

/**
 * @swagger
 * /organization:
 *   get:
 *     tags: [Organization]
 *     summary: Gets the list of registered organizations
 *     responses:
 *       200:
 *         description: List of organization objects
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/ListOfOrgs'
 *       401:
 *         description: Authentication with token failed
 * 
 *   post:
 *     tags: [Organization]
 *     summary: Registers an organization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Organization'
 *     responses:
 *       200:
 *         description: The registered organization
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/OrganizationMongo'
 *       400:
 *         description: JSON body with syntax error
 *       401:
 *         description: Authentication with token failed
 * 
 * /organization/{orgId}:
 *   parameters:
 *     - in: path
 *       name: orgId
 *       schema:
 *         type: string
 *         required: true
 *         description: The organization id
 *   get:
 *     tags: [Organization]
 *     summary: Gets an organization by id
 *     responses:
 *       200:
 *         description: The organization object matching the id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/OrganizationMongo'
 *       401:
 *         description: Authentication with token failed
 *       404:
 *         description: Organization id not found
 * 
 *   put:
 *     tags: [Organization]
 *     summary: Updates an organization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Organization'
 *     responses:
 *       200:
 *         description: The updated organization object
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#components/OrganizationMongo'
 *       400:
 *         description: JSON body with syntax error
 *       401:
 *         description: Authentication with token failed
 *       404:
 *         description: Organization id not found
 * 
 *   delete:
 *     tags: [Organization]
 *     summary: Deletes a organization by id
 *     responses:
 *       200:
 *         description: Delete was successful
 *       401:
 *         description: Authentication with token failed
 *       404:
 *         description: Organization id not found
 * 
 * components:
 *   $ref: '../models/organizationModel.js'
 */
module.exports = function(app) {
  var organizations = require('../controllers/organizationController');
  var fbAuth = require('../../firebaseAuth');

  // todoList Routes
  app.route('/organization')
    .get(fbAuth, organizations.listAll)
    .post(fbAuth, organizations.add)

  app.route('/organization/:orgId')
    .get(fbAuth, organizations.get)
    .put(fbAuth, organizations.update)
    .delete(fbAuth, organizations.delete);
};
