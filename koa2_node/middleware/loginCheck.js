const { ErrorModel } = require('../model/ResModel');

/**
 * 登录校验
 * @param {object} ctx  
 * @param {function} next 
 */
const loginCheck = async (ctx, next) => {
    if (ctx.session.username) {
        await next();
        return true;
    }
    ctx.body = new ErrorModel('未登录');
    return false;
}

module.exports = loginCheck
