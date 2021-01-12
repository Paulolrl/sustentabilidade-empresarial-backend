'use strict';

/**
 * @swagger
 * /dimension/{dimensionId}/criteria/{criteriaId}/indicator:
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
 *     tags: [Indicator]
 *     summary: Gets the list of all indicators of a dimension's criteria
 *     description: "Gets a JSON list containing all indicator entries 
 *       of a certain dimension's criteria."
 *     responses:
 *       200:
 *         description: List of all indicators of a dimension's criteria
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/ListOfIndicators'
 *       401:
 *         description: No authorization token provided or authentication failed
 *       404:
 *         description: Dimension or criteria id not found
 *       500:
 *         description: Unable to list all indicators
 * 
 *   post:
 *     tags: [Indicator]
 *     summary: Registers a indicator for a dimension's criteria
 *     description: "Receives an indicator object and save it into the database.
 *                   The indicator will belong to the dimension's criterion specified by their id.
 *                   Your authorization token must have admin access."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Indicator'
 *     responses:
 *       200:
 *         description: The registered indicator
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/IndicatorMongo'
 *       400:
 *         description: JSON body with syntax error
 *       401:
 *         description: No authorization token provided or authentication failed
 *       403:
 *         description: User does not have enough privileges
 *       404:
 *         description: Dimension or criteria id not found
 *       500:
 *         description: Unable to register indicator
 * 
 * /dimension/{dimensionId}/criteria/{criteriaId}/indicator/{indicatorId}:
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
 *     - in: path
 *       name: indicatorId
 *       schema:
 *         type: string
 *         required: true
 *       description: The indicator id
 *   get:
 *     tags: [Indicator]
 *     summary: Gets an indicator of a dimension's criteria
 *     description: "Gets an indicator object by its id from the database.
 *                   The indicator will be searched from the criteria which id was
 *                   also given. This criteria must be from a dimension which id was also
 *                   provided"
 *     responses:
 *       200:
 *         description: The indicator object matching the id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/IndicatorMongo'
 *       401:
 *         description: No authorization token provided or authentication failed
 *       404:
 *         description: Dimension, criteria or indicator id not found
 *       500:
 *         description: Unable to get indicator
 * 
 *   put:
 *     tags: [Indicator]
 *     summary: Updates an indicator of a dimension's criteria
 *     description: "Receives an indicator object and updates it into the database.
 *                   The indicator must belong to the criterion specified by id.
 *                   The criterion must belong to the dimension also specified by id.
 *                   Your authorization token must have admin access."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Indicator'
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
 *         description: Dimension, criteria or indicator id not found
 *       500:
 *         description: Unable to update indicator
 * 
 *   delete:
 *     tags: [Indicator]
 *     summary: Deletes an indicator of a dimension's criteria
 *     description: "Deletes an indicator object by its id from the database.
 *                   The indicator will be searched from the criterion which id was
 *                   given. The criterion will be searched from the dimension which id was
 *                   given. Your authorization token must have admin access."
 *     responses:
 *       200:
 *         description: Delete was successful
 *       401:
 *         description: No authorization token provided or authentication failed
 *       403:
 *         description: User does not have enough privileges
 *       404:
 *         description: Dimension, criteria or indicator id not found
 *       500:
 *         description: Unable to delete indicator
 * 
 * /indicator/{indicatorId}:
 *   parameters:
 *     - in: path
 *       name: indicatorId
 *       schema:
 *         type: string
 *         required: true
 *       description: The indicator id
 *   get:
 *     tags: [Indicator]
 *     summary: Gets an indicator by id
 *     description: "Gets a indicator object by its id from 
 *       inside the database."
 *     responses:
 *       200:
 *         description: The indicator object matching the id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/IndicatorMongo'
 *       401:
 *         description: No authorization token provided or authentication failed
 *       404:
 *         description: Indicator id not found
 *       500:
 *         description: Unable to delete indicator
 * 
 * components:
 *   $ref: '../models/indicatorModel.js'
 */
module.exports = function(app) {
  var indicator = require('../controllers/indicatorController');
  var auth = require('../auth/auth');

  app.route('/dimension/:dimensionId/criteria/:criteriaId/indicator')
    .get(auth.verifyToken, indicator.listAll)
    .post(auth.verifyToken, auth.verifyAdmin, indicator.add);

  app.route('/dimension/:dimensionId/criteria/:criteriaId/indicator/:indicatorId')
    .get(auth.verifyToken, indicator.getFromCriteria)
    .put(auth.verifyToken, auth.verifyAdmin, indicator.update)
    .delete(auth.verifyToken, auth.verifyAdmin, indicator.delete);

  app.route('/indicator/:indicatorId')
    .get(auth.verifyToken, indicator.get);
};
