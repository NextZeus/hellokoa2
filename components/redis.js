const ioredis = require("ioredis");
const client = new ioredis();

module.exports = ()=> async (ctx,next)=>{
    ctx.redis = client;
    await next();
};
