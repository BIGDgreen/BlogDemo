const blogService = require('../service/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')

const handleBlogRouter = (req, res) => {
    const { model, apiSuffix, method } = req;
    let resData = null;
    if (model !== 'blog') return;
    if (method === 'GET') resData = _handleGet(req, apiSuffix);
    if (method === 'POST') resData = _handlePost(req, apiSuffix);
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

const _getList = (req) => {
    const { query } = req;
    const { author = '', keyword = '' } = query;
    const result = blogService.getList({ author, keyword });
    return _handleResult(listData)
}

const _getDetail = (req) => {
    const { query } = req;
    const { id } = query;
    const result = blogService.getDetail(id);
    return _handleResult(blogDetail);
}

const _newBlog = (req) => {
    const result = blogService.newBlog(req.body);
    return _handleResult(result);
}

const _updateBlog = (req) => {
    const { id } = req.query;
    const result = blogService.updateBlog(id, req.body);
    return _handleResult(result, '更新博客失败');
}

const _deleteBlog = (req) => {
    const { id } = req.query;
    const result = blogService.deleteBlog(id);
    return _handleResult(result, '删除博客失败');
}

const _handleResult = (result, errorMsg = '未知错误') => {
    if (result) return new SuccessModel(result);
    else return new ErrorModel(result, errorMsg);
}

module.exports = handleBlogRouter
