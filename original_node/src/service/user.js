const { queryOne } = require('../db/index')
const { transform } = require('../utils/transformInput')

const login = (username, password) => {
    username = transform(username);
    password = transform(password);
    return queryOne(
        `select username,realname from user where username=${username} and \`password\`=${password}`
    )
}

module.exports = {
    login
}