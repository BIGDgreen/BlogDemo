const redis = require('redis');
const { REDIS_CONF } = require('./config');

const { port, host } = REDIS_CONF;
const redisClient = redis.createClient(port, host);

redis.on('error', err => {
    console.error(err);
});

const set = (key, value) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }
    redisClient.set(key, value, redis.print);
}

const get = (key) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err);
                reutrn;
            }
            console.log('redis value:', val);
            if (val === null) resolve(null);
            try {
                // 如果val为JSON字符串。则返回JSON对象
                resolve(JSON.parse(val))
            } catch (e) {
                resolve(val);
            }
        })
    })
}

module.exports = {
    set,
    get
}
