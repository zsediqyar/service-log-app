var mongoose = require ("mongoose");

var recordsSchema = new mongoose.Schema ({
    name: String,
    last_name: String,
    age: Number
});

module.exports = mongoose.model("Records", recordsSchema);