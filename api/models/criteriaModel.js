'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CriteriaSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    weight: {
      type: Number,
      required: true
    },
    dimensionId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true
    }
  },
  {
    collection : 'Criteria'
  }
);

module.exports = mongoose.model('Criteria', CriteriaSchema);
