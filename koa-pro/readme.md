app.use((ctx, next) => {
    await next();
})

koa is not boundled with any middleware 
微内核