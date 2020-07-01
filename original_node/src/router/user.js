const userService = require('../service/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')

const checkLogin = (req) => {
    return !!req.session.username
}

const handleUserRouter = async (req, res) => {
    const { model, apiSuffix, method } = req;
    let resData = null;
    if (model !== 'user') return;
    // 登录
    if (checkLogin(req)) return new SuccessModel('已登录');
    console.log('checkLogin:', checkLogin(req), req.session)
    if (method === 'POST') resData = await _handlePost(req, res, apiSuffix);
    console.log('login resData:', resData);
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
    const { username, password } = req.body;
    const result = await userService.login(username, password);
    console.log('needSetCookie', global.needSetCookie);
    if (global.needSetCookie) {
        setSession(req, result);
    }
    return _handleResult(result, '登录失败');
}

const _handleResult = (result, errorMsg = '未知错误') => {
    if (result) return new SuccessModel(result);
    else return new ErrorModel(result, errorMsg);
}


const setSession = (req, result) => {
    const { username, realname } = result;
    username && (req.session.username = username);
    realname && (req.session.realname = realname);
    console.log('session', req.session);
}

module.exports = handleUserRouter
