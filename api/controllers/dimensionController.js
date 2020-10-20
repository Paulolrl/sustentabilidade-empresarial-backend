'use strict';

var mongoose = require('mongoose'),
  Dimension = mongoose.model('Dimensions');
  
exports.teste = function(req, res) {
  Dimension.find({}, function(err, dimension) {
    if (err)
      res.send(err);

    /*const teste = Dimension
    new teste({
        name: 'TESTE',
        year: 2020
    }).save()
    .then(function(){console.log("Dimension successfully registered!")})
    .catch(function(erro){console.log("Erro registering dimension: "+erro)})*/


    res.json(dimension);
  });
};
