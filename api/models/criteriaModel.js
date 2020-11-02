'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Criterion:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         weight:
 *           type: number
 * 
 *   CriterionMongo:
 *     allOf:
 *       - $ref: '#/components/schemas/Criterion'
 *       - type: object
 *         properties:
 *           _id:
 *             type: string
 *           __v:
 *             type: number
 * 
 *   ListOfCriteria:
 *     type: array
 *     items:
 *       $ref: '#/components/CriterionMongo'
 */
var CriteriaSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    weight: {
      type: Number,
      required: true
    }
  },
  {
    collection : 'Criteria'
  }
);

module.exports = mongoose.model('Criteria', CriteriaSchema);