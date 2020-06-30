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
 * 给一个词包围反引号
 * @param {*} s 
 * @returns {string}
 */
const inBackticks = s => `\`${s}\``;

/**
 * 给一个词包围引号
 * @param {*} s
 * @returns {string}
 */
const inQuotes = s => `'${s}'`

module.exports = {
    isObject,
    isString
}
