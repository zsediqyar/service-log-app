var express         = require("express");
var bodyParser      = require("body-parser");
var methodOverride  = require("method-override");
var mongodb         = require("mongodb");
var expHand         = require("express-handlebars");

var app             = express();




//**********LOGIN PAGE
app.get("/", function(req, res) {
   res.send("hi there") ;
});

























app.listen(process.env.PORT, process.env.IP, function() {
   console.log("The app is running");
});