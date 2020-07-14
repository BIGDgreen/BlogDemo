const { queryOne, insert } = require('../db/mysql')
const { transform } = require('../utils/transformInput')
const { genPassword } = require('../utils/cryp')

/**
 * 用户名密码登录
 * @param {string} username 
 * @param {string} password 
 */
const login = async (username, password) => {
    username = transform(username);
    password = transform(genPassword(password))
    return await queryOne(
        `select username from user where username='${username}' and \`password\`='${password}'`
    )
}

/**
 * 注册
 * @param {string} username 
 * @param {string} password 
 */
const register = async (username, password) => {
    username = transform(username);
    password = transform(genPassword(password))
    return await insert({ username, password }, 'user')
}

module.exports = {
    login,
    register
}