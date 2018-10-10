var mongoose = require ("mongoose");

var recordsSchema = new mongoose.Schema ({
    id: String,
    schedule: String,
    title: String,
    description: String,
    expectedIssues: String,
    incharge: String,
    slackChannel: String,
    subtasks: []
});

module.exports = mongoose.model("Records", recordsSchema);
