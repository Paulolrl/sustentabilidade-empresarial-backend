'use strict';

/**
 * @swagger
 * /organization/{orgId}/evaluation/:
 *   parameters:
 *     - in: path
 *       name: orgId
 *       schema:
 *         type: string
 *         required: true
 *         description: The organization id
 *   get:
 *     tags: [Evaluation]
 *     summary: Gets the list of registered evaluations
 *     description: "Gets a JSON list containing all evaluations entries 
 *       inside the database. Your authorization token must have admin access."
 *     responses:
 *       200:
 *         description: List of evaluation objects
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/ListOfEvaluations'
 *       401:
 *         description: No authorization token provided or authentication failed
 *       403:
 *         description: User does not have enough privileges
 *       500:
 *         description: Unable to list all evaluations
 * 
 *   post:
 *    tags: [Evaluation]
 *    summary: Registers an organization's evaluation
 *    description: "Receives an evaluation object and saves it into the database.
 *                  The evaluation will belong to an organization's specified by the id.
 *                  Your authorization token must have admin access."
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Evaluation'
 *    responses:
 *      200:
 *        description: The registered evaluation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/EvaluationMongo'
 *      400:
 *        description: JSON body with syntax error
 *      401:
 *        description: No authorization token provided or authentication failed
 *      403:
 *        description: User does not have enough privileges
 *      404:
 *        description: Organization id not found
 *      500:
 *        description: Unable to register evaluation
 * 
 * /organization/{orgId}/evaluation/{evaluationId}:
 * 
 *   parameters:
 *     - in: path
 *       name: orgId
 *       schema:
 *         type: string
 *         required: true
 *         description: The organization id
 * 
 *     - in: path
 *       name: evaluationId
 *       schema:
 *         type: string
 *         required: true
 *         description: The evaluation id
 * 
 *   get:
 *     tags: [Evaluation]
 *     summary: Gets the organization's evaluation by id
 *     description: "Gets a JSON list containing all evaluations entries 
 *       inside the database. Your authorization token must have admin access."
 *     responses:
 *       200:
 *         description: List of evaluation objects
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/ListOfEvaluations'
 *       401:
 *         description: No authorization token provided or authentication failed
 *       403:
 *         description: User does not have enough privileges
 *       500:
 *         description: Unable to list all evaluations
 * 
 *   put:
 *     tags: [Evaluation]
 *     summary: Updates an organization's evaluation
 *     description: "Receives an evaluation object and updates it into the database.
 *                   The evaluation must belong to the organization specified by id.
 *                   Your authorization token must have admin access."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Evaluation'
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
 *         description: Organization or evaluation id not found
 *       500:
 *         description: Unable to update evaluation
 * 
 *   delete:
 *     tags: [Evaluation]
 *     summary: Deletes an organization's evaluation
 *     description: "Deletes an evaluation object by its id from the database.
 *                   The evaluation will be searched from the organization which id was
 *                   given. Your authorization token must have admin access."
 *     responses:
 *       200:
 *         description: Delete was successful
 *       401:
 *         description: No authorization token provided or authentication failed
 *       403:
 *         description: User does not have enough privileges
 *       404:
 *         description: Organization or evaluation id not found
 *       500:
 *         description: Unable to delete evaluation
 * 
 * /evaluation/{evaluationId}:
 * 
 *   parameters:
 *     - in: path
 *       name: evaluationId
 *       schema:
 *         type: string
 *         required: true
 *         description: The evaluation id
 *   get:
 *     tags: [Evaluation]
 *     summary: Gets the evaluation by id
 *     description: "Gets a JSON list containing all evaluations entries 
 *       inside the database. Your authorization token must have admin access."
 *     responses:
 *       200:
 *         description: List of evaluation objects
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/ListOfEvaluations'
 *       401:
 *         description: No authorization token provided or authentication failed
 *       403:
 *         description: User does not have enough privileges
 *       500:
 *         description: Unable to list all evaluations
 * 
 * components:
 *   $ref: '../models/evaluationModel.js'
 */

module.exports = function(app) {
  var evaluation = require('../controllers/evaluationController');

  app.route('/organization/:orgId/evaluation')
    .post(evaluation.add)
    .get(evaluation.listAll);

  app.route('/organization/:orgId/evaluation/:evaluationId')
    .get(evaluation.get)
    .put(evaluation.update)
    .delete(evaluation.delete);

  app.route('/evaluation/:evaluationId')
    .get(evaluation.get)
};
