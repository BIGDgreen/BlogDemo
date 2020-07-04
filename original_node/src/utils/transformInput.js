const xss = require('xss');
const escape = require('mysql').escape;

/**
 * 防止sql注入和xss攻击，并去掉首尾的引号
 * @param {string} str 
 */
const transform = (str) => {
    return escape(xss(str)).replace(/^['|"](.*)['|"]$/, "$1");
}

/**
 * 对对象中的每一个属性都防止sql注入和xss攻击
 * @param {object} obj 
 */
const transformObject = (obj) => {
    if (!isObject(obj)) return;
    Object.keys(obj).forEach(key => {
        if (obj.hasOwnProperty(key)) {
            obj[key] = transform(obj[key]);
        }
    });
}


module.exports = {
    transform,
    transformObject
}
