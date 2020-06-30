const userService = require('../service/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { EXPIRED_TIME } = require('../../utils/constant')

const checkLogin = (req) => {
    return !!req.cookie.username
}

const handleUserRouter = async (req, res) => {
    const { model, apiSuffix, method } = req;
    let resData = null;
    if (model !== 'user') return;
    // 登录
    if (checkLogin(req)) return new SuccessModel('登录成功');
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
    result.username && setCookie(res, `username=${result.username};`);
    return _handleResult(result, '登录失败');
}

const _handleResult = (result, errorMsg = '未知错误') => {
    if (result) return new SuccessModel(result);
    else return new ErrorModel(result, errorMsg);
}

/**
 * 获取cookie过期时间
 */
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + EXPIRED_TIME);
    return d.toGMTString();
}

/**
 * 为客户端设置cookie
 * @param {object} res 
 * @param {string} value 要设置的cookie值，格式为key=value;
 * @param {string} path cookie存储路径，默认为'/'
 * @param {boolean} httpOnly 是否为客户端设置限制，默认为true
 */
const setCookie = (res, value, path = '/', httpOnly = true) => {
    path && (value += `path=${path};`);
    httpOnly && (value += 'httpOnly;');
    value += `expires=${getCookieExpires()}`
    res.setHeader('Set-Cookie', value)
}

module.exports = handleUserRouter
