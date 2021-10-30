const koa = require("koa");
const fs = require("fs");
const mount = require("koa-mount");

const game = require("./lib");

const app = new koa();

app.use(
  mount("/favicon.ico", function (ctx) {
    ctx.status = 200;
  })
);

const gameKoa = new koa();
app.use(mount("/game", gameKoa));
gameKoa.use(async function (ctx, next) {
  console.log("game 中间件");
  await next();
});
gameKoa.use(async function (ctx, next) {
  const query = ctx.request.query;
  const playerAction = query.action;

  if (!playerAction) {
    ctx.status = 400;
    return;
  }

  ctx.playerAction = playerAction;
  await next();
});
gameKoa.use(async function (ctx, next) {
  const playerAction = ctx.playerAction;

  const gameResult = game(playerAction);

  await new Promise((resolve) => {
    setTimeout(() => {
      ctx.status = 200;

      if (gameResult == 0) {
        ctx.body = "平局";
      } else if (gameResult == 1) {
        ctx.body = "你赢了";
      } else {
        ctx.body = "你输了";
      }
      resolve();
    }, 500);
  });
});


app.use(
  mount("/", function (ctx) {
    ctx.body = fs.readFileSync(__dirname + "/index.html", "utf-8");
  })
);

app.listen(4000);
