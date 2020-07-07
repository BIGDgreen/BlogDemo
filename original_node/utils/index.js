/**
 * 判断是否为对象
 * @param {*} o 
 * @returns {boolean}
 */
const isObject = o => Object.prototype.toString.call(o) === '[object Object]'

/**
 * 判断是否为字符串
 * @param {*} s 
 * @returns {boolean}
 */
const isString = s => typeof s === 'string'

/**
 * 生成一个新的userId
 * @returns {number}
 */
const newUserId = () => {
    const random = `${Math.random()}`.slice(2);
    return `${Date.now()}_${random}`;
}

module.exports = {
    isObject,
    isString,
    newUserId
}
