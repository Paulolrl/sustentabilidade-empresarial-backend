'use strict';

/**
 * @swagger
 * /criteria:
 *   get:
 *     tags: [Criteria]
 *     summary: Gets the list of all criteria
 *     responses:
 *       200:
 *         description: List of all criteria
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/ListOfCriteria'
 * 
 *   post:
 *     tags: [Criteria]
 *     summary: Registers a criterion
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
 * 
 *   delete:
 *     tags: [Criteria]
 *     summary: Deletes all criteria
 *     responses:
 *       200:
 *         description: Delete was successful
 * 
 * /criteria/{criteriaId}:
 *   get:
 *     tags: [Criteria]
 *     summary: Gets a criterion by id
 *     parameters:
 *       - in: path
 *         name: criteriaId
 *         schema:
 *           type: string
 *           required: true
 *           description: The criterion id
 *     responses:
 *       200:
 *         description: The criterion object matching the id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/CriterionMongo'
 *       404:
 *         description: Criterion id not found
 * 
 *   put:
 *     tags: [Criteria]
 *     summary: Updates a criterion
 *     parameters:
 *       - in: path
 *         name: criteriaId
 *         schema:
 *           type: string
 *           required: true
 *           description: The criterion id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Criterion'
 *     responses:
 *       200:
 *         description: Update was successful
 * 
 *   delete:
 *     tags: [Criteria]
 *     summary: Deletes a criterion by id
 *     parameters:
 *       - in: path
 *         name: criteriaId
 *         schema:
 *           type: string
 *           required: true
 *           description: The criterion id
 *     responses:
 *       200:
 *         description: Delete was successful
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
