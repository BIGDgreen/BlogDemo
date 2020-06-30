const querystring = require('querystring')
const handleRouter = require('./src/router/index')

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

const serverHandle = (req, res) => {
    // 设置返回格式
    res.setHeader('Content-type', 'application/json');

    // 获取path
    const url = req.url;
    req.path = url.split('?')[0];

    // 获取get方法传入的参数query
    req.query = querystring.parse(url.split('?')[1]);

    // 获取post方法传入的参数
    getPostData(req).then(postData => {
        req.body = postData;
        // 处理路由
        handleRouter(req, res);
    })
}

module.exports = serverHandle
