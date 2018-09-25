var express         = require("express");
var bodyParser      = require("body-parser");
var methodOverride  = require("method-override");
var mongo           = require("mongodb").MongoClient;
var expHand         = require("express-handlebars");

var app             = express();


var url             = "mongodb://localhost:27017/exampleDb";
    

//********** LIBRARY SETUP
app.engine('handlebars', expHand({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



//********** LOGIN PAGE
app.get("/", function(req, res, next) {
   res.render("index");
});


//********** ALL RECORDS PAGE



//********** ADD RECORD PAGE
app.get("/records/new", function(req, res, next) {
    res.render("new");
});



//********** RECORD ADD PROCESS









app.listen(process.env.PORT, process.env.IP, function() {
   console.log("The app is running");
});