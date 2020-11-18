'use strict';

/**
 * @swagger
 * /organizations:
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
 * 
 * /organizations/{orgId}:
 *   get:
 *     tags: [Organization]
 *     summary: Gets an organization by id
 *     parameters:
 *       - in: path
 *         name: orgId
 *         schema:
 *           type: string
 *           required: true
 *           description: The organization id
 *     responses:
 *       200:
 *         description: The organization object matching the id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/OrganizationMongo'
 *       404:
 *         description: Organization id not found
 * 
 *   put:
 *     tags: [Organization]
 *     summary: Updates an organization
 *     parameters:
 *       - in: path
 *         name: orgId
 *         schema:
 *           type: string
 *           required: true
 *           description: The organization id
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
 * 
 *   delete:
 *     tags: [Organization]
 *     summary: Deletes a organization by id
 *     parameters:
 *       - in: path
 *         name: orgId
 *         schema:
 *           type: string
 *           required: true
 *           description: The organization id
 *     responses:
 *       200:
 *         description: Delete was successful
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
