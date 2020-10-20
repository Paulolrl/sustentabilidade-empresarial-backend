'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DimensionsSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    }
  },
  {
    collection : 'Dimensions'
  }
);

module.exports = mongoose.model('Dimensions', DimensionsSchema);
