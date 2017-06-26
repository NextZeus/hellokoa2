var koa = require("koa");
var app = new koa();

var views = require("koa-views");
var json = require("koa-json");
var onerror = require("koa-onerror");
var bodyparser = require("koa-bodyparser");
var logger = require("koa-logger");

onerror(app);

app.use(bodyparser({
    enableTypes:['json','form','text']
}));

app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname+'/public'));

app.use(views(__dirname+'/views',{
    extension:'{views}'
}));

app.use(async (ctx,next)=>{
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

var index = require("./routes/index");

app.use(index.routes(),index.allowedMethods());

module.exports = app;
