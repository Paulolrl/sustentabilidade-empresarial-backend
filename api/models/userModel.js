'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
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
      type: Schema.Types.ObjectId
    },
    isAdmin: Boolean
  }
);

module.exports = mongoose.model('User', UserSchema);