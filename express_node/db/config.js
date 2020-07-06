const env = process.env.NODE_ENV
let MYSQL_CONF;

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        port: '3306',
        password: '',
        database: 'blog',
        multipleStatements: true
    }
}

if (env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'blog'
    }
}


module.exports = MYSQL_CONF
