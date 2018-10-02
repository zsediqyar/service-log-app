var express         = require("express");
var bodyParser      = require("body-parser");
var methodOverride  = require("method-override");
var mongoose        = require("mongoose");
var expHand         = require("express-handlebars");

var app             = express();

var Records            = require("./models/records");


mongoose.connect("mongodb://localhost/service_log");


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
app.get("/records", function(req, res, next) {
    Records.find()
    .then(function(doc) {
        res.render("records", {records: doc})
    });
});

//********** NEW RECORD PAGE
app.get("/records/new", function(req, res, next) {
    res.render("new");
});


//********** NEW RECORD ADD PROCESS
app.post("/records", function(req, res, next) {
    var records = {
        name: req.body.name,
        last_name: req.body.last_name,
        age: req.body.age
    };
    
    var data = new Records(records);
    data.save();
    
    res.redirect("/records");
})


//********** EDIT RECORD PAGE






app.listen(process.env.PORT, process.env.IP, function() {
   console.log("The app is running");
});