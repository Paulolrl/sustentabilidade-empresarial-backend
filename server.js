var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  mongoose = require('mongoose'),
  Organization = require('./api/models/organizationModel'), //created model loading here
  Dimension = require('./api/models/dimensionModel'), //created model loading here
  Criteria = require('./api/models/criteriaModel'),
  Indicator = require('./api/models/indicatorModel'),
  bodyParser = require('body-parser'),
  fs = require('fs'),
  swaggerJsdoc = require('swagger-jsdoc'),
  swaggerUi = require('swagger-ui-express')
  swagger_options = require('./swagger_options');


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

var routes = require('./api/routes/criteriaRoutes'); //importing route
routes(app); //register the route

var routes = require('./api/routes/indicatorRoutes'); //importing route
routes(app); //register the route

const specs = swaggerJsdoc(swagger_options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port);


console.log('todo list RESTful API server started on: ' + port);