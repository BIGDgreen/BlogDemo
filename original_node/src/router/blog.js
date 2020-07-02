const blogService = require('../service/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const BlogModel = require('../model/BlogModel')
const { loginCheck } = require('./login')

const handleBlogRouter = async (req, res) => {
    const { model, apiSuffix, method } = req;
    let resData = null;
    if (!loginCheck(req)) {
        console.log('no login');
        // 未登录
        resData = await loginCheck(req);
        return resData;
    }
    if (model !== 'blog') return;
    if (method === 'GET') resData = await _handleGet(req, apiSuffix);
    if (method === 'POST') resData = await _handlePost(req, apiSuffix);
    console.log('返回结果resData', resData)
    return resData;
}

const _handleGet = (req, apiSuffix) => {
    switch (apiSuffix) {
        case 'list':
            return _getList(req);
        case 'detail':
            return _getDetail(req);
        default:
            return;
    }
}

const _handlePost = (req, apiSuffix) => {
    switch (apiSuffix) {
        case 'new':
            return _newBlog(req);
        case 'update':
            return _updateBlog(req);
        case 'delete':
            return _deleteBlog(req);
        default:
            return;
    }
}

const _getList = async (req) => {
    const { query } = req;
    const { isadmin } = query;
    if (isadmin) {
        // 查看自己的博客
        query.author = req.session.username;
    }
    const result = await blogService.getList(query);
    return _handleResult(result)
}

const _getDetail = async (req) => {
    const { query } = req;
    const { id } = query;
    const result = await blogService.getDetail(id);
    return _handleResult(result);
}

const _newBlog = async (req) => {
    req.body.author = req.session.username;    // test data
    const blogData = new BlogModel(req.body);
    const result = await blogService.newBlog(blogData);
    return _handleResult(result);
}

const _updateBlog = async (req) => {
    const { id } = req.query;
    console.log(req.body);
    const blogData = new BlogModel(req.body);
    blogData.author = req.session.username;
    const result = await blogService.updateBlog(id, blogData);
    return _handleResult(result, '更新博客失败');
}

const _deleteBlog = async (req) => {
    const { id } = req.body;
    const author = req.session.username;
    const result = await blogService.deleteBlog(id, author);
    return _handleResult(result, '删除博客失败');
}

const _handleResult = (result, errorMsg = '未知错误') => {
    if (result) return new SuccessModel(result);
    else return new ErrorModel(result, errorMsg);
}

module.exports = handleBlogRouter
