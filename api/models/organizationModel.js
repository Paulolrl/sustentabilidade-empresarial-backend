'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Organization:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         address:
 *           type: object
 *         phone:
 *           type: integer
 *         site:
 *           type: string
 *         category:
 *           type: string
 *         sector:
 *           type: string
 *         size:
 *           type: string
 *
 *   OrganizationMongo:
 *     allOf:
 *       - $ref: '#/components/schemas/Organization'
 *       - type: object
 *         properties:
 *           _id:
 *             type: string
 *           __v:
 *             type: number
 *
 *   ListOfOrgs:
 *     type: object
 *     properties:
 *       total:
 *         type: number
 *       page:
 *         type: number
 *       pageSize:
 *         type: number
 *       results:
 *         type: array
 *         items:
 *           $ref: '#/components/OrganizationMongo'
 */
var OrganizationsSchema = new Schema(
  {
    name: {
      type: String,
      required: 'Kindly enter the name of the task'
    },
    address: {
      type: Object
    },
    phone: {
      type: String
    },
    site: {
      type: String
    },
    category: {
      type: String,
      required: 'Category is required',
      index: true
    },
    sector: {
      type: String,
      index: true
    },
    size: {
      type: String
    }
  },
  {
    collection: 'Organizations'
  }
);

OrganizationsSchema.pre('deleteOne', function (next) {
  const orgId = this.getQuery()['_id'];
  mongoose.model('User').update({orgId}, {$set: {orgId: null}}, function (err, result) {
    if (err) {
      console.log(`[error] ${err}`);
      next(err);
    } else {
      console.log('success');
      mongoose.model('Evaluation').deleteMany({orgId}, function (err, result) {
        if(err){
          console.log(`[error] ${err}`);
          next(err);
        } else {
          next();
        }
      });
    }
  });
});

OrganizationsSchema.index({name: 'text'});

module.exports = mongoose.model('Organizations', OrganizationsSchema);
