'use strict';

/**
 * @swagger
 * components:
 *   schemas:
 *     Answer:
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
 *         indicatorId:
 *           type: string
 *         answer:
 *           $ref: '#/components/ListOfAnswers'
 *
 *     Evaluation:
 *       type: object
 *       properties:
 *         answers:
 *           $ref: '#/components/ListOfAnswersGiven'
 *         year:
 *           type: number
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
 *           validated:
 *             type: boolean
 *           orgId:
 *             type: string
 * 
 *   EvaluationAll:
 *     type: object
 *     properties:
 *       evaluationId:
 *         type: string
 *       organization:
 *         $ref: '#/components/schemas/Organization'
 * 
 *   ListOfEvaluationsAll:
 *     type: array
 *     items:
 *       $ref: '#/components/EvaluationAll'
 * 
 *   ListOfAnswersGiven:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/AnswerGiven'
 * 
 *   ListOfAnswers:
 *     type: array
 *     items:
 *       $ref: '#/components/schemas/Answer'
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
    year: {
      type: Number,
      index: true,
      required: true
    },
    validated: Boolean
  },
  {
    collection: 'Evaluation'
  }
);

EvaluationSchema.index({'orgId': 1, 'year': 1}, {unique: true});


module.exports = mongoose.model('Evaluation', EvaluationSchema);
