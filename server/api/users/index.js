const router = require('koa-joi-router');
const controller = require('./controller');
const util = require('../util');

const { Joi } = router;
const usersRouter = router();

module.exports = function exports() { // can add tokenManager
  usersRouter.prefix('/users');

  usersRouter.route({
    method: 'post',
    path: '/getsignup',
    validate: {
      body: {
        token: Joi.string(),
      },
      type: 'json',
      output: {
        200: {
          body: {
            signup: Joi.date(),
          },
        },
      },
    },
    handler: async (ctx) => {
      await controller
        .findUser(ctx.state.user.username, ctx.state.user.password)
        .then((users) => {
          const targetUser = users[0];

          if (targetUser) {
            ctx.status = 200;
            ctx.body = {
              signup: targetUser.signup,
            };
          } else {
            ctx.status = 403;
          }
        })
        .catch((err) => {
          util.errorHandler(err);
          ctx.status = 500;
        });
    },
  });

  return usersRouter;
};