const crypto = require('crypto');
const { PASSWORD_SALT } = require('../../utils/constant')

// md5加密
const md5 = (content) => {
    let md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex');
}

// 加密函数
const genPassword = (password) => {
    const str = `password=${password}&key=${PASSWORD_SALT}`;
    return md5(str);
}

module.exports = {
    genPassword
}
