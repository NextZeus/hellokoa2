var koa = require("koa");
var app = new koa();

var views = require("koa-views");
var json = require("koa-json");
var onerror = require("koa-onerror");
var bodyparser = require("koa-bodyparser");
var logger = require("koa-logger");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// 4.x版本 mongoose 支持了 promise 
mongoose.connect('mongodb://localhost:27017/hellokoa2');

var redisMiddleWare = require("./components/redis");

// mongoose.set('debug', true);
onerror(app);

app.use(redisMiddleWare());

app.use(async (ctx,next)=>{
    await ctx.redis.set('test','test');
    const data = await ctx.redis.get('test');
    console.log('redis get test :',data == 'test');
    await next();
});

app.use(bodyparser({
    enableTypes:['json','form','text']
}));

app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname+'/public'));

app.use(views(__dirname+'/views',{
    extension:'{views}'
}));

var index = require("./routes/index");

app.use(index.routes(),index.allowedMethods());


module.exports = app;
