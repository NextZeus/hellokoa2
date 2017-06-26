var mongoose = require("mongoose");


var schema = new mongoose.Schema({
    uid:    Number,
    name:   String,
    createTime: Number
});

module.exports = mongoose.model('user',schema);
