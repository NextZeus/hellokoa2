var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var config = require("../config/dev.json");
mongoose.set('debug', true);

// 4.x版本 mongoose 支持了 promise 
mongoose.connect(config.mongodb.uri,config.mongodb.options);
mongoose.connection.on('connected',()=>{
    console.log("Mongoose connection successed!");
});
mongoose.connection.on('error',(err)=>{
    console.error('Mongoose connection error ',err);
});
mongoose.connection.on('disconnected',()=>{
    console.log("mongoose connection disconnected!");
});
mongoose.connection.on('open',()=>{
    console.log("Mongoose connected to " + config.mongodb.uri);
});

module.exports = ()=> async function (ctx,next) {
    await next();
}