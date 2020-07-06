const { queryOne } = require('../db/index')
const { transform } = require('../utils/transformInput')
const { genPassword } = require('../utils/cryp')

/**
 * 用户名密码登录
 * @param {string} username 
 * @param {string} password 
 */
const login = (username, password) => {
    username = transform(username);
    password = transform(genPassword(password))
    return queryOne(
        `select username,realname from user where username='${username}' and \`password\`='${password}'`
    )
}

module.exports = {
    login
}