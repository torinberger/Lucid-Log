const router = require('koa-joi-router');
const controller = require('./controller');
const util = require('../util');

const { Joi } = router;
const authRouter = router();

module.exports = function exports(tokenManager) {
  authRouter.prefix('/auth');

  authRouter.route({
    method: 'post',
    path: '/login',
    validate: {
      body: {
        username: Joi.string().max(20),
        password: Joi.string().max(30),
      },
      type: 'json',
      output: {
        200: {
          body: {
            token: Joi.string(),
          },
        },
      },
    },
    handler: async (ctx) => {
      const { username, password } = ctx.request.body;
      await controller
        .findUser(username, password)
        .then(async (users) => {
          const targetUser = users[0]; // there should only be one user with specified details

          if (targetUser) {
            const token = tokenManager.genToken(targetUser.username, targetUser.password);
            tokenManager.addToken(token, targetUser.username, targetUser.password);
            ctx.status = 200;
            ctx.body = {
              token,
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

  authRouter.route({
    method: 'post',
    path: '/register',
    validate: {
      body: {
        username: Joi.string().max(20),
        password: Joi.string().max(30),
      },
      type: 'json',
      output: {
        201: {
          body: {
            token: Joi.string(),
          },
        },
      },
    },
    handler: async (ctx) => {
      const { username, password } = ctx.request.body;
      await controller
        .findUserByUsername(username)
        .then(async (existingUsers) => {
          if (existingUsers.length === 0) { // check that there are no users with same username
            await controller
              .addUser(username, password)
              .then((users) => {
                const targetUser = users[0];

                const token = tokenManager.genToken(targetUser.username, targetUser.password);
                tokenManager.addToken(token, username, password);

                ctx.status = 201;
                ctx.body = {
                  token,
                };
              })
              .catch((err) => {
                util.errorHandler(err);
                ctx.status = 500;
              });
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

  return authRouter;
};
