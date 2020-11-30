'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Dimension:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         code:
 *           type: number
 *         description:
 *           type: string
 *         year:
 *           type: number
 *
 *   DimensionMongo:
 *     allOf:
 *       - $ref: '#/components/schemas/Dimension'
 *       - type: object
 *         properties:
 *           _id:
 *             type: string
 *           __v:
 *             type: number
 *
 *   ListOfDimensions:
 *     type: array
 *     items:
 *       $ref: '#/components/DimensionMongo'
 */
var DimensionSchema = new Schema(
  {
    name: {
      type: String,
      // required: true
    },
    code: {
      type: Number,
      // required: true
    },
    description: {
      type: String,
      // required: true
    },
    year: {
      type: Number,
      // required: true
    }
  },
  {
    collection : 'Dimension'
  }
);

module.exports = mongoose.model('Dimension', DimensionSchema);
