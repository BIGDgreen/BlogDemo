const handleBlogRouter = require('./blog')
const handleUserRouter = require('./user')

const handleRouter = (req, res) => {
    const pathArr = req.path.split('/');
    // 路由模型
    req.model = pathArr[2] || '';
    // api后缀
    req.apiSuffix = pathArr[3] || '';
    // 处理与博客相关的路由
    // blogData 为SuccessModel或ErrorModel实例
    const blogData = handleBlogRouter(req, res);
    if (blogData) {
        res.end(JSON.stringify(blogData));
        return;
    }

    // 处理与用户相关的路由
    const userData = handleUserRouter(req, res);
    if (userData) {
        res.end(JSON.stringify(userData));
        return;
    }

    // 404
    res.writeHead(404, { "Content-type": "text/plain" });
    res.write('404 Not Found\n');
    res.end();
}

module.exports = handleRouter
