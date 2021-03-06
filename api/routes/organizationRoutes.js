'use strict';

/**
 * @swagger
 * /organization:
 *   get:
 *     tags: [Organization]
 *     summary: Gets the list of registered organizations
 *     description: "Gets a JSON list containing all organization entries 
 *       inside the database. Your authorization token must have admin access."
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: The page number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: number
 *         description: Number of results per page
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter results by name
 *     responses:
 *       200:
 *         description: List of organization objects
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/ListOfOrgs'
 *       401:
 *         description: No authorization token provided or authentication failed
 *       403:
 *         description: User does not have enough privileges
 *       500:
 *         description: Unable to list all organizations
 *   post:
 *     tags: [Organization]
 *     summary: Registers an organization
 *     description: "Receives an organization object and save it into the database."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Organization'
 *     responses:
 *       200:
 *         description: The registered organization JSON object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/OrganizationMongo'
 *       400:
 *         description: JSON body is not valid
 *       401:
 *         description: Authentication with token failed
 *       500:
 *         description: Unable to register organization
 * 
 * /organization/mine:
 *   get:
 *     tags: [Organization]
 *     summary: Gets the user's organization.
 *     description: "Gets the organization object that was registered using this user token."
 *     responses:
 *       200:
 *         description: The user's organization
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/OrganizationMongo'
 *       401:
 *         description: Authentication with token failed
 *       404:
 *         description: This user does not have an organization
 *       500:
 *         description: Unable to get organization
 * 
 *   put:
 *     tags: [Organization]
 *     summary: Updates the user's organization
 *     description: "Updates the organization object that was registered using this user token."
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
 *         description: This user does not have an organization
 *       500:
 *         description: Unable to update organization
 * 
 *   delete:
 *     tags: [Organization]
 *     summary: Deletes the user's organization
 *     description: "Deletes the organization object that was registered using this user token."
 *     responses:
 *       200:
 *         description: Delete was successful
 *       401:
 *         description: Authentication with token failed
 *       404:
 *         description: This user does not have an organization
 *       500:
 *         description: Unable to delete organization
 * 
 * /organization/{orgId}:
 *   parameters:
 *     - in: path
 *       name: orgId
 *       schema:
 *         type: string
 *         required: true
 *       description: The organization id
 *   get:
 *     tags: [Organization]
 *     summary: Gets an organization by id
 *     description: "Gets an organization object by its id from 
 *       inside the database. Your authorization token must have admin access."
 *     responses:
 *       200:
 *         description: The organization object matching the id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/OrganizationMongo'
 *       401:
 *         description: Authentication with token failed
 *       403:
 *         description: User does not have enough privileges
 *       404:
 *         description: Organization id not found
 *       500:
 *         description: Unable to get organization
 * 
 *   put:
 *     tags: [Organization]
 *     summary: Updates an organization
 *     description: "Updates an organization object by its id. 
 *       Your authorization token must have admin access."
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
 *       403:
 *         description: User does not have enough privileges
 *       404:
 *         description: Organization id not found
 *       500:
 *         description: Unable to update organization
 * 
 *   delete:
 *     tags: [Organization]
 *     summary: Deletes a organization by id
 *     description: "Deletes an organization object by its id. 
 *       Your authorization token must have admin access."
 *     responses:
 *       200:
 *         description: Delete was successful
 *       401:
 *         description: Authentication with token failed
 *       403:
 *         description: User does not have enough privileges
 *       404:
 *         description: Organization id not found
 *       500:
 *         description: Unable to delete organization
 * 
 * components:
 *   $ref: '../models/organizationModel.js'
 */
module.exports = function(app) {
  var organizations = require('../controllers/organizationController');
  var auth = require('../auth/auth');

  app.route('/organization')
    .get(auth.verifyToken, auth.verifyAdmin, organizations.listAll)
    .post(auth.verifyToken, organizations.add)

  app.route('/organization/mine')
    .get(auth.verifyToken, organizations.getMine)
    .put(auth.verifyToken, organizations.updateMine)
    .delete(auth.verifyToken, organizations.deleteMine);

  app.route('/organization/:orgId')
    .get(auth.verifyToken, auth.verifyAdmin, organizations.get)
    .put(auth.verifyToken, auth.verifyAdmin, organizations.update)
    .delete(auth.verifyToken, auth.verifyAdmin, organizations.delete);
};
