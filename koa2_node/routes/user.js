const router = require('koa-router')();
const { login } = require('../service/user');
const { SuccessModel, ErrorModel } = require('../model/ResModel');

router.prefix('/api/user')

/* GET user listing. */
router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body;
  const result = await login(username, password);
  if (result) {
    if (result.username) {
      ctx.session.username = result.username;
      ctx.session.realname = result.realname;

      ctx.body = new SuccessModel(result);
      return;
    }
    ctx.body = new ErrorModel('登录失败');
  }
  ctx.body = new ErrorModel('登录失败，用户名密码错误');
});

router.get('/session-test', async (ctx, next) => {
  let viewCount = ctx.session.viewCount;
  if (!viewCount) {
    viewCount = 0;
  }
  viewCount++;
  ctx.session.viewCount = viewCount;
  ctx.body = {
    errno: 0,
    viewCount
  };
})

module.exports = router;
