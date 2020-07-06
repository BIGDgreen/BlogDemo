var express = require('express');
var router = express.Router();
const blogService = require('../service/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const BlogModel = require('../model/BlogModel')
const loginCheck = require('../middleware/loginCheck')

/* GET blog page. */
router.get('/list', async (req, res, next) => {
    const { query } = req;
    const { isadmin } = query;
    if (isadmin) {
        if (req.session.username == null) {
            console.error('is admin, but no login')
            // 未登录
            res.json(
                new ErrorModel('未登录')
            )
            return
        }
        // 查看自己的博客
        query.author = req.session.username;
    }
    const result = await blogService.getList(query);
    return _handleResult(res, result)
});

router.get('/detail', async (req, res, next) => {
    const { query } = req;
    const { id } = query;
    const result = await blogService.getDetail(id);
    return _handleResult(res, result);
});


router.post('/new', loginCheck, async (req, res, next) => {
    req.body.author = req.session.username;    // test data
    const blogData = new BlogModel(req.body);
    blogData.createtime = Date.now();
    const result = await blogService.newBlog(blogData);
    return _handleResult(res, result, '新建博客失败');
})

router.post('/update', loginCheck, async (req, res, next) => {
    const { id } = req.query;
    const blogData = new BlogModel(req.body);
    // console.log('原blog', blogData);
    blogData.author = req.session.username;
    blogData.createtime = Date.now();
    const result = await blogService.updateBlog(id, blogData);
    return _handleResult(res, result, '更新博客失败');
})

router.post('/delete', loginCheck, async (req, res, next) => {
    const { id } = req.body;
    const author = req.session.username;
    const result = await blogService.deleteBlog(id, author);
    return _handleResult(res, result, '删除博客失败');
})

const _handleResult = (res, result, errorMsg = '未知错误') => {
    if (result) { res.json(new SuccessModel(result)); }
    else { res.json(new ErrorModel(result, errorMsg)); }
}

module.exports = router;
