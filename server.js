var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  mongoose = require('mongoose'),
  Organization = require('./api/models/organizationModel'), //created model loading here
  Dimension = require('./api/models/dimensionModel'), //created model loading here
  Criteria = require('./api/models/criteriaModel'),
  Indicator = require('./api/models/indicatorModel'),
  Criteria = require('./api/models/criteriaModel'),
  User = require('./api/models/userModel'),
  Evaluation = require('./api/models/evaluationModel'),
  Invite = require('./api/models/inviteModel'),
  Year = require('./api/models/yearModel'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
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
app.use(cors());


var routes = require('./api/routes/organizationRoutes'); //importing route
routes(app); //register the route

var routes = require('./api/routes/dimensionRoutes'); //importing route
routes(app); //register the route

var routes = require('./api/routes/criteriaRoutes'); //importing route
routes(app); //register the route

var routes = require('./api/routes/indicatorRoutes'); //importing route
routes(app); //register the route

var routes = require('./api/routes/userRoutes'); //importing route
routes(app); //register the route

var routes = require('./api/routes/evaluationRoutes'); //importing route
routes(app);

var routes = require('./api/routes/commonRoutes'); //importing route
routes(app);

var routes = require('./api/routes/inviteRoutes'); //importing route
routes(app);

var routes = require('./api/routes/yearRoutes'); //importing route
routes(app);

const specs = swaggerJsdoc(swagger_options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
