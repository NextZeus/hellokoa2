var router = require("koa-router")();
var users = require("../schema/users");

// koa
// ctx: request, response
router.get('/aaa', (ctx,next) => {

});


router.get("/add", async (ctx,next)=>{
    var doc = await users.create({
        uid:    100,
        name:   'xiaodong'
    });

    var doc1 = await users.findOne({});

    console.log("add doc ",doc);
    ctx.body = {result:{}};
    ctx.render('index.html');
});

router.get('/',async (ctx,next)=>{
    var request = ctx.request;
    var query = request.query;
    var uid = query.uid;
    const doc = await users.findOne({uid:uid});
    ctx.body = {info:doc};
});

router.get("/redis", async (ctx,next)=>{

});

module.exports = router;