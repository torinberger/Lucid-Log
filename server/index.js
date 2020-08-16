require('dotenv').config();

const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

const api = require('./api');

const app = new Koa();
app
  .use(cors())
  .use(bodyParser());

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} [${ctx.status}] ${ctx.url} - ${ms}ms`);
});

app.use(api.middleware());
app.listen(3000);
