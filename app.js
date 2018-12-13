var envFile         = require('dotenv').load();

var express         = require("express");
var bodyParser      = require("body-parser");
var methodOverride  = require("method-override");
var mongoose        = require("mongoose");
var expHand         = require("express-handlebars");
var nodemailer      = require("nodemailer");


var app             = express();

var keys            = require("./config/keys")
var Records         = require("./models/records");
var PORT            = 5000;


//DATABASE CONNECTION
mongoose.connect('mongodb://MONGO_USER:MONGO_PASS@mdb-atlas-aws-test-shard-00-00-vmd8s.mongodb.net:27017,mdb-atlas-aws-test-shard-00-01-vmd8s.mongodb.net:27017,mdb-atlas-aws-test-shard-00-02-vmd8s.mongodb.net:27017/test?ssl=true&replicaSet=mdb-atlas-aws-test-shard-0&authSource=admin&retryWrites=true');
var monCon = mongoose.connection.readyState;



//********** LIBRARY SETUP
app.engine('handlebars', expHand({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));




//********** LOGIN PAGE
app.get("/", function(req, res) {
    res.render("index");
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
    console.log(process.env);
});


//********** NEW RECORD ADD PROCESS
app.post("/records", function(req, res, next) {
    var recordData = req.body.serviceRecord;

    var data = new Records(recordData);
    data.save();
    
    res.redirect("/records");
});



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



//********** GET IN-MAIL PAGE
app.get("/records/:id/inmail", function(req, res, next){
    Records.findById(req.params.id, function(err, mailRecord){
        if (err){
            console.log(err);
        } else {
            res.render("inmail", {records: mailRecord});
        }    
    });
});



//********** GET EX-MAIL PAGE
app.get("/records/:id/exmail", function(req, res, next){
    Records.findById(req.params.id, function(err, mailRecord){
        if (err){
            console.log(err);
        } else {
            res.render("exmail", {records: mailRecord});
        }    
    });
});













app.listen(PORT, function() {
    console.log("=======================================")
   console.log("The Server Started");
   console.log("DB Connection State: " + monCon);
        if(monCon == 0) {
            console.log(monCon + ":" + " DB DISCONNECTED");
        } else if (monCon == 1) {
            console.log(monCon + ":" + " DB CONNECTED");
        } else if (monCon == 2) {
            console.log(monCon + ":" + " DB CONNECTING");
        } else {
            console.log(monCon + ":" + " DB DISCONNECTING");
        }
});
