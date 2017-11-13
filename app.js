var koa = require("koa");
var app = new koa();

var views = require("koa-views");
var json = require("koa-json");
// @ts-ignore
var onerror = require("koa-onerror");
var bodyparser = require("koa-bodyparser");
var logger = require("koa-logger");

var redisMiddleWare = require("./components/redis");
var mongooseMiddleWare = require("./components/mongoose");
onerror(app);

app.use(redisMiddleWare());
app.use(mongooseMiddleWare());

app.use(bodyparser({
    enableTypes:['json','form','text']
}));

app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname+'/public'));

app.use(views(__dirname, { map: {html: 'nunjucks' }}))

var index = require("./routes/index");

//@ts-ignore
app.use(index.routes(),index.allowedMethods());

module.exports = app;
