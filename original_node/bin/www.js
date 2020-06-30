const http = require('http')
const { PORT, NODE_ENV } = require('../utils/constant')
const serverHandle = require('../app')

process.env.NODE_ENV = NODE_ENV

const server = http.createServer(serverHandle)

server.listen(PORT, () => {
    console.log('server is listen at 8000')
})