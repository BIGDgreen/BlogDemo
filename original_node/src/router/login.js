const { ErrorModel } = require('../model/ResModel');

const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(new ErrorModel('尚未登录'));
    }
}

module.exports = {
    loginCheck
}