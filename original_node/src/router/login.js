const { ErrorModel } = require('../model/ResModel');

const loginCheck = (req) => {
    // console.log("loginCheck session::", req.session);
    return !!req.session.username;
    // if (!req.session.username) {
    //     return Promise.resolve(new ErrorModel('尚未登录'));
    // }
}

module.exports = {
    loginCheck
}