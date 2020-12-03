'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
