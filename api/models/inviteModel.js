'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Invite:
 *       type: object
 *       properties:
 *         fromUserId:
 *           type: string
 *         toUserEmail:
 *           type: string
 *         orgId:
 *           type: string
 *         seen:
 *           type: boolean
 *         accepted:
 *           type: boolean
 *
 *   InvitePost:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 * 
 *   InviteMongo:
 *     allOf:
 *       - $ref: '#/components/schemas/Invite'
 *       - type: object
 *         properties:
 *           _id:
 *             type: string
 *           __v:
 *             type: number
 *
 *   ListOfinvites:
 *     type: array
 *     items:
 *       $ref: '#/components/InviteMongo'
 */
var InviteSchema = new Schema(
  {
    fromUserId: {
      type: Schema.Types.ObjectId,
      index: true,
      required: true
    },
    toUserEmail: {
      type: String,
      index: true,
      required: true
    },
    orgId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    seen: {
      type: Boolean,
      required: true
    },
    accepted: {
      type: Boolean,
      require: true
    }
  },
  {
    collection: 'Invite'
  }
);

module.exports = mongoose.model('Invite', InviteSchema);
