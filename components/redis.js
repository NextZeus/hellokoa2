const ioredis = require("ioredis");
var config = require("../config/dev.json");

const client = !!config.redis.Single ? new ioredis(config.redis.Single) : new ioredis.Cluster(config.redis.Cluster);
client.on('connect',()=>{
    console.log("Redis connected");
});
client.on("ready",()=>{
    console.log('Redis ready');
});
client.on("error",(err)=>{
    console.log('Redis error ',err);
});
client.on("close",()=>{
    console.log("Redis closed");
});
client.on("reconnecting",()=>{
    console.log("Redis reconnect...");
});
client.on("end",()=>{
    console.log('Redis end');
});

module.exports = ()=> async (ctx,next)=>{
    ctx.redis = client;
    await next();
};
