var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  mongoose = require('mongoose'),
  Organization = require('./api/models/organizationModel'), //created model loading here
  Dimension = require('./api/models/dimensionModel'), //created model loading here
<<<<<<< HEAD
  User = require('./api/models/userModel'), //created model loading here
=======
  Criteria = require('./api/models/criteriaModel')
>>>>>>> 5316a8b8d187d7407ae2e1b39ad6fc4ad8dc35e2
  bodyParser = require('body-parser'),
  fs = require('fs');


let rawdata = fs.readFileSync('config.json');
let config = JSON.parse(rawdata);

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin:' + config.password + '@cluster0.ru7w6.mongodb.net/Sustentabilidade?retryWrites=true&w=majority');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/organizationRoutes'); //importing route
routes(app); //register the route

var routes = require('./api/routes/dimensionRoutes'); //importing route
routes(app); //register the route

<<<<<<< HEAD
var routes = require('./api/routes/userRoutes'); //importing route
=======
var routes = require('./api/routes/criteriaRoutes'); //importing route
>>>>>>> 5316a8b8d187d7407ae2e1b39ad6fc4ad8dc35e2
routes(app); //register the route

app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
