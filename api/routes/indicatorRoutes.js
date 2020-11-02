'use strict';

/**
 * @swagger
 * /indicator:
 *   get:
 *     tags: [Indicator]
 *     summary: Gets the list of all indicators
 *     responses:
 *       200:
 *         description: List of all indicators
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/ListOfIndicators'
 * 
 *   post:
 *     tags: [Indicator]
 *     summary: Registers a indicator
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
 * 
 *   delete:
 *     tags: [Indicator]
 *     summary: Deletes all indicators
 *     responses:
 *       200:
 *         description: Delete was successful
 * 
 * /indicator/{indicatorId}:
 *   get:
 *     tags: [Indicator]
 *     summary: Gets a indicator by id
 *     parameters:
 *       - in: path
 *         name: indicatorId
 *         schema:
 *           type: string
 *           required: true
 *           description: The indicator id
 *     responses:
 *       200:
 *         description: The indicator object matching the id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/IndicatorMongo'
 *       404:
 *         description: Indicator id not found
 * 
 *   put:
 *     tags: [Indicator]
 *     summary: Updates a indicator
 *     parameters:
 *       - in: path
 *         name: indicatorId
 *         schema:
 *           type: string
 *           required: true
 *           description: The indicator id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Indicator'
 *     responses:
 *       200:
 *         description: Update was successful
 * 
 *   delete:
 *     tags: [Indicator]
 *     summary: Deletes a indicator by id
 *     parameters:
 *       - in: path
 *         name: indicatorId
 *         schema:
 *           type: string
 *           required: true
 *           description: The indicator id
 *     responses:
 *       200:
 *         description: Delete was successful
 * 
 * components:
 *   $ref: '../models/indicatorModel.js'
 */
module.exports = function(app) {
  var indicator = require('../controllers/indicatorController');

  app.route('/indicator')
    .post(indicator.add)
    .get(indicator.listAll)
    .delete(indicator.deleteAll);
  
  app.route('/indicator/:indicatorId')
    .get(indicator.get)
    .put(indicator.update)
    .delete(indicator.delete);
};
