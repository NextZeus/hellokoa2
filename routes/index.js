var router = require("koa-router")();
var users = require("../schema/users");

router.get("/add", async (ctx,next)=>{
    console.log('add ');
    

    var doc = await users.create({
        uid:    100,
        name:   'xiaodong'
    });
    console.log("add doc ",doc);

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

module.exports = router;