'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var OrganizationsSchema = new Schema(
  {
    name: {
      type: String,
      required: 'Kindly enter the name of the task'
    },
    address: {
      type: Object
    },
    phone: {
      type: String
    },
    site: {
      type: String
    },
    category: {
      type: String,
      required: 'Category is required'
    },
    sector: {
      type: String
    }
  },
  {
    collection : 'Organizations'
  }
);

module.exports = mongoose.model('Organizations', OrganizationsSchema);
