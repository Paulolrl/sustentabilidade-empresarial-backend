'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IndicatorSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    number: {
      type: Number,
      required: true
    },
    criteriaId: {
      type: ObjectId,
      required: true,
      index: true
    }
  },
  {
    collection : 'Indicator'
  }
);

module.exports = mongoose.model('Indicator', IndicatorSchema);
