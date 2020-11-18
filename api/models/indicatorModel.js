'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Indicator:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         number:
 *           type: number
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
