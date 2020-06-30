const userService = require('../service/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')

const handleUserRouter = (req, res) => {
    const { model, apiSuffix, method } = req;
    let resData = null;
    if (model !== 'user') return;
    // 登录
    if (method === 'POST') resData = _handlePost(req, apiSuffix);
    return resData;
}

const _handlePost = (req, apiSuffix) => {
    switch (apiSuffix) {
        case 'login':
            return _login(req);
        default:
            return;
    }
}

const _login = (req) => {
    const { username, password } = req.body;
    const result = userService.login(username, password);
    return _handleResult(result, '登录失败');
}

const _handleResult = (result, errorMsg = '未知错误') => {
    if (result) return new SuccessModel(result);
    else return new ErrorModel(result, errorMsg);
}

module.exports = handleUserRouter
