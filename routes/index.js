var router = require("koa-router")();

router.get('/',async (ctx,next)=>{
    await ctx.render('index',{
        title:"hello koa2!"
    });
});



module.exports = router;