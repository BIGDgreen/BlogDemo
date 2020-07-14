const router = require('koa-router')();
const { login, register } = require('../service/user');
const { SuccessModel, ErrorModel } = require('../model/ResModel');

router.prefix('/api/user')

/* GET user listing. */
router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body;
  const result = await login(username, password);
  console.log("登录结果", result);
  if (result) {
    if (result.username) {
      ctx.session.username = result.username;

      ctx.body = new SuccessModel(result);
      return;
    }
    ctx.body = new ErrorModel('登录失败');
  }
  ctx.body = new ErrorModel('登录失败，用户名密码错误');
});

router.post('/register', async (ctx, next) => {
  const { username, password } = ctx.request.body;
  const result = await register(username, password);
  ctx.body = result ? new SuccessModel('注册成功') : new ErrorModel('登录失败，用户名密码错误');
});

// router.get('/session-test', async (ctx, next) => {
//   let viewCount = ctx.session.viewCount;
//   if (!viewCount) {
//     viewCount = 0;
//   }
//   viewCount++;
//   ctx.session.viewCount = viewCount;
//   ctx.body = {
//     errno: 0,
//     viewCount
//   };
// })

module.exports = router;
