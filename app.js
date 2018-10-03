var express         = require("express");
var bodyParser      = require("body-parser");
var methodOverride  = require("method-override");
var mongoose        = require("mongoose");
var expHand         = require("express-handlebars");

var app             = express();


var Records         = require("./models/records");


//DATABASE CONNECTION
mongoose.connect("mongodb://localhost/service_log");


//********** LIBRARY SETUP
app.engine('handlebars', expHand({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));





//********** LOGIN PAGE
app.get("/", function(req, res, next) {
   res.render("index", function(err, pass) {
       if(err) {
           console.log(err);
       }
   });
});


//********** ALL RECORDS PAGE
app.get("/records", function(req, res, next) {
    Records.find()
    .then(function(doc) {
        res.render("records", {records: doc})
    });
});

//********** GET NEW RECORD PAGE
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

//********** GET RECORD VIEW PAGE
app.get("/records/:id", function(req, res){
    Records.findById(req.params.id, function(err, shownRecord){
       if(err){
           console.log(err);
           res.redirect("/records");
       } else {
           res.render("show", {records: shownRecord});
       }
    });
});


//********** GET EDIT RECORD PAGE
app.get("/records/:id/edit", function(req, res, next){
    Records.findById(req.params.id, function(err, editRecord){
        if (err){
            console.log(err);
        } else {
            res.render("edit", {records: editRecord});
        }    
    });
});

//********** RECORD EDIT & UPDATE PROCESS
app.put("/records/:id", function(req, res){
   Records.findOneAndUpdate(req.params.id, req.body.serviceRecord, function(err, updatedRecord){
      if(err){
          console.log(err);
      } else {
          updatedRecord.save();
          res.redirect("/records");
      }
   });
});



//********** DELETE RECORD PROCESS
app.delete("/records/:id", function(req, res){
   Records.findOneAndDelete(req.params.id, function(err){
       if(err) {
            console.log(err);
       } else {
            res.redirect("/records");
       }
   });
});


app.listen(process.env.PORT, process.env.IP, function() {
   console.log("The app is running");
});