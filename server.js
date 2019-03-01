//DOTENV FILE CONFIG
var dotenv = require('dotenv');
dotenv.config();

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;

/*Deprecation Warning: current URL string parser is deprecated, 
and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.*/
var optionsMongo = { useNewUrlParser: true };
mongoose.connect('mongodb://localhost/Tododb',optionsMongo); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route

//SWAGGER
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(function(req, res) {
    res.status(404).send(`route ${req.originalUrl} not found.`)
});

app.listen(port);

console.log(`TodoList RESTful API server started on: ${port}`);