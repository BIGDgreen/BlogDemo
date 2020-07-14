# 项目整体架构
![博客项目整体架构](https://s1.ax1x.com/2020/07/08/UEknYQ.md.png)

# 技术框架
前端：vue+ElementUI

后端：node/express/koa2

# 安全性
- 预防XSS攻击：xss包
- 预防SQL注入：`mysql.escape`
- 密码加密：md5算法

# 日志记录
存在`/logs`目录中。

- 原生node版本：手动编写[log.js](https://github.com/BIGDgreen/BlogDemo/blob/master/original_node/src/utils/log.js)。[readline.js](https://github.com/BIGDgreen/BlogDemo/blob/master/original_node/src/utils/readline.js)逐行读取日志。
- express：`morgan`
- koa：`koa-morgan`

根据使用环境分开配置。

# 线上环境管理
PM2进程守护

# 待完善
1. 新增博客文本框采用`markdown`
2. 当数据过多时使用分页
3. 对设置密码功能完善提醒格式
