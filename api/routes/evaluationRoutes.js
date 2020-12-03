'use strict';

/**
 * @swagger
 * /organization/mine/evaluation/:
 *   get:
 *     tags: [Evaluation]
 *     summary: Gets all user's organization evaluations
 *     description: "Gets all user's evaluations of their organization from
 *       inside the database."
 *     responses:
 *       200:
 *         description: List of evaluation objects
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/EvaluationMongo'
 *       401:
 *         description: No authorization token provided or authentication failed
 *       403:
 *         description: User does not have enough privileges
 *       404:
 *         description: This user does not have a organization
 *       500:
 *         description: Unable to get user's evaluation
 * 
 *   post:
 *    tags: [Evaluation]
 *    summary: Registers an organization's evaluation
 *    description: "Receives an evaluation object and saves it into the database.
 *                  The evaluation will belong to this user's organization."
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
 *      404:
 *        description: This user does not have a organization
 *      500:
 *        description: Unable to register evaluation
 * 
 * /organization/{orgId}/evaluation/:
 *   parameters:
 *     - in: path
 *       name: orgId
 *       schema:
 *         type: string
 *         required: true
 *       description: The organization id
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
 *       404:
 *         description: Organization id not found
 *       500:
 *         description: Unable to list all evaluations
 *
 * /organization/mine/evaluation/{evaluationId}:
 *   parameters:
 *     - in: path
 *       name: evaluationId
 *       schema:
 *         type: string
 *         required: true
 *       description: The evaluation id
 *
 *   get:
 *     tags: [Evaluation]
 *     summary: Gets an organization's evaluation by id
 *     description: "Gets a single user's organization evaluation from inside the database.
 *                   The evaluation must belong to this user's organization.
 *                   The evaluation will be searched from the user organization which is
 *                   related to their auth token."
 *     responses:
 *       200:
 *         description: The evaluation object matching the id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/EvaluationMongo'
 *       401:
 *         description: No authorization token provided or authentication failed
 *       404:
 *         description: User do not have a organization or this evaluation does not exists
 *       500:
 *         description: Unable to get evaluation
 *
 *   put:
 *     tags: [Evaluation]
 *     summary: Updates an organization's evaluation
 *     description: "Receives an evaluation object and updates it into the database.
 *                   The evaluation must belong to this user's organization.
 *                   The evaluation will be searched from the user organization which is
 *                   related to their auth token."
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
 *       404:
 *         description: User do not have a organization or this evaluation does not exists
 *       500:
 *         description: Unable to update evaluation
 *
 *   delete:
 *     tags: [Evaluation]
 *     summary: Deletes an user's organization evaluation by its id
 *     description: "Deletes this user's organization.
 *                   The evaluation must belong to this user's organization.
 *                   The evaluation will be searched from the user organization which is
 *                   related to their auth token."
 *     responses:
 *       200:
 *         description: Delete was successful
 *       401:
 *         description: No authorization token provided or authentication failed
 *       404:
 *         description: User do not have a organization or this evaluation does not exists
 *       500:
 *         description: Unable to delete evaluation
 * 
 * /organization/{orgId}/evaluation/{evaluationId}:
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
 *     summary: Gets an organization's evaluation by id
 *     description: "Gets an evaluation by its id from inside the database.
 *                   The evaluation must belong to the organization, which id must also be provided.
 *                   Your authorization token must have admin access."
 *     responses:
 *       200:
 *         description: The evaluation object matching the id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/EvaluationMongo'
 *       401:
 *         description: No authorization token provided or authentication failed
 *       403:
 *         description: User does not have enough privileges
 *       404:
 *         description: Organization or evaluation does not exist
 *       500:
 *         description: Unable to get evaluation
 *
 *   put:
 *     tags: [Evaluation]
 *     summary: Updates an organization's evaluation
 *     description: "Updates an evaluation by its id from inside the database.
 *                   The evaluation must belong to the organization, which id must also be provided.
 *                   Your authorization token must have admin access."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Evaluation'
 *     responses:
 *       200:
 *         description: The updated evaluation object matching the id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/EvaluationMongo'
 *       400:
 *         description: JSON body with syntax error
 *       401:
 *         description: No authorization token provided or authentication failed
 *       403:
 *         description: User does not have enough privileges
 *       404:
 *         description: Organization or evaluation does not exist
 *       500:
 *         description: Unable to update evaluation
 *
 *   delete:
 *     tags: [Evaluation]
 *     summary: Deletes an organization's evaluation
 *     description: "Deletes an evaluation by its id from inside the database.
 *                   The evaluation must belong to the organization, which id must also be provided.
 *                   Your authorization token must have admin access."
 *     responses:
 *       200:
 *         description: Delete was successful
 *       401:
 *         description: No authorization token provided or authentication failed
 *       403:
 *         description: User does not have enough privileges
 *       404:
 *         description: Organization or evaluation does not exist
 *       500:
 *         description: Unable to delete evaluation
 *
 * /evaluation/{evaluationId}:
 *   parameters:
 *     - in: path
 *       name: evaluationId
 *       schema:
 *         type: string
 *         required: true
 *         description: The evaluation id
 * 
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
  var auth = require('../auth/auth');

  app.route('/organization/mine/evaluation')
    .get(auth.verifyToken, evaluation.listMine)
    .post(auth.verifyToken, evaluation.add);

  app.route('/organization/:orgId/evaluation')
    .get(auth.verifyToken, auth.verifyAdmin, evaluation.listAllFromOrg);

  app.route('/organization/mine/evaluation/:evaluationId')
    .get(auth.verifyToken, evaluation.get)
    .put(auth.verifyToken, evaluation.update)
    .delete(auth.verifyToken, evaluation.delete);

  app.route('/organization/:orgId/evaluation/:evaluationId')
    .get(auth.verifyToken, auth.verifyAdmin, evaluation.get)
    .delete(auth.verifyToken, auth.verifyAdmin, evaluation.delete);

  app.route('/organization/:orgId/evaluation/:evaluationId/validate')
    .put(auth.verifyToken, auth.verifyAdmin, evaluation.validate);

  app.route('/organization/:orgId/evaluation/:evaluationId/invalidate')
    .put(auth.verifyToken, auth.verifyAdmin, evaluation.invalidate);

  app.route('/evaluation/:evaluationId')
    .get(auth.verifyToken, auth.verifyAdmin, evaluation.get);

  app.route('/evaluation')
    .get(auth.verifyToken, auth.verifyAdmin, evaluation.listAll);

};
