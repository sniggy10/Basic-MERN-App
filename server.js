
var MongoClient = require('mongodb').MongoClient;
// Configuring the database
const dbConfig = require('./config/database.config');
var log = require('morgan')('dev');
var express = require('express');
var log = require('morgan')('dev');
var bodyParser = require('body-parser');
var avengerRoutes = require('./routes/avengerRoutes')

var app = express();
var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({extended:true});

//initialise express router
var router = express.Router();


var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url,function(err){
    if(err)
    console.log('Error');
    else
    console.log('Connected')
});


app.use(log);
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

// Error handling
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Credentials", "true");
     res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
     res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
   next();
 });

// use express router
app.use('/',avengerRoutes);

app.get('/', (req, res) => {
    res.json({"message": "Welcome to Avengers Mern Application."});
});
// intialise server
app.listen(dbConfig.port, (req, res) => {
    console.log(`Server is running on ${dbConfig.port} port.`);
})


