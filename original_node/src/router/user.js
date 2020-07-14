const userService = require('../service/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { set } = require('../redis/index')

const handleUserRouter = async (req, res) => {
    const { model, apiSuffix, method } = req;
    let resData = null;
    if (model !== 'user') return;
    // 登录
    if (method === 'POST') resData = await _handlePost(req, res, apiSuffix);
    return resData;
}

const _handlePost = (req, res, apiSuffix) => {
    switch (apiSuffix) {
        case 'login':
            return _login(req, res);
        default:
            return;
    }
}

const _login = async (req, res) => {
    console.log('logining...')
    const { username, password } = req.body;
    const result = await userService.login(username, password);
    // console.log('数据库查询登录后登录结果', result);
    if (result && result.username) {
        setSession(req, result);
        // 同步到redis
        set(req.sessionId, req.session);
    }
    return _handleResult(result, '登录失败，用户名密码错误');
}

const _handleResult = (result, errorMsg = '未知错误') => {
    if (result) return new SuccessModel(result);
    else return new ErrorModel(result, errorMsg);
}


const setSession = (req, result) => {
    const { username } = result;
    username && (req.session.username = username);
    console.log('session', req.session);
}

module.exports = handleUserRouter
