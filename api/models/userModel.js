'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *   UserMongo:
 *     allOf:
 *       - $ref: '#/components/schemas/User'
 *       - type: object
 *         properties:
 *           _id:
 *             type: string
 *           __v:
 *             type: number
 *           uid:
 *             type: string
 *           orgId:
 *             type: string
 *           isAdmin:
 *             type: boolean
 *
 *   ListOfUsers:
 *     type: array
 *     items:
 *       $ref: '#/components/UserMongo'
 */
const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    // Firebase ID.
    uid: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    orgId: {
      type: Schema.Types.ObjectId,
      index: true
    },
    isAdmin: {
      type: Boolean
    }
  }
);

UserSchema.index({firstName: 'text', lastName: 'text'});

module.exports = mongoose.model('User', UserSchema);
