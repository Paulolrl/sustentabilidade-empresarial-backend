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
 *         description: The dimension id
 *   get:
 *     tags: [Criteria]
 *     summary: Gets all criteria of a dimension
 *     responses:
 *       200:
 *         description: List of all criteria of a dimension
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/ListOfCriteria'
 *       401:
 *         description: Authentication with token failed
 *       404:
 *         description: Dimension id not found
 * 
 *   post:
 *     tags: [Criteria]
 *     summary: Registers a dimension's criterion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Criterion'
 *     responses:
 *       200:
 *         description: The registered criterion
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/CriterionMongo'
 *       400:
 *         description: JSON body with syntax error
 *       401:
 *         description: Authentication with token failed
 *       404:
 *         description: Dimension id not found
 * 
 *   delete:
 *     tags: [Criteria]
 *     summary: Deletes all criteria of a dimension
 *     responses:
 *       200:
 *         description: Delete was successful
 *       401:
 *         description: Authentication with token failed
 *       404:
 *         description: Dimension id not found
 * 
 * /dimension/{dimensionId}/criteria/{criteriaId}:
 *   parameters:
 *     - in: path
 *       name: dimensionId
 *       schema:
 *         type: string
 *         required: true
 *         description: The dimension id
 *     - in: path
 *       name: criteriaId
 *       schema:
 *         type: string
 *         required: true
 *         description: The criterion id
 *   get:
 *     tags: [Criteria]
 *     summary: Gets a dimension's criteria
 *     responses:
 *       200:
 *         description: The criterion object 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/CriterionMongo'
 *       401:
 *         description: Authentication with token failed
 *       404:
 *         description: Dimension or criterion id not found
 *   put:
 *     tags: [Criteria]
 *     summary: Updates a dimension's criterion
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
 *         description: Authentication with token failed
 *       404:
 *         description: Dimension or criterion id not found
 * 
 *   delete:
 *     tags: [Criteria]
 *     summary: Deletes a dimension's criterion
 *     responses:
 *       200:
 *         description: Delete was successful
 *       401:
 *         description: Authentication with token failed
 *       404:
 *         description: Dimension or criterion id not found
 * 
 * /criteria/{criteriaId}:
 *   parameters:
 *     - in: path
 *       name: criteriaId
 *       schema:
 *         type: string
 *         required: true
 *         description: The criterion id
 *   get:
 *     tags: [Criteria]
 *     summary: Gets a criterion by id
 *     responses:
 *       200:
 *         description: The criterion object matching the id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/CriterionMongo'
 *       401:
 *         description: Authentication with token failed
 *       404:
 *         description: Criterion id not found
 * 
 * components:
 *   $ref: '../models/criteriaModel.js'
 */
module.exports = function(app) {
  var criteria = require('../controllers/criteriaController');

  app.route('/dimension/:dimensionId/criteria')
    .post(criteria.add)
    .get(criteria.listAll)
    .delete(criteria.deleteAll);

  app.route('/dimension/:dimensionId/criteria/:criteriaId')
    .get(criteria.get)
    .put(criteria.update)
    .delete(criteria.delete);

  app.route('/criteria/:criteriaId')
    .get(criteria.get)
};
