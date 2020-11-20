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
 *         description: The dimension id
 *     - in: path
 *       name: criteriaId
 *       schema:
 *         type: string
 *         required: true
 *         description: The criterion id
 *   get:
 *     tags: [Indicator]
 *     summary: Gets the list of all indicators of a dimension's criteria
 *     responses:
 *       200:
 *         description: List of all indicators of a dimension's criteria
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/ListOfIndicators'
 *       401:
 *         description: Authentication with token failed
 *       404:
 *         description: Dimension id not found
 * 
 *   post:
 *     tags: [Indicator]
 *     summary: Registers a indicator for a dimension's criteria
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
 *         description: Authentication with token failed
 *       404:
 *         description: Dimension id not found
 * 
 *   delete:
 *     tags: [Indicator]
 *     summary: Deletes all indicators of a dimension's criteria
 *     responses:
 *       200:
 *         description: Delete was successful
 *       401:
 *         description: Authentication with token failed
 *       404:
 *         description: Dimension id not found
 * 
 * /dimension/{dimensionId}/criteria/{criteriaId}/indicator/{indicatorId}:
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
 *     - in: path
 *       name: indicatorId
 *       schema:
 *         type: string
 *         required: true
 *         description: The indicator id
 *   get:
 *     tags: [Indicator]
 *     summary: Gets an indicator of a dimension's criteria
 *     responses:
 *       200:
 *         description: The indicator object matching the id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/IndicatorMongo'
 *       401:
 *         description: Authentication with token failed
 *       404:
 *         description: Dimension, criteria or indicator id not found
 * 
 *   put:
 *     tags: [Indicator]
 *     summary: Updates an indicator of a dimension's criteria
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
 *         description: Authentication with token failed
 *       404:
 *         description: Dimension, criteria or indicator id not found
 * 
 *   delete:
 *     tags: [Indicator]
 *     summary: Deletes an indicator of a dimension's criteria
 *     responses:
 *       200:
 *         description: Delete was successful
 *       401:
 *         description: Authentication with token failed
 *       404:
 *         description: Dimension, criteria or indicator id not found
 * 
 * /indicator/{indicatorId}:
 *   parameters:
 *     - in: path
 *       name: indicatorId
 *       schema:
 *         type: string
 *         required: true
 *         description: The indicator id
 *   get:
 *     tags: [Indicator]
 *     summary: Gets an indicator by id
 *     responses:
 *       200:
 *         description: The indicator object matching the id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/IndicatorMongo'
 *       401:
 *         description: Authentication with token failed
 *       404:
 *         description: Indicator id not found
 * 
 * components:
 *   $ref: '../models/indicatorModel.js'
 */
module.exports = function(app) {
  var indicator = require('../controllers/indicatorController');

  app.route('/dimension/:dimensionId/criteria/:criteriaId/indicator')
    .post(indicator.add)
    .get(indicator.listAll)
    .delete(indicator.deleteAll);

  app.route('/dimension/:dimensionId/criteria/:criteriaId/indicator/:indicatorId')
    .get(indicator.get)
    .put(indicator.update)
    .delete(indicator.delete);

  app.route('/indicator/:indicatorId')
    .get(indicator.get)
};
