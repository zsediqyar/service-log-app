var mongoose = require ("mongoose");

var recordsSchema = new mongoose.Schema ({
    id: String,
    schedule: Number,
    title: String,
    description: String,
    expectedIssues: String,
    incharge: String,
    slackChannel: String,
});

module.exports = mongoose.model("Records", recordsSchema);