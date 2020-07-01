const handleBlogRouter = require('./blog')
const handleUserRouter = require('./user')
const { setCookie } = require('../utils/cookieOperation')

const handleRouter = async (req, res) => {
    const pathArr = req.path.split('/');
    // 路由模型
    req.model = pathArr[2] || '';
    // api后缀
    req.apiSuffix = pathArr[3] || '';
    // 处理与博客相关的路由
    // blogData 为SuccessModel或ErrorModel实例
    const blogData = await handleBlogRouter(req, res);
    if (blogData) {
        setCookie(res, `userId=${global.userId}`);
        res.end(JSON.stringify(blogData));
        return;
    }

    // 处理与用户相关的路由
    const userData = await handleUserRouter(req, res);
    if (userData) {
        setCookie(res, `userId=${global.userId}`);
        res.end(JSON.stringify(userData));
        return;
    }

    // 404
    res.writeHead(404, { "Content-type": "text/plain" });
    res.write('404 Not Found\n');
    res.end();
}

module.exports = handleRouter
