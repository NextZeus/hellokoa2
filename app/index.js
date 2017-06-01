var koa = require("koa");
var co = require("co");
var route = require("koa-router");
var router = route();

var onerror = require("koa-onerror");
var bodyparser = require("koa-bodyparser");

var app = new koa();

co(function *(){
  app.use(bodyparser());

  onerror(app);
  app.on('error',function(err,ctx){
    if((ctx.status === 404 && err.status === undefined) || err.status === 500){
      console.error("app error ", err);
    }
  });

  // var models = require("./models/index");
  // yield models.init(router);

  function  main(ctx,next){
    ctx.body = "hello world!";
    next();
  }

  function* init(router){
      router.get('/', main);
  } 

  yield init(router);

  app.use(router.routes());
  
  app.listen(3000);

  console.log("server is listening on port 3000");
}).catch(function(err){
  console.error(err.stack);
});