'use strict';

/**
 * @swagger
 * /dimension:
 *   get:
 *     tags: [Dimension]
 *     summary: Gets the list of registered dimensions
 *     description: "Gets a JSON list containing all dimension entries 
 *       inside the database."
 *     responses:
 *       200:
 *         description: List of dimension objects
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/ListOfDimensions'
 *       401:
 *         description: No authorization token provided or authentication failed
 *       500:
 *         description: Unable to list all dimensions
 * 
 *   post:
 *     tags: [Dimension]
 *     summary: Registers an dimension
 *     description: "Receives an dimension object and save it into the database. 
 *                   Your authorization token must have admin access."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Dimension'
 *     responses:
 *       200:
 *         description: The registered dimension JSON object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/DimensionMongo'
 *       400:
 *         description: JSON body is not valid
 *       401:
 *         description: Authentication with token failed
 *       403:
 *         description: User does not have enough privileges
 *       500:
 *         description: Unable to register dimension
 * 
 * /dimension/{dimensionId}:
 *   parameters:
 *     - in: path
 *       name: dimensionId
 *       schema:
 *         type: string
 *         required: true
 *         description: The dimension id
 *   get:
 *     tags: [Dimension]
 *     summary: Gets an dimension by id
 *     description: "Gets an dimension object by its id from 
 *       inside the database."
 *     responses:
 *       200:
 *         description: The dimension object matching the id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/DimensionMongo'
 *       401:
 *         description: Authentication with token failed
 *       404:
 *         description: Dimension id not found
 *       500:
 *         description: Unable to get dimension
 * 
 *   put:
 *     tags: [Dimension]
 *     summary: Updates an dimension
 *     description: "Updates an dimension object by its id. 
 *       Your authorization token must have admin access."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Dimension'
 *     responses:
 *       200:
 *         description: The updated dimension object
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#components/DimensionMongo'
 *       400:
 *         description: JSON body with syntax error
 *       401:
 *         description: Authentication with token failed
 *       403:
 *         description: User does not have enough privileges
 *       404:
 *         description: Dimension id not found
 *       500:
 *         description: Unable to update dimension
 * 
 *   delete:
 *     tags: [Dimension]
 *     summary: Deletes a dimension by id
 *     description: "Deletes an dimension object by its id. 
 *       Your authorization token must have admin access."
 *     responses:
 *       200:
 *         description: Delete was successful
 *       401:
 *         description: Authentication with token failed
 *       403:
 *         description: User does not have enough privileges
 *       404:
 *         description: Dimension id not found
 *       500:
 *         description: Unable to delete dimension
 * 
 * components:
 *   $ref: '../models/dimensionModel.js'
 */
module.exports = function(app) {
  var dimension = require('../controllers/dimensionController');
  var auth = require('../auth/auth');

  app.route('/dimension')
    .get(auth.verifyToken, dimension.listAll)
    .post(auth.verifyToken, auth.verifyAdmin, dimension.add);

  app.route('/dimension/:dimensionId')
    .get(auth.verifyToken, dimension.get)
    .put(auth.verifyToken, auth.verifyAdmin, dimension.update)
    .delete(auth.verifyToken, auth.verifyAdmin, dimension.delete);
};
