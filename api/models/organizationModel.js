'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var OrganizationsSchema = new Schema(
  {
    name: {
      type: String,
      required: 'Kindly enter the name of the task'
    }
  },
  {
    collection : 'Organizations'
  }
);

module.exports = mongoose.model('Organizations', OrganizationsSchema);
