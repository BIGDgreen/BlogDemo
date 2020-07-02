const http = require('http')
const { PORT, ENV } = require('../utils/constant')
const serverHandle = require('../app')

// 设置开发/生产环境
process.env.NODE_ENV = ENV

const server = http.createServer(serverHandle)

server.listen(PORT, () => {
    console.log('server is listen at ' + PORT)
})