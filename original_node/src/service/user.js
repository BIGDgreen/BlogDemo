const { queryOne } = require('../db/index')
const { transform } = require('../utils/transformInput')
const { genPassword } = require('../utils/cryp')

const login = (username, password) => {
    username = transform(username);
    password = transform(genPassword(password))
    return queryOne(
        `select username from user where username='${username}' and \`password\`='${password}'`
    )
}

module.exports = {
    login
}