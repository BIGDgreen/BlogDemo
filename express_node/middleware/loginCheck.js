const { ErrorModel } = require('../model/ResModel');

/**
 * 登录校验
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
const loginCheck = (req, res, next) => {
    if (req.session.username) {
        next();
        return true;
    }
    res.json(new ErrorModel('未登录'));
    return false;
}

module.exports = loginCheck
