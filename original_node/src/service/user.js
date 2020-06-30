const { queryOne } = require('../db/index')

const login = (username, password) => {
    return queryOne(
        `select username,realname from user where username='${username}' and \`password\`='${password}'`
    )
}

module.exports = {
    login
}