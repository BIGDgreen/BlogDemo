const querystring = require('querystring')
const handleRouter = require('./src/router/index')
const { newUserId } = require('./utils/index')

// session数据
const SESSION_DATA = {};

/**
 * 获取post方法传入的参数
 * @param {object} req 
 */
const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        (req.headers['content-type'] !== 'application/json' || req.method !== 'POST') && resolve({});
        let postData = '';
        req.on('data', chunk => {
            postData += chunk;
        });
        req.on('end', () => {
            !postData && resolve({});
            postData && resolve(JSON.parse(postData));
        })
    })
}

const parseQuery = (req, url) => {
    req.query = querystring.parse(url.split('?')[1]);
}

const parseCookie = (req) => {
    req.cookie = {};
    const cookieStr = req.headers.cookie || '';
    if (cookieStr) {
        cookieStr.split(';').forEach(item => {
            if (!item) return;
            const arr = item.split('=');
            const key = arr[0].trim();
            const val = arr[1].trim();
            req.cookie[key] = val;
        })
    }
}

const parseSession = (req) => {
    userId = req.cookie.userid || '';
    if (userId) {
        SESSION_DATA[userId] = SESSION_DATA[userId] || {};
        global.needSetCookie = true;
    } else {
        // 创造一个不会重复的userId
        global.userId = newUserId();
        // console.log('userId', global.userId);
        SESSION_DATA[userId] = {};
        // 需要设置cookie存储userId
        global.needSetCookie = true;
        // console.log(global.needSetCookie);
    }
    req.session = SESSION_DATA[userId];
}

const serverHandle = (req, res) => {
    // 设置返回格式
    res.setHeader('Content-type', 'application/json');

    // 获取path
    const url = req.url;
    req.path = url.split('?')[0];

    // 解析query，为req添加query属性
    parseQuery(req, url);

    // 解析cookie，为req添加cookie属性
    parseCookie(req);

    // 解析session
    parseSession(req);

    // 获取post方法传入的参数
    getPostData(req).then(postData => {
        req.body = postData;
        // 处理路由
        handleRouter(req, res);
    })
}

module.exports = serverHandle
