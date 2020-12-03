'use strict';

/**
 * @swagger
 * /dimension/{dimensionId}/criteria:
 *   parameters:
 *     - in: path
 *       name: dimensionId
 *       schema:
 *         type: string
 *         required: true
 *       description: The dimension id
 *   get:
 *     tags: [Criteria]
 *     summary: Gets the list of registered criteria of a dimension
 *     description: "Gets a JSON list containing all dimension entries 
 *       of a certain dimension."
 *     responses:
 *       200:
 *         description: List of all criteria objects of a dimension
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/ListOfCriteria'
 *       401:
 *         description: No authorization token provided or authentication failed
 *       404:
 *         description: Dimension id not found
 *       500:
 *         description: Unable to list all criteria
 * 
 *   post:
 *     tags: [Criteria]
 *     summary: Registers a dimension's criterion
 *     description: "Receives an criterion object and save it into the database.
 *                   The criterion will belong to the dimension specified by id.
 *                   Your authorization token must have admin access."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Criterion'
 *     responses:
 *       200:
 *         description: The registered criterion JSON object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/CriterionMongo'
 *       400:
 *         description: JSON body is not valid
 *       401:
 *         description: No authorization token provided or authentication failed
 *       403:
 *         description: User does not have enough privileges
 *       404:
 *         description: Dimension id not found
 *       500:
 *         description: Unable to register dimension
 * 
 * /dimension/{dimensionId}/criteria/{criteriaId}:
 *   parameters:
 *     - in: path
 *       name: dimensionId
 *       schema:
 *         type: string
 *         required: true
 *       description: The dimension id
 *     - in: path
 *       name: criteriaId
 *       schema:
 *         type: string
 *         required: true
 *       description: The criterion id
 *   get:
 *     tags: [Criteria]
 *     summary: Gets a dimension's criteria
 *     description: "Gets an criterion object by its id from the database.
 *                   The criterion will be searched from the dimension which id was
 *                   also given."
 *     responses:
 *       200:
 *         description: The criterion object matching the criteriaId
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/CriterionMongo'
 *       401:
 *         description: No authorization token provided or authentication failed
 *       404:
 *         description: Dimension or criterion id not found
 *       500:
 *         description: Unable to get criterion
 * 
 *   put:
 *     tags: [Criteria]
 *     summary: Updates a dimension's criterion
 *     description: "Receives an criterion object and updates it into the database.
 *                   The criterion must belong to the dimension specified by id.
 *                   Your authorization token must have admin access."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Criterion'
 *     responses:
 *       200:
 *         description: Update was successful
 *       400:
 *         description: JSON body with syntax error
 *       401:
 *         description: No authorization token provided or authentication failed
 *       403:
 *         description: User does not have enough privileges
 *       404:
 *         description: Dimension or criterion id not found
 *       500:
 *         description: Unable to update criterion
 * 
 *   delete:
 *     tags: [Criteria]
 *     summary: Deletes a dimension's criterion
 *     description: "Deletes an criterion object by its id from the database.
 *                   The criterion will be searched from the dimension which id was
 *                   also given. Your authorization token must have admin access."
 *     responses:
 *       200:
 *         description: Delete was successful
 *       401:
 *         description: No authorization token provided or authentication failed
 *       403:
 *         description: User does not have enough privileges
 *       404:
 *         description: Dimension or criterion id not found
 *       500:
 *         description: Unable to delete criterion
 * 
 * /criteria/{criteriaId}:
 *   parameters:
 *     - in: path
 *       name: criteriaId
 *       schema:
 *         type: string
 *         required: true
 *       description: The criterion id
 *   get:
 *     tags: [Criteria]
 *     summary: Gets a criterion by id
 *     description: "Gets a criterion object by its id from 
 *       inside the database."
 *     responses:
 *       200:
 *         description: The criterion object matching the id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/CriterionMongo'
 *       401:
 *         description: No authorization token provided or authentication failed
 *       404:
 *         description: Criterion id not found
 *       500:
 *         description: Unable to get criterion
 * 
 * components:
 *   $ref: '../models/criteriaModel.js'
 */
module.exports = function(app) {
  var criteria = require('../controllers/criteriaController');
  var auth = require('../auth/auth');

  app.route('/dimension/:dimensionId/criteria')
    .get(auth.verifyToken, criteria.listAll)
    .post(auth.verifyToken, auth.verifyAdmin, criteria.add);

  app.route('/dimension/:dimensionId/criteria/:criteriaId')
    .get(auth.verifyToken, criteria.getFromDimension)
    .put(auth.verifyToken, auth.verifyAdmin, criteria.update)
    .delete(auth.verifyToken, auth.verifyAdmin, criteria.delete);

  app.route('/criteria/:criteriaId')
    .get(auth.verifyToken, criteria.get)
};
