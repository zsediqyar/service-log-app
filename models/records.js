var mongoose = require ("mongoose");

var recordsSchema = new mongoose.Schema ({
    id: String,
    scheduled: Date,
    title: String,
    description: String,
    expectedIssues: String,
    incharge: String,
    slackChannel: String,
    checkList: []
});

module.exports = mongoose.model("Records", recordsSchema);
