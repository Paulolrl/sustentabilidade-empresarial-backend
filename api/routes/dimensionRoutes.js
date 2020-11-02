'use strict';

/**
 * @swagger
 * /dimension:
 *   get:
 *     tags: [Dimension]
 *     summary: Gets the list of all dimensions
 *     responses:
 *       200:
 *         description: List of all dimensions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/ListOfDimensions'
 * 
 *   post:
 *     tags: [Dimension]
 *     summary: Registers a dimension
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Dimension'
 *     responses:
 *       200:
 *         description: The registered dimension
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/DimensionMongo'
 * 
 *   delete:
 *     tags: [Dimension]
 *     summary: Deletes all dimensions
 *     responses:
 *       200:
 *         description: Delete was successful
 * 
 * /dimension/{dimensionId}:
 *   get:
 *     tags: [Dimension]
 *     summary: Gets a dimension by id
 *     parameters:
 *       - in: path
 *         name: dimensionId
 *         schema:
 *           type: string
 *           required: true
 *           description: The dimension id
 *     responses:
 *       200:
 *         description: The dimension object matching the id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/DimensionMongo'
 *       404:
 *         description: Dimension id not found
 * 
 *   put:
 *     tags: [Dimension]
 *     summary: Updates a dimension
 *     parameters:
 *       - in: path
 *         name: dimensionId
 *         schema:
 *           type: string
 *           required: true
 *           description: The dimension id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Dimension'
 *     responses:
 *       200:
 *         description: Update was successful
 * 
 *   delete:
 *     tags: [Dimension]
 *     summary: Deletes a dimension by id
 *     parameters:
 *       - in: path
 *         name: dimensionId
 *         schema:
 *           type: string
 *           required: true
 *           description: The dimension id
 *     responses:
 *       200:
 *         description: Delete was successful
 * 
 * components:
 *   $ref: '../models/dimensionModel.js'
 */
module.exports = function(app) {
  var dimension = require('../controllers/dimensionController');

  app.route('/dimension')
    .post(dimension.add)
    .get(dimension.listAll)
    .delete(dimension.deleteAll);

    app.route('/dimension/:dimensionId')
    .get(dimension.get)
    .put(dimension.update)
    .delete(dimension.delete);
};
