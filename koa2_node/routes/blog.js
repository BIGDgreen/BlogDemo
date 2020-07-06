const router = require('koa-router')();
const blogService = require('../service/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const BlogModel = require('../model/BlogModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

/* GET blog page. */
router.get('/list', async function (ctx, next) {
  const { isadmin } = ctx.query;
  if (isadmin) {
    if (ctx.session.username == null) {
      console.error('is admin, but no login')
      // 未登录
      ctx.body = new ErrorModel('未登录')
      return
    }
    // 查看自己的博客
    ctx.query.author = ctx.session.username;
  }
  const result = await blogService.getList(ctx.query);
  return _handleResult(ctx, result)
});

router.get('/detail', async (ctx, next) => {
  const { query } = ctx;
  const { id } = query;
  const result = await blogService.getDetail(id);
  return _handleResult(ctx, result);
});


router.post('/new', loginCheck, async (ctx, next) => {
  ctx.request.body.author = ctx.session.username;    // test data
  const blogData = new BlogModel(ctx.request.body);
  blogData.createtime = Date.now();
  const result = await blogService.newBlog(blogData);
  return _handleResult(ctx, result, '新建博客失败');
})

router.post('/update', loginCheck, async (ctx, next) => {
  const { id } = ctx.query;
  const blogData = new BlogModel(ctx.request.body);
  // console.log('原blog', blogData);
  blogData.author = ctx.session.username;
  blogData.createtime = Date.now();
  const result = await blogService.updateBlog(id, blogData);
  return _handleResult(ctx, result, '更新博客失败');
})

router.post('/delete', loginCheck, async (ctx, next) => {
  const { id } = ctx.request.body;
  const author = ctx.session.username;
  const result = await blogService.deleteBlog(id, author);
  return _handleResult(ctx, result, '删除博客失败');
})

const _handleResult = (ctx, result, errorMsg = '未知错误') => {
  if (result) { ctx.body = new SuccessModel(result); }
  else { ctx.body = new ErrorModel(result, errorMsg); }
}

module.exports = router;
