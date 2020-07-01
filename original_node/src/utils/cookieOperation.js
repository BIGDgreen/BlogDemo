const { EXPIRED_TIME } = require('../../utils/constant')
/**
 * 获取cookie过期时间
 */
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + EXPIRED_TIME);
    return d.toGMTString();
}

/**
 * 为客户端设置cookie
 * @param {object} res 
 * @param {string} value 要设置的cookie值，格式为key=value;
 * @param {string} path cookie存储路径，默认为'/'
 * @param {boolean} httpOnly 是否为客户端设置限制，默认为true
 */
const setCookie = (res, value, path = '/', httpOnly = true, expires) => {
    if (!global.needSetCookie) return;
    if (!expires) expires = getCookieExpires();
    path && (value += `path=${path};`);
    httpOnly && (value += 'httpOnly;');
    value += `expires=${expires}`;
    res.setHeader('Set-Cookie', value);
}

module.exports = {
    setCookie
}