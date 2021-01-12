'use strict';

/**
 * @swagger
 * /terms:
 *   get:
 *     tags: [TermsOfUse]
 *     summary: Gets current Terms of Use URL.
 *     description: "Gets the single TermsOfUse object from inside the database. This object contains an url
 *      for the current Terms of Use for the application"
 *     responses:
 *       200:
 *         description: TermsOfUse object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/TermsOfUseMongo'
 *       404:
 *         description: TermsOfUse id not found. This should not happen.
 *       500:
 *         description: Unable to get the TermsOfUse object
 *
 *   put:
 *     tags: [TermsOfUse]
 *     summary: Updates the Terms of Use URL
 *     description: "Updates the single Terms of Use object.
 *       Your authorization token must have admin access."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/TermsOfUse'
 *     responses:
 *       200:
 *         description: The updated TermsOfUse object
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#components/TermsOfUseMongo'
 *       400:
 *         description: JSON body with syntax error
 *       401:
 *         description: Authentication with token failed
 *       403:
 *         description: User does not have enough privileges
 *       404:
 *         description: TermsOfUse id not found. This should not happen.
 *       500:
 *         description: Unable to update year
 *
 * components:
 *   $ref: '../models/yearModel.js'
 */
module.exports = function(app) {
  var terms = require('../controllers/termsOfUseController');
  var auth = require('../auth/auth');

  app.route('/terms')
    .get(terms.get)
    .put(auth.verifyToken, auth.verifyAdmin, terms.update);

};
