'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     TermsOfUse:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *   TermsOfUseMongo:
 *     allOf:
 *       - $ref: '#/components/schemas/TermsOfUse'
 *       - type: object
 *         properties:
 *           _id:
 *             type: string
 */
var TermsOfUseSchema = new Schema(
  {
    url: {
      type: String,
      required: true
    }
  },
  {
    collection : 'TermsOfUse'
  }
);

module.exports = mongoose.model('TermsOfUse', TermsOfUseSchema);
