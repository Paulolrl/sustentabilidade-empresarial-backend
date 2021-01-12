'use strict';

var mongoose = require('mongoose'),
  TermsOfUse = mongoose.model('TermsOfUse');


exports.update = function(req, res) {

  TermsOfUse.findByIdAndUpdate("5ffa2f4716a45a07d7c3a98d", req.body, function(err, terms) {
    if (terms) {
      res.status(200).send({...terms._doc, ...req.body});
    } else if (terms == null && err == null) {
      res.status(404).json({message: 'TermsOfUse id not found'});
    } else {
      res.status(500).json({message: 'Unable to update TermsOfUse', error: err});
    }
  });
};

exports.get = function(req, res) {

  TermsOfUse.findById("5ffa2f4716a45a07d7c3a98d", function(err, terms) {
    if (terms) {
      res.status(200).json(terms);
    } else if (terms == null && err == null) {
      res.status(404).json({message: 'TermsOfUse id not found'});
    } else {
      res.status(500).json({message: 'Unable to get TermsOfUse', error: err});
    }
  });
};
