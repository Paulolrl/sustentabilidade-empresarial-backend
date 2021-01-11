'use strict';

/**
 * @swagger
 * /year:
 *   get:
 *     tags: [Year]
 *     summary: Gets the list of registered years
 *     description: "Gets a JSON list containing all year entries 
 *       inside the database."
 *     responses:
 *       200:
 *         description: List of year objects
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/ListOfYears'
 *       401:
 *         description: No authorization token provided or authentication failed
 *       500:
 *         description: Unable to list all years
 * 
 *   post:
 *     tags: [Year]
 *     summary: Registers a year
 *     description: "Receives a year object and save it into the database. 
 *                   Your authorization token must have admin access."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Year'
 *     responses:
 *       200:
 *         description: The registered year JSON object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/YearMongo'
 *       400:
 *         description: JSON body is not valid
 *       401:
 *         description: Authentication with token failed
 *       403:
 *         description: User does not have enough privileges
 *       500:
 *         description: Unable to register year
 * 
 * /year/{yearId}:
 *   parameters:
 *     - in: path
 *       name: yearId
 *       schema:
 *         type: string
 *         required: true
 *       description: The year id
 *   get:
 *     tags: [Year]
 *     summary: Gets a year by id
 *     description: "Gets a year object by its id from 
 *       inside the database."
 *     responses:
 *       200:
 *         description: The year object matching the id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/YearMongo'
 *       401:
 *         description: Authentication with token failed
 *       404:
 *         description: Year id not found
 *       500:
 *         description: Unable to get year
 * 
 *   put:
 *     tags: [Year]
 *     summary: Updates a year
 *     description: "Updates a year object by its id. 
 *       Your authorization token must have admin access."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Year'
 *     responses:
 *       200:
 *         description: The updated year object
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#components/YearMongo'
 *       400:
 *         description: JSON body with syntax error
 *       401:
 *         description: Authentication with token failed
 *       403:
 *         description: User does not have enough privileges
 *       404:
 *         description: Year id not found
 *       500:
 *         description: Unable to update year
 * 
 *   delete:
 *     tags: [Year]
 *     summary: Deletes a year by id
 *     description: "Deletes a year object by its id. 
 *       Your authorization token must have admin access."
 *     responses:
 *       200:
 *         description: Delete was successful
 *       401:
 *         description: Authentication with token failed
 *       403:
 *         description: User does not have enough privileges
 *       404:
 *         description: Year id not found
 *       500:
 *         description: Unable to delete year
 * 
 * components:
 *   $ref: '../models/yearModel.js'
 */
module.exports = function(app) {
  var year = require('../controllers/yearController');
  var auth = require('../auth/auth');

  app.route('/year')
    .get(auth.verifyToken, year.listAll)
    .post(auth.verifyToken, auth.verifyAdmin, year.add);

  app.route('/year/:yearId')
    .get(auth.verifyToken, year.get)
    .put(auth.verifyToken, auth.verifyAdmin, year.update)
    .delete(auth.verifyToken, auth.verifyAdmin, year.delete);
};
