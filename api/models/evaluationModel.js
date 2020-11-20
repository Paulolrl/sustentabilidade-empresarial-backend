'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerGivenSchema = new Schema(
  {
    indicatorId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  }
);

var EvaluationSchema = new Schema(
  {
    orgId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    answers: {
      type: [AnswerGivenSchema],
      required: true
    },
    validated: Boolean
  },
  {
    collection: 'Evaluation'
  }
);

module.exports = mongoose.model('Evaluation', EvaluationSchema);
