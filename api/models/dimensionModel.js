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

DimensionSchema.pre('deleteOne', function (next) {
  const dimensionId = this.getQuery()['_id'];
  mongoose.model('Criteria').deleteMany({dimensionId}, function (err, result) {
    if (err) {
      console.log(`[error] ${err}`);
      next(err);
    } else {
      console.log('success');
      next();
    }
  });
});

DimensionSchema.pre('deleteMany', function (next) {
  const year = this.getQuery()['year'];
  mongoose.model('Dimension').find({year}, function (err, result) {
    if (err) {
      console.log(`[error] ${err}`);
      next(err);
    } else {
      result.forEach(res => {
        mongoose.model('Criteria').deleteMany({dimensionId: res._id}, function (err, result) {
          if(err) {
            console.log(`[error] ${err}`);
            next(err);
          }
        });
      });
      next();
    }
  });
});

module.exports = mongoose.model('Dimension', DimensionSchema);
