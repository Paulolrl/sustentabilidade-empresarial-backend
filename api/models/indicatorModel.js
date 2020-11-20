'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Answer:
 *       type: object
 *       properties:
 *         answer:
 *           type: string
 *         points:
 *           type: number
 * 
 *     Question:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         type:
 *           type: number
 *         answer:
 *           $ref: '#/components/schemas/Answer'
 * 
 *     Indicator:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         number:
 *           type: number
 *         description:
 *           type: string
 *         reference:
 *           type: string
 *         weight:
 *           type: number
 *         evidence:
 *           type: boolean
 *         question:
 *           $ref: '#/components/schemas/Question'
 * 
 *   AnswerMongo:
 *     allOf:
 *       - $ref: '#/components/schemas/Answer'
 *       - type: object
 *         properties:
 *           _id:
 *             type: string
 * 
 *   QuestionMongo:
 *     allOf:
 *       - $ref: '#/components/schemas/Question'
 *       - type: object
 *         properties:
 *           _id:
 *             type: string
 * 
 *   IndicatorMongo:
 *     allOf:
 *       - $ref: '#/components/schemas/Indicator'
 *       - type: object
 *         properties:
 *           _id:
 *             type: string
 *           __v:
 *             type: number
 *           criteriaId:
 *             type: string
 * 
 *   ListOfIndicators:
 *     type: array
 *     items:
 *       $ref: '#/components/IndicatorMongo'
 */
var AnswerSchema = new Schema(
  {
    answer: {
      type: String,
      required: 'Enter answer'
    },
    points: {
      type: Number,
      required: 'Enter number of points'
    }
  }
);

var QuestionsSchema = new Schema(
  {
    title: {
      type: String,
      required: 'Enter the question'
    },
    type: {
      type: String,
      required: 'Enter question type'
    },
    answer: [AnswerSchema]
  },
);

var IndicatorSchema = new Schema(
  {
    name: {
      type: String,
      required: 'Enter indicator name'
    },
    number: {
      type: Number,
      required: 'Enter indicator number'
    },
    description: {
      type: String,
      required: 'Enter indicator description'
    },
    reference: {
      type: String
    },
    weight: {
      type: Number,
      required: 'Enter indicator weight'
    },
    criteriaId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true
    },
    question: QuestionsSchema,
    evidence: {
      type: Boolean
    }    
  },
  {
    collection : 'Indicator'
  }
);

module.exports = mongoose.model('Indicator', IndicatorSchema);
