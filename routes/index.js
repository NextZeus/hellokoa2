var router = require("koa-router")();
var users = require("../schema/users");

// express 
router.get("/login",function(req,res){

});

// koa
// ctx: request, response
router.get('/aaa', (ctx,next) => {

});


router.get("/add", async (ctx,next)=>{
    console.log('add ');
    
    var doc = await users.create({
        uid:    100,
        name:   'xiaodong'
    });

    var doc1 = await users.findOne({});

    console.log("add doc ",doc);
    ctx.body = {result:{}};
    // 等同于express return res.send();
});

router.get('/',async (ctx,next)=>{
    var request = ctx.request;
    var query = request.query;
    console.log("query ",query);
    var uid = query.uid;
    const doc = await users.findOne({uid:uid});
    console.log('findOne doc',doc)
    ctx.body = {info:doc};
});

router.get("/redis", async (ctx,next)=>{

});


module.exports = router;