var koa = require("koa");
var app = new koa();

// app.use(function *(next){
//     var start = new Date;
//     yield next;

//     var ms = new Date - start;
//     console.log('x-response-time');
//     this.set("X-Response-Time", ms+"ms");
// });

// app.use(function *(next){
//     var start = new Date;
//     yield next;

//     var ms = new Date - start;
//     console.log('logger %s %s - %s ', this.method, this.url,ms);
// });

app.use(async function (ctx, next) {
  console.log('>> one');
  await next();
  console.log('<< one');
});

app.use(function *(){
    // this.body = "Hello world!!!";
    var monk = require("monk");
    var wrap = require("co-monk");
    var db =  monk("localhost/hellokoa");
    var User = wrap(db.get("users"));

    // 不用定义shcema
    // yield User.insert({ name: 'Tobi', species: 'ferret' });
    // yield User.insert({ name: 'Loki', species: 'ferret' });
    // yield User.insert({ name: 'Jane', species: 'ferret', record:{
    //     a:1,b:2,c:3,d:4
    // } });

    var res = yield User.find({name:"Jane"});
    var res1 = yield User.find({name:"Loki"});
    console.log('res ',res);
    console.log('res1 ',res1);
});

app.listen(3000);