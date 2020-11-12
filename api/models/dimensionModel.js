'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DimensionSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    code: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    }
  },
  {
    collection : 'Dimension'
  }
);

module.exports = mongoose.model('Dimension', DimensionSchema);
