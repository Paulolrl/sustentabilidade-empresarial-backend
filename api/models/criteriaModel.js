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
 *           dimensionId:
 *             type: string
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
      // required: true
    },
    weight: {
      type: Number,
    },
    description: {
      type: String,
    },
    // required: true
    dimensionId: {
      type: Schema.Types.ObjectId,
      // required: true,
      index: true
    }
  },
  {
    collection : 'Criteria'
  }
);

CriteriaSchema.pre('deleteMany', function (next) {
  const dimensionId = this.getQuery()['dimensionId'];
  mongoose.model('Criteria').find({dimensionId}, function (err, result) {
    if (err) {
      console.log(`[error] ${err}`);
      next(err);
    } else {
      result.forEach(res => {
        mongoose.model('Indicator').deleteMany({criteriaId: res._id}, function (err, result) {
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

CriteriaSchema.pre('deleteOne', function (next) {
  const criteriaId = this.getQuery()['_id'];
  mongoose.model('Indicator').deleteMany({criteriaId}, function (err, result) {
    if (err) {
      console.log(`[error] ${err}`);
      next(err);
    } else {
      console.log('success');
      next();
    }
  });
});

module.exports = mongoose.model('Criteria', CriteriaSchema);
