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

YearSchema.pre('deleteOne', function (next) {
  const yearId = this.getQuery()['_id'];

  mongoose.model('Year').findById(yearId, function (err, year) {
    if (err) {
      console.log(`[error] ${err}`);
      next(err);
    } else {
      mongoose.model('Dimension').deleteMany({year: year.year}, function (err, result) {
        if (err) {
          console.log(`[error] ${err}`);
          next(err);
        } else {
          console.log('success');
          next();
        }
      });
    }
  });

});

module.exports = mongoose.model('Year', YearSchema);
