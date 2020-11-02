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
var IndicatorSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    number: {
      type: Number,
      required: true
    }
  },
  {
    collection : 'Indicator'
  }
);

module.exports = mongoose.model('Indicator', IndicatorSchema);