const router = require('koa-joi-router');
// const util = require('../util');

const { Joi } = router;
const exampleRouter = router();

module.exports = function exports() { // can add tokenManager
  exampleRouter.prefix('/example');

  exampleRouter.route({
    method: 'post',
    path: '/get',
    validate: {
      body: {
        token: Joi.string(),
      },
      type: 'json',
      output: {
        200: {
          body: {
            username: Joi.string(),
            password: Joi.string(),
          },
        },
      },
    },
    handler: async (ctx) => {
      ctx.status = 200;
      ctx.body = {
        username: ctx.state.user.username,
        password: ctx.state.user.password,
      };
    },
  });

  return exampleRouter;
};
