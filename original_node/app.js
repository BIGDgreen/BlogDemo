const querystring = require('querystring')
const handleRouter = require('./src/router/index')
const { newUserId } = require('./utils/index')
const { set, get } = require('./src/redis/index')
const { access } = require('./src/utils/log')

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

// 使用redis解析session，设置好session后处理路由
const parseSession = (req, res) => {
    let needSetCookie = false;
    console.log("cookie", req.cookie);
    let userId = req.cookie.userId || '';
    if (!userId) {
        // 需要设置cookie存储userId
        needSetCookie = true;
        // 创造一个不会重复的userId
        userId = newUserId();
        // console.log('userId', userId);
        set(userId, {});
    }
    req.sessionId = userId;
    get(req.sessionId)
        .then(sessionData => {
            if (sessionData === null) {
                set(req.sessionId, {});
                req.session = {};
            } else {
                req.session = sessionData;
            }
            // console.log("req.session", req.session);
            return getPostData(req);
        })
        .then(postData => {
            req.body = postData;
            // 处理路由
            handleRouter(req, res, needSetCookie);
        });
}

const serverHandle = (req, res) => {
    // 写 access log
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`);

    // 设置返回格式
    res.setHeader('Content-type', 'application/json');

    // 获取path
    const url = req.url;
    req.path = url.split('?')[0];

    // 解析query，为req添加query属性
    parseQuery(req, url);

    // 解析cookie，为req添加cookie属性
    parseCookie(req);

    // 解析session并处理路由
    parseSession(req, res);
}

module.exports = serverHandle
