'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var YearSchema = new Schema(
  {
    year: {
      type: Number,
      required: true
    }
  },
  {
    collection : 'Year'
  }
);

module.exports = mongoose.model('Year', YearSchema);
