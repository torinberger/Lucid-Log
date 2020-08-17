const router = require('koa-joi-router');
const Manager = require('./tokenManager');

const tokenManager = new Manager();
const apiRouter = router();

const authAPI = require('./auth')(tokenManager);
const usersAPI = require('./users')(tokenManager);

apiRouter.prefix('/api');

apiRouter.route({
  method: 'post',
  path: '*',
  handler: async (ctx, next) => {
    if (ctx.method === 'POST' && ctx.url.indexOf('auth') === -1) {
      const { token } = ctx.request.body;

      if (token) {
        const user = tokenManager.getUserByToken(token);
        if (user) {
          ctx.state.user = user;
          console.log(ctx.state.user);
          await next();
        } else {
          ctx.status = 403;
        }
      } else {
        ctx.status = 403;
      }
    } else {
      await next();
    }
  },
});

apiRouter.route({
  method: 'get',
  path: '/ping',
  handler: async (ctx) => new Promise((resolve) => {
    ctx.status = 200;
    ctx.body = 'pong!';
    resolve();
  }),
});

apiRouter.use(authAPI.middleware());
apiRouter.use(usersAPI.middleware());
module.exports = apiRouter;
