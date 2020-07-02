const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV

/**
 * 写日志
 * @param {*} writeStream 
 * @param {*} log 
 */
const writeLog = (writeStream, log) => {
    // if (env === 'production') {
    writeStream.write(log + '\n');
    // }
}

/**
 * 生成write stream
 * @param {string} fileName 
 */
const createWriteStream = (fileName) => {
    const fullFileName = path.join(__dirname, '../../logs', fileName);
    const writeStream = fs.createWriteStream(fullFileName, {
        flags: 'a'
    });
    return writeStream;
}

// 写访问日志
const accessWriteStream = createWriteStream('access.log');

const access = (log) => {
    writeLog(accessWriteStream, log);
}

module.exports = {
    access
}
