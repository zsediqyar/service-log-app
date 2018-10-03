var express     = require("express");
var router      = express.Router();
var mongoose    = require("mongoose");

//DB CONNECTION 
mongoose.connect("mongodb://localhost/service_log");


// SCHEMA MODEL IMPORT
var Records     = require("../models/records");





//********** LOGIN PAGE
router.get("/", function(req, res, next) {
   res.render("index", function(err, pass) {
       if(err) {
           console.log(err);
       }
   });
});


//********** ALL RECORDS PAGE
router.get("/records", function(req, res, next) {
    Records.find()
    .then(function(doc) {
        res.render("records", {records: doc})
    });
});

//********** GET NEW RECORD PAGE
router.get("/records/new", function(req, res, next) {
    res.render("new");
});


//********** NEW RECORD ADD PROCESS
router.post("/records", function(req, res, next) {
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
router.get("/records/:id", function(req, res){
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
router.get("/records/:id/edit", function(req, res, next){
    Records.findById(req.params.id, function(err, editRecord){
        if (err){
            console.log(err);
        } else {
            res.render("edit", {records: editRecord});
        }    
    });
});

//********** RECORD EDIT & UPDATE PROCESS
router.put("/records/:id", function(req, res){
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
router.delete("/records/:id", function(req, res){
   Records.findOneAndDelete(req.params.id, function(err){
       if(err) {
            console.log(err);
       } else {
            res.redirect("/records");
       }
   });
});










module.exports = router;