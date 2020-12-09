'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Year:
 *       type: object
 *       properties:
 *         year:
 *           type: number
 *   YearMongo:
 *     allOf:
 *       - $ref: '#/components/schemas/Year'
 *       - type: object
 *         properties:
 *           _id:
 *             type: string
 *           __v:
 *             type: number
 *
 *   ListOfYears:
 *     type: array
 *     items:
 *       $ref: '#/components/YearMongo'
 */
var YearSchema = new Schema(
  {
    year: {
      type: Number,
      required: true
    }
  },
  {
    collection : 'Year'
  }
);

module.exports = mongoose.model('Year', YearSchema);
