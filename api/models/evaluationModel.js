'use strict';

/**
 * @swagger
 * components:
 *   schemas:
 *     Answer2:
 *       type: object
 *       properties:
 *         ansId:
 *           type: number
 *         text:
 *           type: string         
 *
 *     AnswerGiven:
 *       type: object
 *       properties:
 *         answer:
 *           $ref: '#/components/schemas/Answer2'
 *
 *     Evaluation:
 *       type: object
 *       properties:
 *         answers:
 *           $ref: '#/components/schemas/AnswerGiven'
 *         validated:
 *           type: boolean
 *
 *   AnswerMongo:
 *     allOf:
 *       - $ref: '#/components/schemas/Answer'
 *       - type: object
 *         properties:
 *           _id:
 *             type: string
 *
 *   AnswerGivenMongo:
 *     allOf:
 *       - $ref: '#/components/schemas/AnswerGiven'
 *       - type: object
 *         properties:
 *           _id:
 *             type: string
 *
 *   EvaluationMongo:
 *     allOf:
 *       - $ref: '#/components/schemas/Evaluation'
 *       - type: object
 *         properties:
 *           _id:
 *             type: string
 *           __v:
 *             type: number
 *           orgId:
 *             type: string
 *
 *   ListOfEvaluations:
 *     type: array
 *     items:
 *       $ref: '#/components/EvaluationMongo'
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AnswerSchema = new Schema(
  {
    ansId: Number,
    text: String
  }
)

var AnswerGivenSchema = new Schema(
  {
    indicatorId: {
      type: Schema.Types.ObjectId,
      ref: 'Indicator',
      required: true,
      index: true
    },
    answer: [AnswerSchema]
  }
);

var EvaluationSchema = new Schema(
  {
    orgId: {
      type: Schema.Types.ObjectId,
      ref: 'Organizations',
      required: true,
      index: true
    },
    answers: {
      type: [AnswerGivenSchema],
      required: true
    },
    validated: Boolean
  },
  {
    collection: 'Evaluation'
  }
);

module.exports = mongoose.model('Evaluation', EvaluationSchema);
